import { Backdrop, Button, CircularProgress, Container, Typography } from "@mui/material";
import Counter from "../components/Counter";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { incrementScore, getGlobalScore, getUserCounters, resetUserCounters, resetGlobalCounters } from "../services/score";
import { logout } from "../services/auth";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";

const Home = () => {
    const [orgyJokes, setOrgyJokes] = useState(0);
    const [hitOn, setHitOn] = useState(0);
    const [userId, setUserId] = useState(null);
    const [globalScore, setGlobalScore] = useState({orgyJokes: 0, hitOn: 0});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const checkToken = async () => {
            if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.userId);

            const res = await getUserCounters(decodedToken.userId);
            const total = await getGlobalScore();

            console.log(res);

            if (res.counters.length === 1) {
                if (res.counters[0].category === 'orgyJokes') {
                    setOrgyJokes(res.counters[0].counter_value);
                    setHitOn(0);
                } else {
                    setHitOn(res.counters[0].counter_value);
                    setOrgyJokes(0);
                }
            } else {
                const [hitOn, orgyJokes] = res.counters;
                
                setOrgyJokes(orgyJokes?.counter_value || 0);
                setHitOn(hitOn?.counter_value || 0);
            }
            
            const [totalHitOn, totalOrgyJokes] = total.counters;
            setGlobalScore({orgyJokes: totalOrgyJokes?.total_counter || 0, hitOn: totalHitOn?.total_counter || 0});
        }};

        checkToken();
    }, []);

    const resetSingleCounters = async () => {
        setLoading(true);

        const res = await resetUserCounters(userId);

        if (res.message === 'User counters reset successfully!') {
            setOrgyJokes(0);
            setHitOn(0);

            await incrementGlobalScore();
        }

        setLoading(false);
    };

    const incrementGlobalScore = async () => {
        const score = await getGlobalScore();
        const [totalHitOn, totalOrgyJokes] = score.counters;

        setGlobalScore({orgyJokes: totalOrgyJokes?.total_counter || 0, hitOn: totalHitOn.total_counter || 0});
    }

    const incrementOrgyJokes = async () => {
        setLoading(true);

        const res = await incrementScore(userId, 'orgyJokes', 1);

        if (res.message === 'Counter updated successfully!') {
            setOrgyJokes(orgyJokes + 1);

            await incrementGlobalScore();
        }

        setLoading(false);
    };

    const incrementHitOn = async () => {
        setLoading(true);

        const res = await incrementScore(userId, 'hitOn', 1);

        if (res.message === 'Counter updated successfully!') {
            setHitOn(hitOn + 1);

            await incrementGlobalScore();
        };

        setLoading(false);
    };

    const resetAllCounters = async () => {
        const confirmation = prompt('U sure? Imagine losing track of all harrassment we endured!');

        if (confirmation?.toLowerCase() === 'yes') {
            setLoading(true);

            const total = await resetGlobalCounters();
    
            if (total.message === 'Global counters reset successfully!') {
                setOrgyJokes(0);
                setHitOn(0);
            }

            const res = await resetUserCounters(userId);

            if (res.message === 'User counters reset successfully!') {
                setOrgyJokes(0);
                setHitOn(0);
            }

            await incrementGlobalScore();

            setLoading(false);
        }
    };

    const onLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <>
          <Sidebar />
          <Backdrop
              sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
              open={loading}
              >
              <CircularProgress color="inherit" />
          </Backdrop>
          <Button variant="text" onClick={onLogout} sx={{ position: "absolute", right: 10, top: 10 }}>Logout</Button>
          <Container sx={{ display: 'flex', flexDirection: "column",  alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 6}}>
              <Counter type="Orgy jokes" totalCount={orgyJokes} counterFn={incrementOrgyJokes} />
              <Counter type="Times hit on" totalCount={hitOn} counterFn={incrementHitOn} />
              <Typography variant="h4">Global harassment score:</Typography>
              <Typography variant="h5">Total orgy jokes: {globalScore.orgyJokes}</Typography>
              <Typography variant="h5">Total moves made: {globalScore.hitOn}</Typography>
              <Button variant="outlined" onClick={resetSingleCounters}>Reset my counters</Button>
              <Button variant="contained" color="error" onClick={resetAllCounters}>Reset all counters</Button>
          </Container>
        </>
    );
};

export default Home;
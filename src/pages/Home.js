import { Button, Container, Typography } from "@mui/material";
import Counter from "../components/Counter";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { incrementScore, getGlobalScore, getUserCounters, resetUserCounters, resetGlobalCounters } from "../services/score";
import { logout } from "../services/auth";
import { useNavigate } from "react-router";

const Home = () => {
    const [orgyJokes, setOrgyJokes] = useState(0);
    const [hitOn, setHitOn] = useState(0);
    const [userId, setUserId] = useState(null);
    const [globalScore, setGlobalScore] = useState({orgyJokes: 0, hitOn: 0});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const checkToken = async () => {
            if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.userId);

            const res = await getUserCounters(decodedToken.userId);
            const total = await getGlobalScore();
            
            const [hitOn, orgyJokes] = res.counters;
            const [totalHitOn, totalOrgyJokes] = total.counters;

            console.log(total);

            setOrgyJokes(orgyJokes?.counter_value || 0);
            setHitOn(hitOn?.counter_value || 0);
            setGlobalScore({orgyJokes: totalOrgyJokes.total_counter, hitOn: totalHitOn.total_counter});
        }};

        checkToken();
    }, []);

    const resetSingleCounters = async () => {
        const res = await resetUserCounters(userId);

        if (res.message === 'User counters reset successfully!') {
            setOrgyJokes(0);
            setHitOn(0);

            await incrementGlobalScore();
        }
    };

    const incrementGlobalScore = async () => {
        const score = await getGlobalScore();
        const [totalHitOn, totalOrgyJokes] = score.counters;
        setGlobalScore({orgyJokes: totalOrgyJokes.total_counter, hitOn: totalHitOn.total_counter});
    }

    const incrementOrgyJokes = async () => {
        const res = await incrementScore(userId, 'orgyJokes', 1);

        if (res.message === 'Counter updated successfully!') {
            setOrgyJokes(orgyJokes + 1);

            await incrementGlobalScore();
        }
    };

    const incrementHitOn = async () => {
        const res = await incrementScore(userId, 'hitOn', 1);

        if (res.message === 'Counter updated successfully!') {
            setHitOn(hitOn + 1);

            await incrementGlobalScore();
        };
    };

    const resetAllCounters = async () => {
        const confirmation = prompt('U sure? Imagine losing track of all harrassment we endured!');

        if (confirmation?.toLowerCase() === 'yes') {

            const res = await resetGlobalCounters();
    
            if (res.message === 'Global counters reset successfully!') {
                setOrgyJokes(0);
                setHitOn(0);
    
                await incrementGlobalScore();
            }
        }
    };

    const onLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <>
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
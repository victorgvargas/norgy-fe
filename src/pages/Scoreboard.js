import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUsersCounters } from "../services/score";
import { getUser } from "../services/users";
import { Backdrop, Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { logout } from "../services/auth";
import { useNavigate } from "react-router";

const Scoreboard = () => {
    const [loading, setLoading] = useState(false);
    const [usersScores, setUsersScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScores = async () => {
            setLoading(true);

            const res = await getUsersCounters();

            console.log(res);

            const userIds = res.counters.map(counter => counter.userId);

            const usersData = await Promise.all(userIds.map(async userId => {
                const user = await getUser(userId);
                return user;
            }));

            setUsersScores(res.counters.map(counter => {
                const user = usersData.find(user => user.userId === counter.userId);

                return {
                    email: user.email,
                    hitOn: counter.category === "hitOn" ? counter.counter_value : 0,
                    orgyJokes: counter.category === "orgyJokes" ? counter.counter_value : 0
                };
            }));

            setLoading(false);
        };

        fetchScores();
    }, []);

    const onLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <>
            <Sidebar />
            <Button variant="text" onClick={onLogout} sx={{ position: "absolute", right: 10, top: 10 }}>Logout</Button>
            <Backdrop
              sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
              open={loading}
              >
                 <CircularProgress color="inherit" />
            </Backdrop>
            <Container maxWidth="md" sx={{marginTop: 10}}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>Harassment Scoreboard</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Hit On</TableCell>
                                <TableCell>Orgy Jokes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersScores.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.hitOn}</TableCell>
                                    <TableCell>{user.orgyJokes}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}

export default Scoreboard;
import { Box, Button, Typography } from "@mui/material";

const Counter = ({ counterFn, type, totalCount = 0 }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h4'>{type}</Typography>
            <Typography variant='h1'>{totalCount}</Typography>
            <Button variant="contained" onClick={counterFn}>+</Button>
        </Box>
    );
}

export default Counter;
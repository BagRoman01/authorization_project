import React from 'react'
import { CircularProgress, Box } from '@mui/material';

const CircularLoader = () => {
    return (
        <div> <Box className="loading-container">
            <CircularProgress />
        </Box></div>
    )
}

export default CircularLoader
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const GoogleAuthLogin = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const googleLoginHandler = async () => {
            try {
                // console.log("Full URL:", window.location.href);
                const code = searchParams.get('code');
                // console.log({code});
                await axios.post('http://localhost:3000/auth/google', { code, }, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                window.location.replace('http://localhost:5173');
            } catch (error) {
                console.log(error);
            }
        };
        googleLoginHandler();
    }, [searchParams]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
            }}
        >
            <CircularProgress size={100} />
        </Box>
    );
};
export default GoogleAuthLogin;

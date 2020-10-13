import { useEffect, useState } from 'react';
import { isAuthenticated } from '../services/main.service';

function useAuthentication(refresh) {
    const [authenticationStatus, setAuthenticationStatus] = useState({});

    useEffect(() => {
        async function isAuth() {
            const result = await isAuthenticated();
            setAuthenticationStatus(result);
        }
        isAuth();
    }, [refresh]);

    return authenticationStatus;
}

export default useAuthentication;

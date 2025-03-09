import { useEffect, useState, useContext } from 'react';
import { Context } from '../main'; 

const useAuthLoading = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            store.checkAuth().finally(() => setInitialLoading(false));
        } else {
            setInitialLoading(false);
        }
    }, [store]);

    return { initialLoading, isLoading: store.isLoading };
};

export default useAuthLoading;
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { privateRoutes, publicRoutes } from './routes';
import { useNavigate } from 'react-router-dom';

const AppRouter = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.isAuth) {
            navigate('/profile');
        }
    }, [store.isAuth, navigate]);


    return (
        store.isAuth ? (
            <Routes>
                {privateRoutes.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
            </Routes>
        ) : (
            <Routes>
                {publicRoutes.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
                <Route path="*" element={<Navigate to="/ExamplePage" />} />
            </Routes>
        )
        );
    };

export default observer(AppRouter);

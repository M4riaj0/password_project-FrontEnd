import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/endpoints';


export const useCheckAuth = () => {
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const userFromStorage = localStorage.getItem('user');
    
    useEffect( () => {

        if (!userFromStorage) {
            dispatch(logout({errorMessage: null}));
        }else{
            const userData = JSON.parse(userFromStorage);
            dispatch(login(userData));
        }
        

    }, [status] )

    return status
}
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
   initialState: {
        status: 'not-authenticated', // 'checking' | 'authenticated' | 'not-authenticated'
        username: null,
        token: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, action) => {
            console.log('Login action:', action);
            state.status = 'authenticated';
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.errorMessage = null;
            state.passwords = [];
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginError: (state, action) => {
            state.status = 'not-authenticated';
            state.errorMessage = action.payload;
        },
        logout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.username = null;
            state.token = null;
            state.errorMessage = payload.errorMessage;
            localStorage.removeItem('user');
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },registerSuccess: (state, action) => {
            state.status = 'registered';
            state.username = action.payload.username;
            state.errorMessage = null;
        },

        registerError: (state, action) => {
            state.status = 'not-registered';
            state.username = null;
            state.errorMessage = action.payload;
        },
        getPasswords: (state, action) => {
            console.log('action al menos llega??:', action);
            //  si action es así [{…}, {…}, {…}, {…}]
            if (Array.isArray(action.payload)) {
                console.log('Passwords entraa:', action.payload);
                state.passwords = action.payload;
                const storedUser = localStorage.getItem('user');
                
                if (typeof storedUser === 'object' && storedUser !== null ) {
                    storedUser.passwords = action.payload;
                
                    // Actualizar el usuario en el almacenamiento local
                    localStorage.clear();
                    localStorage.setItem('user', JSON.stringify(storedUser));
                    
                    console.log('User from localStorage3:', storedUser);
                }
            } else {
                state.errorMessage = action.errorMessage;
            }
        }
   }
});

export const { login, loginError , logout, checkingCredentials, registerSuccess, registerError, getPasswords } = authSlice.actions;
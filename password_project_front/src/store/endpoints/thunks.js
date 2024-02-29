import { useSelector } from "react-redux";
import { checkingCredentials, login, loginError, registerSuccess, registerError, logout, getPasswords } from "./authSlice";


export const checkingAuthentication = (username, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const response = await fetch('http://127.0.0.1:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}&password=${password}&scope=&grant_type=password`,
        });
        console.log('Response:', response);
        const data = await response.json();
        console.log('Login response:', data);

        if (response.ok) {
            // Almacena el token en algún lugar seguro, por ejemplo, en el estado de tu aplicación.
            const accessToken = data.access_token;

            // Ahora puedes realizar otras solicitudes con el token, por ejemplo, a la ruta "/"
            const homeResponse = await fetch('http://127.0.0.1:8000/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            const homeData = await homeResponse.json();
            console.log('Home response:', homeData);

            if (homeResponse.ok) {
                console.log('Login successful');
                dispatch(login({ username: homeData.username, uid: homeData.id, token: data.access_token }));
                dispatch(prepareGetPasswords(accessToken));
            } else {
                console.log('Entro3 Error:');
                dispatch(loginError(data.message));
            }
        } else {
            console.log('Entro2 Error:');
            dispatch(loginError(data.message));
        }
    }
};

export const checkingRegistration = (registrationData) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });
            console.log('RegistrationData:', registrationData);
            console.log('Response:', response);

            // Verifica el código de estado de la respuesta
            if (response.ok) {
                const data = await response.json();
                console.log('Register response:', data);

                // Dispatch la acción de registro exitoso
                dispatch(registerSuccess({ username: registrationData.username, password: data.password }));

                // Muestra un alert con el mensaje de registro exitoso
                alert(data.message);
                dispatch(checkingAuthentication(registrationData.username, data.password));

            } else {
                // Si hay un error en el registro, dispatch la acción de error
                const errorData = await response.json();
                dispatch(registerError(errorData.message));

                // Muestra un alert con el mensaje de error
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);

            // Dispatch la acción de error en caso de excepción
            dispatch(registerError('Server error'));

            // Muestra un alert con el mensaje de error
            alert('Server error');
        }
    };
};

export const startLogOut = () => {
    return async( dispatch ) => {
        dispatch(logout({ errorMessage: null }));
    }
}

export const prepareGetPasswords = (token) => {
    return async (dispatch) => {
      console.log('Entro a getPasswords, token:', token);
  
      const response = await fetch('http://127.0.0.1:8000/password/get-password', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Asegúrate de tener el token almacenado
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Get Passwords:', data);
          dispatch(getPasswords(data));
        } else {
          const errorData = await response.json();
          dispatch(getPasswords({errorMessage: errorData.message}));
          alert(errorData.message);
      }
    };
  };

  export const updatePassword = (id, formData) => {
    return async (dispatch, getState) => {
      console.log('Entro a updatePassword:', formData);
  
      const token = getState().auth.token;
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/password/edit?id_password=${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
          // body: formData,
        });
        console.log('response:', response);
        if (response.ok) {
          // Actualiza la contraseña en el estado después de una edición exitosa
          
          dispatch(prepareGetPasswords(token));
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error during password update:', error);
        alert('Server error');
      }
    };
  };
  
  export const deletePassword = (id) => {
    return async (dispatch, getState) => {
      console.log('Entro a deletePassword:', id);
      const token = getState().auth.token;
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/password/delete?id_password=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          // Actualiza la contraseña en el estado después de una eliminación exitosa
          dispatch(prepareGetPasswords(token));
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error during password deletion:', error);
        alert('Server error');
      }
    };
  };

  export const createPassword = (formData) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;

        try {
            const response = await fetch('http://127.0.0.1:8000/password/create-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            console.log('formData:', formData);
            console.log('Response:', response);

            // Verifica el código de estado de la respuesta
            if (response.ok) {
                const data = await response.json();
                console.log('Register response:', data);

                dispatch(prepareGetPasswords(token));

                // Muestra un alert con el mensaje de registro exitoso
                alert(data.message);

            } else {
                // Si hay un error en el registro, dispatch la acción de error
                const errorData = await response.json();
                dispatch(registerError(errorData.message));

                // Muestra un alert con el mensaje de error
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error during creation:', error);
            alert('Server error');
        }
    };
};


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';

// Action Creators
export const login = (credentials) => async (dispatch) => {
  try {
    // Replace with your actual API call to login
    // const res = await api.post('/api/auth/login', credentials);
    
    // For now, simulating a successful login
    const userData = {
      id: 1,
      firstName: 'User',
      lastName: 'Name',
      email: credentials.email,
      role: 'user'
      // Add other user data as needed
    };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: userData
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.message || 'Login failed'
    });
  }
};

export const logout = () => (dispatch) => {
  // You might want to add logic to clear tokens from localStorage here
  localStorage.removeItem('token');
  
  dispatch({
    type: LOGOUT
  });
};

export const loadUser = () => async (dispatch) => {
  try {
    // Replace with your actual API call to get the user data
    // const res = await api.get('/api/auth/user');
    
    // For now, simulating a successful user load from token
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    // Simulated user data
    const userData = {
      id: 1,
      firstName: 'User',
      lastName: 'Name',
      email: 'user@example.com',
      role: 'user'
    };

    dispatch({
      type: USER_LOADED,
      payload: userData
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
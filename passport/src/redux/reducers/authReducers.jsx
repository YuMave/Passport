import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT, 
    USER_LOADED, 
    AUTH_ERROR 
  } from '../actions/authAction';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case LOGIN_SUCCESS:
        // In a real app, you'd store the token from payload
        localStorage.setItem('token', 'dummy-token');
        return {
          ...state,
          // token: payload.token,
          isAuthenticated: true,
          loading: false,
          user: payload,
          error: null
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: payload
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
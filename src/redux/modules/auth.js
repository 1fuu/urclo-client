const LOGININPUT_CHANGE = 'login/LOGININPUT_CHANGE';
const REGISTERINPUT_CHANGE = 'login/REGSTERINPUT_CHANGE';
const ACCOUNT_CREATE = 'login/ACCOUNT_CREATE';
const ACCOUNT_LOGIN = 'login/ACCOUNT_LOGIN';
const REGISTER_TOGGLE = 'login/REGISTER_TOGGLE';
const REGISTERSTATE_CHANGE = 'auth/REGISTERSTATE_CHANGE';

export const LoginInputChange = ({username, password}) => ({ 
    type: LOGININPUT_CHANGE,
    loginInputs: {
        username,
        password
    }
});

export const RegisterInputChange = ({username, password}) => ({ 
    type: REGISTERINPUT_CHANGE,
    registerInputs: {
        username,
        password
    }
});

export const RegisterStateChange = (loading, success, error) => ({ 
    type: REGISTERSTATE_CHANGE,
    registerState: {
        loading,
        success,
        error
    }
});

export const AccountCreate = (username, password) => ({ 
    type: ACCOUNT_CREATE,
    registerData: {
        username,
        password
    }
});

export const AccountLogin = (username, password) => ({ 
    type: ACCOUNT_LOGIN
});

export const RegisterToggle = (rVisible) => ({ 
    type: REGISTER_TOGGLE,
    rVisible
});

const initialState = {
    loginInputs: {
        username: "",
        password: ""
    },
    registerInputs: {
        username: "",
        password: ""
    },
    registerData: {
        username: "",
        password: "",
    },
    registerState: {
        loading: false,
        success: false,
        error: null
    },
    rVisible: false,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case LOGININPUT_CHANGE:
            console.log(action.loginInputs);
            return {
                ...state,
                loginInputs: {
                    username: action.loginInputs.username,
                    password: action.loginInputs.password
                }
            }
        case REGISTERINPUT_CHANGE:
            console.log(action.registerInputs);
            return {
                ...state,
                registerInputs: {
                    username: action.registerInputs.username,
                    password: action.registerInputs.password
                }
            }
        case REGISTERSTATE_CHANGE:
            console.log(action);
            return {
                ...state,
                registerState: {
                    loading: action.registerState.loading,
                    success: action.registerState.success,
                    error: action.registerState.error
                }
            }
        case REGISTER_TOGGLE:
            console.log(action);
            return {
                ...state,
                rVisible: action.rVisible
            }
        default:
            return state;
    }
};
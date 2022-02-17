const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const SET_VALIDATED = 'user/SET_VALIDATED';
const LOGOUT = 'user/LOGOUT';
const CHECK_STATUS = 'user/CHECK_STATUS';

export const SetLoggedInfo = ({username, nickname, location, height, weight, isFirstLogin}) => ({ 
    type: SET_LOGGED_INFO,
    loggedInfo: {
        username,
        nickname,
        location,
        height,
        weight,
        isFirstLogin
    }
});

export const SetValidated = (validated) => ({ 
    type: SET_VALIDATED,
    validated
});

export const Logout = () => ({ 
    type: LOGOUT
});

export const CheckStatus = () => ({ 
    type: CHECK_STATUS
});

const initialState = {
    loggedInfo: { 
        username: null,
        nickname: null,
        location: null,
        height: 0,
        weight: 0,
        isFirstLogin: null
    },
    logged: false, 
    validated: false // 새로고침 해도 로그인 유지를 위함.
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case SET_LOGGED_INFO:
            console.log(action);
            return {
                ...state,
                loggedInfo: {
                    ...state.loggedInfo,
                    username: action.loggedInfo.username,
                    nickname: action.loggedInfo.nickname,
                    location: action.loggedInfo.location,
                    height: action.loggedInfo.height,
                    weight: action.loggedInfo.weight,
                    isFirstLogin: action.loggedInfo.isFirstLogin
                },
                logged: true
            };
        case SET_VALIDATED:
            return {
                ...state,
                validated: action.validated
            }
        default:
            return state;
    }
};
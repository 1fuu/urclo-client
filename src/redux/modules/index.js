import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import home from './home';

const rootReducer = combineReducers({
    auth,
    user,
    home
});

export default rootReducer;
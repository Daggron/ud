import { createStore, compose } from "redux";
import Log from '../middleware/logger';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { combineReducers } from 'redux'
import questions from '../reducers/questions'
import users from '../reducers/users'
import authedUser from '../reducers/authedUser';
import { loadingBarReducer as loadingBar } from 'react-redux-loading'

 const reducer = combineReducers({
    users,
    questions,
    authedUser,
    loadingBar
})

const middleware = applyMiddleware(
    thunk,
    Log,
)

const composedMiddleware = compose(middleware,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const store = createStore(reducer , composedMiddleware);

export default store;
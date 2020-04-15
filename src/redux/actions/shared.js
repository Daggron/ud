import { getInitialData } from '../../utils/_DATA'
import { receiveUsers } from '../actions/users'
import { receiveQuestions} from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'


export function fetchInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
        .then(({ users, questions }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}
import { AddAns, AddQ, GetQ} from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case GetQ:
            return {
                ...state,
                ...action.questions
            }
            case AddQ:
            return {
                ...state,
                [action.question.id]: action.question,
            }
            case AddAns:
            return {
                ...state,
                [action.questionId] : {
                    ...state[action.questionId],
                    [action.answer]: {
                        ...state[action.questionId][action.answer],
                        votes: state[action.questionId][action.answer].votes.concat([action.authedUser])
                    }
                }
            }

        default:
            return state;
    }
}
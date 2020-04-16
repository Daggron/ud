import { _saveQuestion, _saveQuestionAnswer } from '../../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';
import {receiveUsers as updateUser }  from './users';

export const GetQ = 'GetQ'
export const AddQ = 'ADDQ'
export const AddAns = 'AddAns'

export function receiveQuestions(questions) {
    return {
      type: GetQ,
      questions
    }
  }

  function addQuestion(question) {
    return {
      type: AddQ,
      question
    }
  }

  function addAnswer({authedUser, questionId, answer}) {
    return {
      type: AddAns,
      authedUser,
      questionId,
      answer
    }
  }

  export function handleAddQuestion({optionOneText, optionTwoText,authedUser}) {
    return (dispatch) => {
      dispatch(showLoading())
      return _saveQuestion({
        optionOneText,
        optionTwoText,
        author:authedUser
      }).then(({question,users}) =>{
        dispatch(addQuestion(question))
        dispatch(updateUser(users))
        }).then(() =>dispatch(hideLoading()))
    }
  }

  export function handleAddAnswer({authedUser, questionId, answer}) {
    return (dispatch) => {
      dispatch(showLoading())
      dispatch(addAnswer({authedUser:authedUser, questionId:questionId,answer:answer}))
      return _saveQuestionAnswer({authedUser:authedUser, qid:questionId,answer:answer})
      .then(() => dispatch(hideLoading()))
    }
  }
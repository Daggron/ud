export const GetUser = 'GetUser'
export const AddAns = 'AddAns'
export const AddQ = 'AddQ'

export function receiveUsers(users) {
  return {
    type: GetUser,
    users,
  };
}

export function addQuestion(question) {
  return {
    type: AddQ,
    question
  }
}

export function addAnswer({authedUser, questionId, answer}) {
  return {
    type: AddAns,
    authedUser,
    questionId,
    answer
  }
}
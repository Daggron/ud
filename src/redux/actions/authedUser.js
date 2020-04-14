export const SET_AUTHED_USER = 'SetAuthUser'
export const LOG_OUT='LogOut'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}
import { LOGIN_START, LOGIN_COMPLETE, LOGIN_ERROR, LOGOUT } from '../constants'

import Cookie from '../../utils/Cookie'
import API from '../../utils/API'

export function loginStart() {
  return { type: LOGIN_START }
}

export function loginComplete(token, remember) {
  Cookie.save('token', token, remember)

  return {
    type: LOGIN_COMPLETE,
    payload: {
      token: token
    }
  }
}

export function loginError(error) {
  Cookie.remove('token')

  return {
    type: LOGIN_ERROR,
    payload: error
  }
}

export function logoutComplete() {
  Cookie.remove('token')

  return {
    type: LOGOUT
  }
}

export function login(login, password, remember) {
  return function(dispatch) {
    dispatch(loginStart());

    return API.post('admin/login', {login: login, password: password})
      .then(response => {
        dispatch(loginComplete(response.token, remember))
      })
      .catch(error => {
        dispatch(loginError(error))
      })
  }
}

export function logout() {
  return function(dispatch) {
    dispatch(logoutComplete());
  }
}

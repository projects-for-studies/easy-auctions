import {
  authenticationLogOut,
  authenticationLogIn,
  authenticationRegisterUser,
  authenticationGetDataUser
} from "../../constants";
import axios from 'axios'

export const log_in = (email, password) => {
  return axios.post(authenticationLogIn, { email, password })
}

export const log_out = (config) => {
  return axios.delete(authenticationLogOut, { headers: { "access-token": config["access-token"], "uid": config["uid"], "client": config["client"]}})
}

export const register = (user) => {
  return axios.post(authenticationRegisterUser, user)
}

export const getDataUser = (data) => {
  return axios.get(authenticationGetDataUser + data.id, { headers: { "token-type": "Bearer","access-token": data.config["access-token"], "expiry": data.config["expiry"], "uid": data.config["uid"], "client": data.config["client"]} })
}

import {
  authenticationLogOut,
  authenticationLogIn,
  authenticationRegisterUser,
  authenticationGetDataUser,
  authenticationUpdateUser
} from "../../constants";
import axios from 'axios'

const config = (c) =>{
  return { headers: { "token-type": "Bearer","access-token": c["access-token"], "expiry": c["expiry"], "uid": c["uid"], "client": c["client"]} }
}

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
  return axios.get(authenticationGetDataUser + data.id, config(data.config))
}

export const update = (data) => {
  return axios.put(authenticationUpdateUser + data.id, data.body, config(data.config))
}

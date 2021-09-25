import {
  addressCreateUrl,
  addressUpdateUrl
} from "../../constants";
import axios from 'axios'

const config = (c) =>{
  return { headers: { "token-type": "Bearer","access-token": c["access-token"], "expiry": c["expiry"], "uid": c["uid"], "client": c["client"]} }
}

export const createAddress = (address) => {
  return axios.post(addressCreateUrl, address)
}

export const updateAddress = (data) => {
  return axios.put(addressUpdateUrl + data.id, data.address, config(data.config))
}

import {
  addressCreateUrl
} from "../../constants";
import axios from 'axios'

export const createAddress = (address) => {
  return axios.post(addressCreateUrl, address)
}


export const baseUrl = 'http://localhost:3000/api/'

// Routes Authentication
export const authenticationLogIn = `${baseUrl}auth/sign_in`
export const authenticationLogOut = `${baseUrl}auth/sign_out`
export const authenticationRegisterUser = `${baseUrl}auth`
export const authenticationUpdateUser = `${baseUrl}user/edit/`
export const authenticationGetDataUser = `${baseUrl}user/`

// Routes Address
export const addressCreateUrl = `${baseUrl}adresses`
export const addressUpdateUrl = `${baseUrl}user/address/edit/`

export const baseUrl = 'http://localhost:3000/api/'
export const baseProfilePicture = 'http://localhost:3000/profile_picture'

// Routes Authentication
export const authenticationLogIn = `${baseUrl}auth/sign_in`
export const authenticationLogOut = `${baseUrl}auth/sign_out`
export const authenticationRegisterUser = `${baseUrl}auth`
export const authenticationUpdateUser = `${baseUrl}user/edit/`
export const authenticationGetDataUser = `${baseUrl}user/`
export const authenticationUploadProfilePictureUser = `${baseUrl}user/profile_picture_upload/`
export const authenticationDeleteProfilePictureUser = `${baseUrl}user/profile_picture_delete/`

// Routes Address
export const addressCreateUrl = `${baseUrl}adresses`
export const addressUpdateUrl = `${baseUrl}user/address/edit/`

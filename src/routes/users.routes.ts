import { Router } from 'express'
import {
  emailVerifyController,
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyController,
  resetPasswordController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import loginValidator, {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
const usersRoute = Router()

usersRoute.get('/login', loginValidator, wrapAsync(loginController))

/*
    Description: Regiester new user
    Path: /register
    Method: POST
    body:{
        name: string
        email: string
        password: string
        confirm_password: string
        date_of_birth: string theo chuẩn ISO 8601
    }
*/
usersRoute.post('/register', registerValidator, wrapAsync(registerController))

/* 
des: đăng xuất
path: /users/logout
method: POST
headers: {Authorization: 'Bearer <access_token>'}
body: {refresh_token: string}
*/
usersRoute.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

/*
    des: verify email
    method: post
    path: /users/verify-email
    body: {
      email_verify_token: string
    }
*/
usersRoute.post('/verify-email', emailVerifyTokenValidator, wrapAsync(emailVerifyController))

/*
    des: resend verify email
    method: post
    path: /users/resend-verify-email
    headers: {Authorization: "Bearer access_token"}
*/
usersRoute.post('/resend-verify-email', accessTokenValidator, wrapAsync(resendEmailVerifyController))

/*
    des: forgot password
    method: post
    path: /users/forgot-password
    body:{
      email: string
    }
*/
usersRoute.post('/forgot-password', forgotPasswordValidator, wrapAsync(forgotPasswordController))

/*
  des: verify forgot password
  method:post
  path: /users/verify-forgot-password
  body:{
    forgot_password_token: string
  }
*/
usersRoute.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapAsync(verifyForgotPasswordTokenController)
)

/*
des: reset password
path: '/reset-password'
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có authen đc
body: {forgot_password_token: string, password: string, confirm_password: string}
*/
usersRoute.post(
  '/reset-password',
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator,
  wrapAsync(resetPasswordController)
)
export default usersRoute

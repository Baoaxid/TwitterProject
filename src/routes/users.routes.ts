import { Router } from 'express'
import {
  emailVerifyController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyController,
  resetPasswordController,
  updateMeController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import loginValidator, {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.request'
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

/*
des: get profile của user
path: '/me'
method: get
Header: {Authorization: Bearer <access_token>}
body: {}
*/
usersRoute.get('/me', accessTokenValidator, wrapAsync(getMeController))

usersRoute.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'avatar',
    'username',
    'cover_photo'
  ]),
  updateMeValidator,
  wrapAsync(updateMeController)
)

/*
des: get profile của user khác bằng unsername
path: '/:username'
method: get
không cần header vì, chưa đăng nhập cũng có thể xem
*/
usersRoute.get('/:username', wrapAsync(getProfileController))
export default usersRoute

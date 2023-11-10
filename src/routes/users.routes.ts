import { Router } from 'express'
import {
  changePasswordController,
  emailVerifyController,
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  oAuthController,
  refreshTokenController,
  registerController,
  resendEmailVerifyController,
  resetPasswordController,
  unfollowController,
  updateMeController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import loginValidator, {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfollowValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.request'
import { wrapAsync } from '~/utils/handlers'
const usersRoute = Router()

usersRoute.post('/login', loginValidator, wrapAsync(loginController))

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

/*
des: Follow someone
path: '/follow'
method: post
headers: {Authorization: Bearer <access_token>}
body: {followed_user_id: string}

user 2017: 6545009c8beee105ec7335e4
user 2016: 6542605d5bb6e296be69439c
*/
usersRoute.post('/follow', accessTokenValidator, verifiedUserValidator, followValidator, wrapAsync(followController))

/*
    des: unfollow someone
    path: '/unfollow/:user_id'
    method: delete
    headers: {Authorization: Bearer <access_token>}
  g}
    */
usersRoute.delete(
  '/unfollow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapAsync(unfollowController)
)

//change password
/*
  des: change password
  path: '/change-password'
  method: put
  headers: {Authorization: Bearer <access_token}
  body: {old_password: string, new_password: string, confirm_new_password: string}
*/
usersRoute.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapAsync(changePasswordController)
)

/*
  des: refresh_token
  path: '/refresh-token'
  method: post
  body: {refresh_token: string}
*/
usersRoute.post('/refresh-token', refreshTokenValidator, wrapAsync(refreshTokenController))

usersRoute.get('/oauth/google', wrapAsync(oAuthController))
export default usersRoute

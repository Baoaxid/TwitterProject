import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import loginValidator, {
  accessTokenValidator,
  refreshTokenValidator,
  registerValidator
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
export default usersRoute

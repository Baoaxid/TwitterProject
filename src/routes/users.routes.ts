import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import loginValidator, { registerValidator } from '~/middlewares/users.middlewares'
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
export default usersRoute
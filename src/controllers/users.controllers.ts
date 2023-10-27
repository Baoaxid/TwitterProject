import { NextFunction, Request, Response } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.request'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import User from '~/models/schemas/User.schema'

export const loginController = async (req: Request, res: Response) => {
  //vào req lấy user ra, và lấy _id của user đó
  const user = req.user as User
  const user_id = user._id as ObjectId
  //dùng user_id đó tạo access và refresh_token
  const result = await usersService.login(user_id.toString())
  //nếu k bug gì thì thành công luôn
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  res.status(201).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
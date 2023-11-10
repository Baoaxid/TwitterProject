import express, { Request, Response, NextFunction } from 'express'
import usersRoute from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
config()

const app = express()
app.use(express.json())
const port = process.env.PORT || 4000
initFolder()
databaseService.connect()
//route localhost:3000
app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/users', usersRoute)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
//localhost:3000/users/tweets

//app sử dụng một error handler tổng
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên post ${port}`)
})

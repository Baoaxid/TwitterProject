import express, { Request, Response, NextFunction } from 'express'
import usersRoute from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
import { MongoClient } from 'mongodb'
config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 4000
initFolder()
databaseService.connect().then(() => {
  databaseService.indexUsers()
})
//route localhost:3000
app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/users', usersRoute)
app.use('/medias', mediasRouter)
//localhost:3000/users/tweets
app.use('/static', staticRouter)
// app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

//app sử dụng một error handler tổng
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên post ${port}`)
})

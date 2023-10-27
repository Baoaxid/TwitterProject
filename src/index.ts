import express, { Request, Response, NextFunction } from 'express'
import usersRoute from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()
app.use(express.json())
const port = 3000
databaseService.connect()
//route localhost:3000
app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/users', usersRoute)
//localhost:3000/users/tweets

//app sử dụng một error handler tổng
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên post ${port}`)
})

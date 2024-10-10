import express from 'express'
import cors from 'cors'
import userRouter from './routes/user'
import assetRouter from './routes/asset'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/user' , userRouter)
app.use('/api/v1/asset' , assetRouter)

app.listen(3000, () => console.log('LIVE!!!!!!!!!'))
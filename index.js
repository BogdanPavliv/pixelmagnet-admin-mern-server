import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

// Constants
// const PORT = process.env.PORT || 3001
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
// app.use(cors())
app.use(cors({
    origin: ['https://pixelmagnet-mongodb-client.netlify.app', 'http://localhost:3000','https://pixelmagnet-admin-mern-client.netlify.app', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
  
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// app.use((req, res, next) => {
//     console.log(`Incoming request: ${req.method} ${req.url}`);
//     next();
// });


// Routes
// http://localhost:3002
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)



async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
             tlsAllowInvalidCertificates: true,
             tlsAllowInvalidHostnames: true,
            });

        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()

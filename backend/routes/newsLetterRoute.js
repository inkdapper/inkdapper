import express from 'express'
import { newsGenerateOTP, newsVerifyOTP } from '../controllers/newsLetterController.js'
import authUser from '../middleware/auth.js'

const newsLetterRoute = express.Router()

newsLetterRoute.post('/send-otp', newsGenerateOTP)
newsLetterRoute.post('/verify-otp', newsVerifyOTP)

export default newsLetterRoute
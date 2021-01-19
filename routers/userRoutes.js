import express from 'express'
import { authUser, getUserProfile, registerUser, requestOtp, changePassword,updateUserProfile} from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/signup', registerUser)
router.post('/signin', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/updateProfile').post(protect, updateUserProfile)
router.post('/requestOtp', requestOtp)
router.post('/changePassword', changePassword)

export default router;
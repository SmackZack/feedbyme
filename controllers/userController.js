import asyncHandler from 'express-async-handler'
import User from '../models/usermodel.js'
import generateToken from '../utils/generateToken.js'

// @desc Auth User & get token
// @route GET /api/user/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or Password')
    }
})

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {
        first_name,
        last_name,
        image,
        age,
        gender,
        mobile,
        email,
        password,
        user_type,
    } = req.body


    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        first_name,
        last_name,
        image,
        age,
        gender,
        mobile,
        email,
        password,
        user_type,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
})

// @desc get user profile
// @route GET /user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    if (user) {
        res.send(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc get user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.first_name = req.body.first_name || user.first_name
        user.last_name = req.body.last_name || user.last_name
        user.age = req.body.age || user.age
        user.gender = req.body.gender || user.gender
        user.image = req.body.image || user.image
        user.mobile = req.body.mobile || user.mobile
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }


        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc post request otp
// @route POST /user/requestOtp
// @access Private
const requestOtp = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    const val = Math.floor(1000 + Math.random() * 9000);

    if (user) {
        user.otp = val
        const updatedUser = await user.save()

        res.json({
            otp: updatedUser.otp,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc post let user change password
// @route GET /user/changePassword
// @access Public
const changePassword = asyncHandler(async (req, res) => {
    const { otp, password, email } = req.body
    const user = await User.findOne({ email })
    if (user) {
        if (user.otp === otp) {
            user.password = password
            await user.save()
            res.json({
                message: "Password Changed",
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(401)
            throw new Error('Invalid Otp')
        }
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})



export { authUser, registerUser, getUserProfile, requestOtp, changePassword, updateUserProfile }
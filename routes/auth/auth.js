import express from 'express';
import { body } from 'express-validator';
import bodyParser from 'body-parser';
import Jwt  from "jsonwebtoken";

// import bcryptjs from "bcryptjs";

// import { v4 as uuidv4 } from 'uuid';
// uuidv4();

const router = express.Router();

// Models
import { auth } from '../../models/users.js';

// Controllers
import { 
    signupController, 
    loginController, 
    updateUserProfileCtr, 
    changePasswordCtr,
    sendPasswordResetEmailCtr,
    verifyEmailTokenCtr,
    resetPasswordCtr
} from '../../controllers/authController.js';

// middleWares
import authMiddleware from '../../middleware/auth.js'


router.use(bodyParser.json());

// signup
router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty(),

        body('username').trim().not().isEmpty()
        .custom(async (username) => {
            try {
                const userExist = await auth.findUsername(username);
                if (userExist.status != false) {
                    return Promise.reject('Username already exist');
                }
            } catch (error) {
                return Promise.reject('server error occured');
            }
        }),

        body('email').trim()
        .isEmail().withMessage('Please enter a valid email')
        .custom(async (email) => {
            try {
                const userExist = await auth.findEmail(email);
                if (userExist.status != false) {
                    return Promise.reject('Email Address already exist!');
                }
            } catch (error) {
                return Promise.reject('server error occured');
            }
        }).normalizeEmail(),

        body('phoneNumber').trim().not().isEmpty(),

        body('password').trim().isLength({ min: 5}).not().isEmpty(),
    ],
    signupController
);

// check username and email Exist
router.post(
    '/signup_check',
    async (req, res, next) => {
        try {
            const formData = req.body;
        
            const userExist = await auth.find(formData.usernameEmail);
            if (userExist.status != false) {
                return res.status(208).json({
                    status: 208,
                    message: `${formData.name} already exist!`,
                });
            } else {
                return res.status(201).json({
                    status: 201,
                    message: `${formData.name} is good!`,
                });
            }
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    }
);

// Login
router.post(
    '/login',
    [
        body('usernameEmail').trim()
        .isEmail().withMessage('Please enter a valid email or username'),
        body('password').trim().not().isEmpty()
    ],
    loginController
);

// update User Profile
router.post(
    '/updateUserProfile',
    authMiddleware,
    updateUserProfileCtr
);

// change User password
router.post(
    '/changePassword',
    authMiddleware,
    changePasswordCtr
);

// send Password Reset Email
router.post(
    '/sendPasswordResetEmail',
    [
        body('email').trim()
        .isEmail().withMessage('Please enter a valid email')
        .custom(async (email) => {
            try {
                const userExist = await auth.findEmail(email);
                if (userExist.status && userExist.status == false) {
                    return Promise.reject('User with this Email Address does not exist!');
                }
            } catch (error) {
                return Promise.reject('server error occured');
            }
        }).normalizeEmail(),
    ],
    sendPasswordResetEmailCtr
);

// verify sent email reset password token
router.post(
    '/verifyEmailToken',
    verifyEmailTokenCtr
);

// reset password
router.post(
    '/resetPassword',
    [
        body('password').trim().isLength({ min: 5}).not().isEmpty(),

        body('email').trim()
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail(),
    ],
    resetPasswordCtr
);

// verification for auto login
router.post(
    '/verify',
    authMiddleware,
    async (req, res) => {
        return res.status(200).json({
            message: "Authenticated Successfully!",
            statusCode: 200,
            token: req.body
        });
    }
);

export default router;
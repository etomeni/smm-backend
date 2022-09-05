import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import Jwt from "jsonwebtoken";
// import axios from "axios";
import nodemailer from 'nodemailer';

// config
import envData  from './../config/env.js';

// models
import { auth } from '../models/users.js';


export const signupController = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(209).json({
                status: 209,
                message: 'Form Validation Error!', 
                errors
            });
        };
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        error.msg = "sent data validation error";
        next(error);
    }

    const uApiKey = () => {
        const val1 = Date.now().toString(36);
        const val2 = Math.random().toString(36).substring(2);
        return val1 + val2;
    }

    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 12);
        const userDetails = {
            userID: await uuidv4(),
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            ipHistory: req.body.ipHistory,
            country: req.body.country,
            apiKey: uApiKey(),
            password: hashedPassword
        };
        const result = await auth.save(userDetails);
           
        const token = Jwt.sign(
            {
                username: userDetails.username,
                email: userDetails.email,
                userID: userDetails.userID
            },
            `${envData.secretForToken}`,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            status: 201,
            token,
            userID: userDetails.userID,
            message: 'User registered successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const loginController = async (req, res, next) => {
    const usernameEmail = req.body.usernameEmail;
    const password = req.body.password;

    try {
        const user = await auth.find(usernameEmail);
        if (user[0].length !== 1) {
            const error = new Error('A user with this username or email could not be found!');
            error.statusCode = 401;
            error.message = 'Incorrect username or email!';

            // throw error;

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        };

        const storedUser = user[0][0];
        const isPassEqual = await bcryptjs.compare(password, storedUser.password);

        if (!isPassEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            error.message = 'Wrong password!';

            // throw error;

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        }
        
        const token = Jwt.sign(
            {
                username: storedUser.username,
                email: storedUser.email,
                userID: storedUser.userID
            },
            `${envData.secretForToken}`,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            status: 201,
            message: 'Login successfully!',
            token: token,
            userID: storedUser.userID
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const updateUserProfileCtr = async (req, res, next) => {
    const userID = req.body.userID;
    const password = req.body.password;
    const formKeys = req.body.formKeys;
    const formValues = req.body.formValues;

    try {
        const user = await auth.findByID(userID);
        if (user[0].length !== 1) {
            const error = new Error('A user with this ID could not be found!');
            error.statusCode = 401;
            error.message = "unable to verify user's ID, please refreash and try again!!!";

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        };
        const storedUser = user[0][0];
        const isPassEqual = await bcryptjs.compare(password, storedUser.password);

        if (!isPassEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            error.message = 'Wrong password!';

            // throw error;

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        };
       
        const profileUpdateDetails = {
            colombName: formKeys,
            NewColombNameValue: formValues,

            conditionColombName: ['userID'],
            conditionColombValue: [`${userID}`]
        };
        const updatedUser = await auth.updateUser(profileUpdateDetails);

        const newUserData = await auth.findByID(userID);

        return res.status(201).json({
            status: 201,
            message: 'Profile details updated successfully!',
            user: newUserData[0][0],
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const changePasswordCtr = async (req, res, next) => {
    const userID = req.body.userID;
    const password = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    try {
        const user = await auth.findByID(userID);
        if (user[0].length !== 1) {
            const error = new Error('A user with this ID could not be found!');
            error.statusCode = 401;
            error.message = "Incorrect user's ID";

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        };

        const storedUser = user[0][0];
        const isPassEqual = await bcryptjs.compare(password, storedUser.password);

        if (!isPassEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            error.message = 'Wrong password!';

            // throw error;

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 12);
        
        const changePasswordDetails = {
            colombName: ['password'],
            NewColombNameValue: [`${hashedPassword}`],

            conditionColombName: ['userID'],
            conditionColombValue: [`${userID}`]
        };
        const updatedUser = await auth.updateUser(changePasswordDetails);

        return res.status(201).json({
            status: 201,
            message: 'Password Changed successfully!',
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const sendPasswordResetEmailCtr = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({
                status: 401,
                message: 'User with this Email Address does not exist!', 
                errors
            });
        };
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        error.msg = "sent data validation error";
        next(error);
    }

    const email = req.body.email;
    const hostname = req.hostname.toLowerCase();

    try {
        const verificationToken = Date.now().toString(36);
        const token4passwordReset = Jwt.sign(
            {
                token: verificationToken,
                email
            },
            `${verificationToken}`,
            { expiresIn: '1h' }
        );

        // console.log(verificationToken);

        let authUser = 'noreply@24s.club';
        let authPass = '2UtcLZmJFqMvBCa';

        if (hostname == "secretweb.vip") {
            authUser = 'support@secretweb.vip';
            authPass = '8Qd4ibCxqerLe37';
        };

        const mailTransporter = nodemailer.createTransport({
            // service: "gmail",
            host: "tesamedia.com",
            port: 465,
            auth: {
                user: authUser,
                pass: authPass
            }
        });

        const htmlText = `
            <p style="text-align: center;"><span style="font-size: 18pt; color: #de2341;"><strong>Reset your password</strong></span></p>
            <p>&nbsp;</p>
            <p>Hi,</p>
            <p>You made a request to reset your password. Please use the verification code below to complete your password reset:</p>
            <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;"><strong>${verificationToken}</strong></p>
            <p>&nbsp;</p>
            <p>If you're not expecting this request, then someone is trying to access your account. Please ensure your account is safe and secured or contact us immediately.</p>
            <p>Thanks for choosing <span style="color: #de2341;">${hostname}</span> Followers.</p>
            <p>&nbsp;</p>
            <p><em>Best wishes,</em><br><strong>Team <span style="color: #de2341;">${hostname}</span></strong></p>
        `;

        const mailText = `
            Reset your password

            Hi,
            
            You made a request to reset your password. Please use the verification code below to complete your password reset:
            
            ${verificationToken}
            
            If you're not expecting this request, then someone is trying to access your account. Please ensure your account is safe and secured or contact us immediately.
            
            Thanks for choosing ${hostname}.
            
            Best wishes,
            Team ${hostname}
        `;

        const details = {
            from: authUser,
            to: `${email}`,
            subject: "Rest Password",
            text: mailText,
            html: htmlText
        };

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    err,
                    message: 'an error occured while sending password rest mail',
                });
            }
        });
        
        return res.status(201).json({
            status: 201,
            token4passwordReset,
            message: 'Password reset Email sent successfully',
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const verifyEmailTokenCtr = async (req, res, next) => {
    const verificationCode = req.body.verificationCode;

    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error("Not authenticated!");
        error.statusCode = 401;
        error.message = "Not authenticated! Please try again.";

        return res.json({
            message: error.message,
            statusCode: error.statusCode,
            error
        });
    }

    const token = authHeader.split(' ')[1];
    let  decodedToken;
    try {
        decodedToken = Jwt.verify(token, `${verificationCode}`);

        if (!decodedToken || decodedToken[`token`] != verificationCode) {
            return res.status(401).json({
                status: 401,
                decodedToken,
                message: 'wrong Verification Code!',
            });
        } 

        return res.status(201).json({
            status: 201,
            decodedToken,
            message: 'Email verified!',
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            error.message = 'wrong Verification Code!';
        }
        next(error);
    }
}

export const resetPasswordCtr = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(401).json({
                status: 401,
                message: 'password Error!',
                error
            });
        };
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        error.msg = "sent data validation error";
        next(error);
    }

    const email = req.body.email;
    const newPassword = req.body.password;

    try {
        const user = await auth.findEmail(email);
        if (user[0].length !== 1) {
            const error = new Error('A user with this ID could not be found!');
            error.statusCode = 401;
            error.message = "Incorrect user's ID";

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        };

        const storedUser = user[0][0];
        const hashedPassword = await bcryptjs.hash(newPassword, 12);
        
        const changePasswordDetails = {
            colombName: ['password'],
            NewColombNameValue: [`${hashedPassword}`],

            conditionColombName: ['email'],
            conditionColombValue: [`${email}`]
        };
        const updatedUser = await auth.updateUser(changePasswordDetails);

        return res.status(201).json({
            status: 201,
            message: 'Password Changed successfully!',
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
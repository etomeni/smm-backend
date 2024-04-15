import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import Jwt from "jsonwebtoken";
// import axios from "axios";
import nodemailer from 'nodemailer';

// models
import { auth } from '../models/users.js';
import { userModel } from "../util/users.model.js";


const secretForToken = process.env.JWT_SECRET;

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

    try {
        const uApiKey = () => {
            const val1 = Date.now().toString(36);
            const val2 = Math.random().toString(36).substring(2);
            return val1 + val2;
        }
        
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
        // console.log(result);

        if (result.status != false) {
            const token = Jwt.sign(
                {
                    username: userDetails.username,
                    email: userDetails.email,
                    userID: userDetails.userID
                },
                `${secretForToken}`,
                { expiresIn: '24h' }
            );
    
            return res.status(201).json({
                status: 201,
                token,
                userID: userDetails.userID,
                message: 'User registered successfully!'
            });
        }
        
        
        return res.status(500).json({
            status: 500,
            message: result.message || 'unable to register new user.'
        });
           
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const loginController = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({
                status: 401,
                message: 'Incorrect username/email or password!', 
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

    try {
        const usernameEmail = req.body.usernameEmail;
        const password = req.body.password;

        const user = await auth.find(usernameEmail);

        if (user.status && user.status == false) {
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

        const isPassEqual = await bcryptjs.compare(password, user.password);

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
                username: user.username,
                email: user.email,
                userID: user.userID
            },
            `${secretForToken}`,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            status: 201,
            message: 'Login successfully!',
            token: token,
            userID: user.userID,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const updateUserProfileCtr = async (req, res, next) => {
    try {
        const userID = req.body.userID;
        const password = req.body.password;
        const formData = req.body.formData;

        // const formKeys = req.body.formKeys;
        // const formValues = req.body.formValues;

        const user = await auth.findByID(userID);
        if (user && user.status == false) {
            const error = new Error('A user with this ID could not be found!');
            error.statusCode = 401;
            error.message = "unable to verify user's ID, please refreash and try again!!!";

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        };
        const isPassEqual = await bcryptjs.compare(password, user.password);

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
       
        
        // const updatedUser = await userModel.findOneAndUpdate(
        //     { email: user.email }, 
        //     { password: hashedPassword },
        //     {
        //         runValidators: true,
        //         returnOriginal: false,
        //     }
        // );

        // if (updatedUser) {
        //     return res.status(201).json({
        //         status: 201,
        //         message: 'Password Changed successfully!',
        //     });
        // }

        // return res.status(500).json({
        //     status: 500,
        //     message: 'Ooopps unable to update password.',
        // });


        const updatedUser = await auth.updateUser( userID, formData);
        if (updatedUser && updatedUser.status == false) {
            return res.status(500).json({
                status: 500,
                message: updatedUser.message,
            });
        }

        // const newUserData = await auth.findByID(userID);

        return res.status(201).json({
            status: 201,
            message: 'Profile details updated successfully!',
            // user: newUserData[0][0],
            user: updatedUser,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const changePasswordCtr = async (req, res, next) => {
    try {
        const userID = req.body.userID;
        const password = req.body.currentPassword;
        const newPassword = req.body.newPassword;

        const user = await auth.findByID(userID);
        if (user && user.status == false) {
            const error = new Error('A user with this ID could not be found!');
            error.statusCode = 401;
            error.message = "Incorrect user's ID";

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        };

        const isPassEqual = await bcryptjs.compare(password, user.password);
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

        const updatedUser = await userModel.findOneAndUpdate(
            { userID: user.userID }, 
            { password: hashedPassword },
            {
                runValidators: true,
                returnOriginal: false,
            }
        );
        
        if (updatedUser && updatedUser.status) {
            return res.status(500).json({
                status: 500,
                message: 'Ooopps unable to update password.',
            });
        }

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

    try {
        const email = req.body.email;
        const hostname = req.hostname.toLowerCase();

        const verificationToken = Date.now().toString(36);
        const token4passwordReset = Jwt.sign(
            {
                token: verificationToken,
                email
            },
            `${verificationToken}`,
            { expiresIn: '1h' }
        );

        const mailTransporter = nodemailer.createTransport({
            // service: "gmail",
            host:  process.env.HOST_SENDER,
            port: 465,
            auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_PASSWORD
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
            <p>Thanks for choosing <span style="color: #de2341;">${hostname}</span>.</p>
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
            from: `${hostname} <${ process.env.HOST_EMAIL }>`,
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
    try {
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
    
    try {
        const email = req.body.email;
        const newPassword = req.body.password;

        const user = await auth.findEmail(email);
        if (user.status && user.status == false) {
            const error = new Error('A user with this ID could not be found!');
            error.statusCode = 401;
            error.message = "Incorrect user's ID";

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                msg: error.message
            });
        };

        const hashedPassword = await bcryptjs.hash(newPassword, 12);

        const updatedUser = await userModel.findOneAndUpdate(
            { email: user.email }, 
            { password: hashedPassword },
            {
                runValidators: true,
                returnOriginal: false,
            }
        );

        if (updatedUser) {
            return res.status(201).json({
                status: 201,
                message: 'Password Changed successfully!',
            });
        }

        return res.status(500).json({
            status: 500,
            message: 'Ooopps unable to update password.',
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
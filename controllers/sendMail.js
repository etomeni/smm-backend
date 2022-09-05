import { validationResult } from "express-validator";
import nodemailer from 'nodemailer';


// create New Ticket
export const sendMailCtr = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(500).json({
                status: 500,
                message: 'Sent Data Error!', 
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

    const htmlText = req.body.htmlText;
    const mailText = req.body.mailText;
    const subject = req.body.subject;

    const hostSender = req.body.hostSender || "tesamedia.com";
    const hostPassword = req.body.hostPassword || "2UtcLZmJFqMvBCa";
    const hostEmail = req.body.hostEmail || "noreply@24s.club";

    const replyTo = req.body.replyTo;
    const receiverEmail = req.body.receiverEmail;
    const bccEmail = req.body.bccEmail;
    const ccEmail = req.body.ccEmail;
    
    try {
        const details = {
            from: hostEmail,
            to: receiverEmail, // who should recieve the mail
            subject: subject,
            text: mailText,
            html: htmlText
        };

        if (bccEmail) {
            details.bcc = bccEmail;
        }

        if (replyTo) {
            details.replyTo = replyTo;
        }

        if (ccEmail) {
            details.ccEmail = ccEmail;
        }

        const mailTransporter = nodemailer.createTransport({
            // service: "gmail",
            host: hostSender,
            port: 465,
            auth: {
                user: hostEmail,
                pass: hostPassword
            }
        });

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    err,
                    message: 'an error occured while sending email',
                });
            }
        });
        
        return res.status(201).json({
            status: 201,
            message: 'Email sent!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// create New Ticket
export const sendMailTemplateCtr = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(500).json({
                status: 500,
                message: 'Sent Data Error!', 
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

    const htmlText = req.body.htmlText;
    const mailText = req.body.mailText;
    const subject = req.body.subject;

    const hostSender = req.body.hostSender || "tesamedia.com";
    const hostPassword = req.body.hostPassword || "8Qd4ibCxqerLe37";
    const hostEmail = req.body.hostEmail || "support@secretweb.vip";

    const receiverEmail = req.body.receiverEmail || "contact@tesamedia.com";
    const bccEmail = req.body.bccEmail;

    try {
        const details = {
            from: hostEmail,
            to: receiverEmail, // who should recieve the mail
            // bcc: bccEmail,
            subject: subject,
            text: mailText,
            html: htmlText
        };

        if (bccEmail) {
            details.bcc = bccEmail;
        }


        const mailTransporter = nodemailer.createTransport({
            // service: "gmail",
            host: hostSender,
            port: 465,
            auth: {
                user: hostEmail,
                pass: hostPassword
            }
        });

        const htmlText = `
            <p>Hello Team ${hostname},</p>
            <p>You got a new ticket message from ${req.username}:</p>
            <p>&nbsp;</p>
            <p style="padding: 12px; border-left: 4px solid #d0d0d0;">${message}</p>

            ${file ? 'attached file: <br><br> https://${hostname}/api/'+file : file}

            <p>&nbsp;</p>
            <p>Thanks for choosing ${hostname}</p>
            <p>&nbsp;</p>
            <p><em>Best wishes,</em><br><strong>Team <span style="color: #de2341;">${hostname}</span></strong></p>
        `;

        const mailText = `
            Hello Team ${hostname},

            You got a new ticket message from ${req.username}:
            
            ${message}
            
            ${file ? `https://${hostname}/api/`+file : file}
            
            Thanks for choosing ${hostname}
            
            Best wishes,
            Team ${hostname}
        `;

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    err,
                    message: 'an error occured while sending email',
                });
            }
        });
        
        return res.status(201).json({
            status: 201,
            message: 'message sent!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
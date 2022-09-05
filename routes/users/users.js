import express from 'express';
import { body } from 'express-validator';
import bodyParser from 'body-parser';

import https from 'https';
// import http from 'http';

import nodemailer from 'nodemailer';

// import { v4 as uuidv4 } from 'uuid';
// uuidv4();

// Models
import { general } from './../../models/general.js';
import { services } from './../../models/services.js';

const router = express.Router();

// Controllers
import { 
    placeOrderCtr, 
    getDashboardDataCtr, 
    getUserOrdersCtr, 
    getUserCtr,
    createNewTicketCtr,
    newTicketMessageCtr,
    getUserTicketCtr,
    getUserTicketMessageCtr,
    generateNewApiKeyCtr,
    addFundsCtr,
    getPaymentTransactionsCtr,
    getPaymentMethodCtr
} from '../../controllers/usersCtrl.js';

// middleWares
import authMiddleware from './../../middleware/auth.js'


router.use(bodyParser.json());

// get all services from the provider
router.post(
    '/',
    (req, res) => {
        return res.status(200).json({
            message: "api is working!",
            statusCode: 200,
            hostname: req.hostname,
        });
    }
);

// get all services from the provider
router.post(
    '/getProviderService',
    async (req, res, next) => {
        try {
            let url = "https://socialsecret.club/api/v2";
            let key = "75cf395d56079b1b91eab021a400164956d2b4d650f7494f30d501dfc85b09e1";
            
            let responxe = "";
            https.get(`${url}?key=${key}&action=services`, (respz) => {
            // https.get("https://api.ipify.org?format=json", (respz) => {
                // console.log(res);
                respz.on('data', (chunk) => {
                    responxe += chunk
                });
    
                respz.on('end', () => {
                    // console.log(responxe);
                    // res.json({
                    //     message: "Authenticated Successfully!",
                    //     statusCode: 200,
                    //     responxe,
                    // });
    
                    return res.status(201).send(responxe);
                })
            }).on('error', (error) => {
                console.log(error);
            })
    
            // return res.json({
            //     message: "Authenticated Successfully!",
            //     statusCode: 200,
            //     responxe,
            // });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    }
);

// get all services for on site users
router.post(
    '/getServices',
    async (req, res, next) => {
        try {
            const dbServices = await services.getAllServices();
    
            if (!(dbServices[0].length)) {
                return res.status(500).json({
                    message: "an error occured!!!",
                    statusCode: 500,
                    dbServices,
                });
            }
    
            return res.send(dbServices[0]);
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    }
);

// get all services for on site users
router.get(
    '/getServices',
    async (req, res, next) => {
        try {
            const dbServices = await services.getAllServices();
    
            if (!(dbServices[0].length)) {
                return res.status(500).json({
                    message: "an error occured!!!",
                    statusCode: 500,
                    dbServices,
                });
            }
            return res.send(dbServices[0]);
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    }
);

// get dashboard needed data
router.post(
    '/getDashboardData',
    authMiddleware,
    getDashboardDataCtr
);

// get user Orders
router.post(
    '/getUserOrders',
    authMiddleware,
    getUserOrdersCtr
);

// get user details
router.post(
    '/user',
    authMiddleware,
    getUserCtr
);

// place new order
router.post(
    '/placeOrder',
    [
        authMiddleware,
        body('userID').trim().not().isEmpty(),
        body('serviceDBid').isNumeric().not().isEmpty(),
        body('serviceID').not().isEmpty(),

        body('type').trim().not().isEmpty(),

        body('maxOrder').isNumeric().not().isEmpty(),
        body('minOrder').isNumeric().not().isEmpty(),

        body('serviceName').trim().not().isEmpty(),
        body('quantity').isNumeric().not().isEmpty(),
        body('link').trim().not().isEmpty(),

        body('amount').isNumeric().not().isEmpty(),
        body('costAmount').isNumeric().not().isEmpty(),
        body('profit').isNumeric().not().isEmpty()
    ],
    placeOrderCtr
);

// create New Ticket
router.post(
    '/createNewTicket',
    [
        authMiddleware,
        body('subject').trim().not().isEmpty(),
        body('message').trim().not().isEmpty()
    ],
    createNewTicketCtr
);

// get User's Ticket
router.post(
    '/getUserTicket',
    authMiddleware,
    getUserTicketCtr
);

// new Ticket Message
router.post(
    '/newTicketMessage',
    [
        authMiddleware,
        body('message').trim().not().isEmpty()
    ],
    newTicketMessageCtr
);

// get User's Ticket Message
router.post(
    '/getUserTicketMessage',
    authMiddleware,
    getUserTicketMessageCtr
);

// generate a New Api Key
router.post(
    '/generateNewApiKey',
    authMiddleware,
    generateNewApiKeyCtr
);

// testing send mail with nodemailer
router.post(
    '/sendMail',
    // authMiddleware,
    async (req, res, next) => {
        try {
            let mailTransporter = nodemailer.createTransport({
                // service: "gmail",
                host: "tesamedia.com",
                port: 465,
                auth: {
                    user: "support@secretweb.vip",
                    pass: "8Qd4ibCxqerLe37"
                }
            });
    
            let details = {
                from: "support@secretweb.vip",
                to: "sundaywht@gmail.com",
                subject: "testing our nodemailer",
                text: "testing our first sendind"
            };
    
            mailTransporter.sendMail(details, (err) => {
                if (err) {
                    console.log(err);
    
                    return res.status(500).json({
                        status: 500,
                        message: 'an error occured while sending password rest mail',
                    });
                }
            });
            
            // console.log("mail sent succefully");
            return res.status(201).json({
                status: 201,
                // token4passwordReset,
                message: 'Password reset Email sent successfully',
            });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    }
);

// add funds
router.post(
    '/addFunds',
    authMiddleware,
    addFundsCtr
);

// get Payment Transactions
router.post(
    '/getPaymentTransactions',
    authMiddleware,
    getPaymentTransactionsCtr
);

// get Payment Methods
router.post(
    '/getPaymentMethods',
    authMiddleware,
    getPaymentMethodCtr
);

export default router;
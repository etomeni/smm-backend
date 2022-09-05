import express from 'express';
import { body } from 'express-validator';
import bodyParser from 'body-parser';

import https from 'https';
// import http from 'http';

const router = express.Router();

// Controllers
import { 
    addNewServiceCtr, 
    addNewApiProviderCtr, 
    editApiProviderCtr,
    dashboardDataCtr,
    getAllActiveTicketCtr,
    newTicketMessageCtr,
    getTicketMessageCtr,
    closeTicketCtr,
    getAllUsersCtr,
    getUserCtr,
    updateUserProfileCtr,
    getUsersPaymentTransactionsCtr,
    getUserOrdersCtr,
    balanceUpgradeCtr,
    balanceDeductCtr,
    getAllOrdersCtr,
    getAllPaymentsCtr,
    deleteServiceCtr,
    getProviderServicesCtr,
    getAllProvidersCtr,
    changeProviderStatusCtr,
    getQueriedProviderCtr,
    deleteApiProviderCtr,
    searchUsernameOrEmailCtr,
    changeUserRoleCtr,
    servicePriceChangeCtr,
    getAllPaymentMethodsCtr,
    getQueriedPaymentMethodCtr,
    addPaymentMethodCtr,
    editPaymentMethodCtr,
    deletePaymentMethodCtr,
    getReportDataCtr
} from '../../controllers/adminCtrl.js';

// middleWares
import authMiddleware from './../../middleware/auth.js'

router.use(bodyParser.json());

// get Dashboard Data
router.post(
    '/getDashboardData',
    authMiddleware,
    dashboardDataCtr
);

// get all Active Ticket
router.post(
    '/allActiveTicket',
    authMiddleware,
    getAllActiveTicketCtr
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
    '/getTicketMessage',
    authMiddleware,
    getTicketMessageCtr
);

// get Close Ticket
router.post(
    '/closeTicket',
    authMiddleware,
    closeTicketCtr
);

// get All Users
router.post(
    '/getAllUsers',
    authMiddleware,
    getAllUsersCtr
);

// get User ByID
router.post(
    '/getUser',
    authMiddleware,
    getUserCtr
);

// update User's Profile
router.post(
    '/updateUserProfile',
    authMiddleware,
    updateUserProfileCtr
);

// get User's Payment Transactions
router.post(
    '/getUserPaymentTransactions',
    authMiddleware,
    getUsersPaymentTransactionsCtr
);

// get User Orders
router.post(
    '/getUserOrders',
    authMiddleware,
    getUserOrdersCtr
);

// upgrade User's Balance
router.post(
    '/balanceUpgrade',
    authMiddleware,
    balanceUpgradeCtr
);

// deduct User's Balance
router.post(
    '/balanceDeduct',
    authMiddleware,
    balanceDeductCtr
);

// get All Orders
router.post(
    '/getAllOrders',
    authMiddleware,
    getAllOrdersCtr
);

// get All Payments
router.post(
    '/getAllPayments',
    authMiddleware,
    getAllPaymentsCtr
);

// delete Service
router.post(
    '/deleteService',
    authMiddleware,
    deleteServiceCtr
);

// get Provider Services
router.post(
    '/getProviderServices',
    authMiddleware,
    getProviderServicesCtr
);

// Add New Service
router.post(
    '/addNewService',
    [
        authMiddleware,
        body('serviceID').trim().not().isEmpty(),
        body('serviceProvider').trim().not().isEmpty(),
        body('serviceCategory').trim().not().isEmpty(),
        body('serviceType').trim().not().isEmpty(),
        body('providerRate').trim().not().isEmpty(),
        body('resellRate').trim().not().isEmpty(),
        body('minOrder').trim().not().isEmpty(),
        body('maxOrder').trim().not().isEmpty(),
        // body('description').trim().not().isEmpty()
    ],
    addNewServiceCtr
);

// get Providers
router.post(
    '/getProviders',
    authMiddleware,
    getAllProvidersCtr
);

// change Provider Status
router.post(
    '/changeProviderStatus',
    authMiddleware,
    changeProviderStatusCtr
);

// delete API Provider
router.post(
    '/deleteApiProvider',
    authMiddleware,
    deleteApiProviderCtr
);

// get a specific Provider
router.post(
    '/getQueriedProvider',
    authMiddleware,
    getQueriedProviderCtr
);

// Add New API Provider
router.post(
    '/addNewApiProvider',
    [
        authMiddleware,
        body('name').trim().not().isEmpty(),
        body('url').trim().not().isEmpty(),
        body('apiKey').trim().not().isEmpty(),
        // body('balance').isNumeric().not().isEmpty(),
        body('currency').trim().not().isEmpty(),
        // body('description').trim().not().isEmpty(),
        body('status').isNumeric().not().isEmpty()
    ],
    addNewApiProviderCtr
);

// edit API Provider
router.post(
    '/editApiProvider',
    [
        authMiddleware,
        body('name').trim().not().isEmpty(),
        body('url').trim().not().isEmpty(),
        body('apiKey').trim().not().isEmpty(),
        // body('balance').isNumeric().not().isEmpty(),
        body('currency').trim().not().isEmpty(),
        // body('description').trim().not().isEmpty(),
        body('status').isNumeric().not().isEmpty()
    ],

    editApiProviderCtr
);

// get user by username or email
router.post(
    '/searchUsernameOrEmail',
    authMiddleware,
    searchUsernameOrEmailCtr
);

// get user by username or email
router.post(
    '/changeUserRole',
    authMiddleware,
    changeUserRoleCtr
);

// change the price for all service
router.post(
    '/servicePriceChange',
    authMiddleware,
    servicePriceChangeCtr
);

// get All Payment Methods
router.post(
    '/getAllPaymentMethods',
    authMiddleware,
    getAllPaymentMethodsCtr
);

// get a queried Payment Method
router.post(
    '/getQueriedPaymentMethod',
    authMiddleware,
    getQueriedPaymentMethodCtr
);


// Add new Payment Method
router.post(
    '/addPaymentMethod',
    [
        authMiddleware,
        body('name').trim().not().isEmpty(),
        body('exchangeRate').trim().not().isEmpty(),
        // body('apiKey').trim().not().isEmpty(),
        body('currency').trim().not().isEmpty(),
        body('status').isNumeric().not().isEmpty()
    ],
    addPaymentMethodCtr
);

// edit Payment Method
router.post(
    '/editPaymentMethod',
    [
        authMiddleware,
        body('name').trim().not().isEmpty(),
        body('exchangeRate').trim().not().isEmpty(),
        // body('apiKey').trim().not().isEmpty(),
        body('currency').trim().not().isEmpty(),
        body('status').isNumeric().not().isEmpty()
    ],
    editPaymentMethodCtr
);

// delete Payment Method
router.post(
    '/deletePaymentMethod',
    authMiddleware,
    deletePaymentMethodCtr
);

// get Report Data
router.post(
    '/getReportData',
    authMiddleware,
    getReportDataCtr
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
    
                    res.status(201).send(responxe);
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

export default router;
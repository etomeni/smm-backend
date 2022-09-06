// import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
// import { v4 as uuidv4 } from 'uuid';
// import Jwt from "jsonwebtoken";

import axios from "axios";

// models
import { services } from '../models/services.js';
import { admin } from '../models/admin.js';
import { general } from '../models/general.js';
import { auth, user } from '../models/users.js';

// get dashboard Data Ctr
export const dashboardDataCtr = async (req, res, next) => {
    const userID = req.userID;
    const email = req.email;

    try {
        let apiProviderDetails = await general.getActiveApiProvider({tbName: "status" , tbValue: 1});
        apiProviderDetails = apiProviderDetails[0][0];

        const apiProviderBalRes = await axios.post(`${apiProviderDetails.url}?key=${apiProviderDetails.apiKey}&action=balance`);

        let data = {
            colombName: ["balance", "currency"],
            NewColombNameValue: [`${apiProviderBalRes.data.balance}`, `${apiProviderBalRes.data.currency}`],

            conditionColombName: ["APIproviderID", "id"],
            conditionColombValue: [`${apiProviderDetails.APIproviderID}`, `${apiProviderDetails.id}`]
        }
        // apiProviderDetails.balance = apiProviderBalRes.data.balance;
        await admin.updateApiProvider(data, "OR");
        

        let uzer = await admin.getUserByID(userID);
        uzer = uzer[0][0];

        let totalUsers;
        if (uzer.role == 'admin') {
            totalUsers = await admin.getTotalUsers();
        } else {
            totalUsers = await admin.getTotalUserUsers();
        }

        const apiBalance = await admin.getApiBalance();
        const totalOrders = await admin.getTotalOrders();
        const totalProfit = await admin.getTotalProfit();
        const monthlyProfit = await admin.getMonthlyProfit();
        const totalPayments = await admin.getTotalPayments();
        // const totalUsers = await admin.getTotalUsers();
        const totalTickets = await admin.getTotalTickets();

        const dashboardOrders = await admin.getDashboardOrders();

        for (let i = 0; i < dashboardOrders[0].length; i++) {
            const service = await services.getServiceByID(dashboardOrders[0][i].serviceID);

            dashboardOrders[0][i].serviceCategory = service[0][0].serviceCategory;
        }

        return res.status(201).json({
            status: 201,
            result: {
                apiBalance: apiBalance[0][0].apiBalance,
                totalOrders: totalOrders[0][0].totalOrders,
                totalProfit: totalProfit[0][0].totalProfit,
                monthlyProfit: monthlyProfit[0][0].monthlyProfit,
                totalPayments: totalPayments[0][0].totalPayments,
                totalUsers: totalUsers[0][0].totalUsers,
                totalTickets: totalTickets[0][0].totalTickets
            },
            orders: dashboardOrders[0],
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get All Active Ticket Ctr
export const getAllActiveTicketCtr = async (req, res, next) => {
    // const userID = req.userID;
    // const email = req.email;

    try {
        const allActiveTicket = await admin.getAllActiveTicket();

        return res.status(201).json({
            status: 201,
            ticket: allActiveTicket[0],
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// create New Ticket Message
export const newTicketMessageCtr = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // res.send(errors);
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

    const message = req.body.message;
    const ticketID = req.body.ticketID;
    let file = '';

    const userID = req.userID;
    // const email = req.email;

    try {
        if (req.files) {
            const attachedFile = req.files.attachedFile;
    
            if (Object.keys(req.files).length > 0 && attachedFile.size < 2100000) {
                // 2000000
                let fileExtension =  attachedFile.name.slice((attachedFile.name.lastIndexOf(".")))
        
                // let uploadPath = `uploads/${ticketID}/${attachedFile.name}`;
                let uploadPath = `uploads/ticketID_${ticketID}_timestamp${Date.now()+fileExtension}`;
        
                attachedFile.mv(uploadPath, (err) => {
                    if (err) {
                        return res.status(401).json({
                            status: 401,
                            err,
                            message: 'error uploading file!'
                        });
                    }
                });
    
                file = uploadPath;
            }
        };
        
        const data2send = {
            userID,
            ticketID,
            message,
            attachedFile: file
        };

        await general.ticket_messages(data2send);

        return res.status(201).json({
            status: 201,
            data: data2send,
            message: 'message sent!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get Ticket Message
export const getTicketMessageCtr = async (req, res, next) => {
    // const userID = req.userID;
    const ticketID = req.body.ticketID;

    try {
        let ticket = await admin.getTicket({ticketID});
        ticket = ticket[0][0];

        let ticketUser = await admin.getUserByID(ticket.userID);
        ticketUser = ticketUser[0][0];

        let ticketMessages = await admin.getTicketMessage({ticketID});
        ticketMessages = ticketMessages[0];

        return res.status(201).json({
            status: 201,
            ticketMessages,
            ticket,
            ticketUser,
            message: 'successful!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// Close Ticket
export const closeTicketCtr = async (req, res, next) => {
    // const userID = req.userID;
    // const ticketID = req.body.ticketID;

    try {
        await admin.closeTicket(req.body.ticketID);

        return res.status(201).json({
            statusCode: 201,
            message: 'successful!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get All Users
export const getAllUsersCtr = async (req, res, next) => {
    const userID = req.userID;
    // const ticketID = req.body.ticketID;

    try {
        let uzer = await admin.getUserByID(userID);
        uzer = uzer[0][0];

        let users;
        if (uzer.role == 'admin') {
            users = await admin.getAllUsers();
        } else {
            users = await admin.getAllUserUsers();
        }

        return res.status(201).json({
            statusCode: 201,
            users: users[0],
            message: 'successful!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get User ID
export const getUserCtr = async (req, res, next) => {
    // const userID = req.userID;
    const userID = req.body.userID;

    try {
        let user = await admin.getUserByID(userID);

        return res.status(201).json({
            statusCode: 201,
            user: user[0][0],
            message: 'successful!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// Update User's Profile
export const updateUserProfileCtr = async (req, res, next) => {
    const userID = req.body.userID;
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
       
        const profileUpdateDetails = {
            colombName: formKeys,
            NewColombNameValue: formValues,

            conditionColombName: ['userID'],
            conditionColombValue: [`${userID}`]
        };
        const updatedUser = await auth.updateUser(profileUpdateDetails);

        console.log(updatedUser);

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

// get users payment transactions
export const getUsersPaymentTransactionsCtr = async (req, res, next) => {
    const userID = req.body.userID;
    
    try {
        // sned send an object with userID property
        let payments = await user.getUserPayments({userID});
        payments = payments[0];

        return res.status(201).json({
            status: 201,
            payments,
            message: 'Funds added Successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get User Orders
export const getUserOrdersCtr = async (req, res, next) => {
    const userID = req.body.userID;

    try {
        let order = await user.getUserOrders({userID});
        order = order[0];

        for (let i = 0; i < order.length; i++) {
            const element = order[i];

            let data = {
                tbColomb: "serviceID",
                value: element.serviceID
            };

            await services.getSpecificService(data).then(
                (res) => {
                    let serviceData = res[0][0];
                    order[i].serviceCategory = serviceData.serviceCategory;
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        return res.status(201).json({
            status: 201,
            order,
            message: 'successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get All Orders
export const getAllOrdersCtr = async (req, res, next) => {
    // const userID = req.body.userID;

    try {
        let order = await admin.getAllOrders();
        order = order[0];

        for (let i = 0; i < order.length; i++) {
            const element = order[i];

            let data = {
                tbColomb: "serviceID",
                value: element.serviceID
            };

            await services.getSpecificService(data).then(
                (res) => {
                    let serviceData = res[0][0];
                    order[i].serviceCategory = serviceData.serviceCategory;
                },
                (err) => {
                    console.log(err);
                }
            );

            await admin.getUserByID(`${element.userID}`).then(
                (res) => {
                    let user = res[0][0];
                    order[i].username = user.username;
                    order[i].email = user.email;
                    order[i].name = user.name;
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        return res.status(201).json({
            status: 201,
            order,
            message: 'successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// upgrade User's Balance
export const balanceUpgradeCtr = async (req, res, next) => {
    const userID = req.body.userID;
    const amount = req.body.amount;
    const username = req.body.username;

    try {
        const user = await admin.getUserByID(`${userID}`);
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

        if (user[0][0].username != username) {
            return res.status(401).json({
                statusCode: 401,
                message: "The Entered username is incorrect!"
            });
        };

        const newBal = Number(user[0][0].balance) + Number(amount);
        const result = await admin.deduct_upgradeUserBalance({userID, balance: newBal });

        const Cuser = await admin.getUserByID(`${userID}`);
        delete Cuser[0][0].password;

        return res.status(201).json({
            status: 201,
            user: Cuser[0][0],
            message: 'successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// deduct user's Balance 
export const balanceDeductCtr = async (req, res, next) => {
    const userID = req.body.userID;
    const amount = req.body.amount;
    const username = req.body.username;

    try {
        const user = await admin.getUserByID(`${userID}`);
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

        if (user[0][0].username != username) {
            return res.status(401).json({
                statusCode: 401,
                message: "The Entered username is incorrect!"
            });
        };

        const newBal = Number(user[0][0].balance) - Number(amount);
        const result = await admin.deduct_upgradeUserBalance({userID, balance: newBal });

        const Cuser = await admin.getUserByID(`${userID}`);
        delete Cuser[0][0].password;

        return res.status(201).json({
            status: 201,
            user: Cuser[0][0],
            message: 'successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get All Payments
export const getAllPaymentsCtr = async (req, res, next) => {
    // const userID = req.body.userID;

    try {
        let Payments = await admin.getAllPayments();
        Payments = Payments[0];

        for (let i = 0; i < Payments.length; i++) {
            const element = Payments[i];

            let uzer = await  admin.getUserByID(`${element.userID}`);
            uzer = uzer[0][0];
            Payments[i].username = uzer.username;
            Payments[i].email = uzer.email;
            Payments[i].name = uzer.name;

            const exraDatas = JSON.parse(element.extraData);
            Payments[i].country = exraDatas.country;
            Payments[i].transactionRef = exraDatas.transactionRef;
        }

        return res.status(201).json({
            status: 201,
            Payments,
            message: 'successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// delete Service
export const deleteServiceCtr = async (req, res, next) => {
    const serviceIDs = req.body;

    try {
        const result = [];
        
        for (let i = 0; i < serviceIDs.length; i++) {
            let serviceIDresult = await services.deleteServiceByID(serviceIDs[i]);

            result.push(serviceIDresult);
        }

        return res.status(201).json({
            status: 201,
            result,
            message: `${serviceIDs.length} services deleted`
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get Provider services
export const getProviderServicesCtr = async (req, res, next) => {

    try {
        let apiProvider = await general.getActiveApiProvider({tbName: "status" , tbValue: 1});
        apiProvider = apiProvider[0][0];

        const providerServices = await axios.post(`${apiProvider.url}?key=${apiProvider.apiKey}&action=services`);

        return res.status(201).json({
            status: 201,
            providerServices: providerServices.data,
            message: `successful!`
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// add New Service
export const addNewServiceCtr = async (req, res, next) => {
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

    try {
        const serviceDetails = {
            serviceID: req.body.serviceID,
            serviceProvider: req.body.serviceProvider,
            serviceCategory: req.body.serviceCategory,
            serviceType: req.body.serviceType,
            providerRate: req.body.providerRate,
            resellRate: req.body.resellRate,
            minOrder: req.body.minOrder,
            maxOrder: req.body.maxOrder,
            description: req.body.description
        };
        const result = await services.addService(serviceDetails);

        return res.status(201).json({
            status: 201,
            result,
            message: 'New Service was added successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get All Providers
export const getAllProvidersCtr = async (req, res, next) => {

    try {
        const apiProvider = await admin.getAllProviders();

        return res.status(201).json({
            status: 201,
            providers: apiProvider[0],
            message: `successful!`
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// change Provider Status
export const changeProviderStatusCtr = async (req, res, next) => {

    try {
        await admin.changeProviderStatus(req.body);

        return res.status(201).json({
            status: 201,
            message: `successful!`
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// delete API Provider
export const deleteApiProviderCtr = async (req, res, next) => {

    try {
        await admin.deleteApiProvider(req.body.id);

        return res.status(201).json({
            status: 201,
            message: `successful!`
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get specific Provider
export const getQueriedProviderCtr = async (req, res, next) => {

    try {
        const provider = await admin.getQueriedProvider(req.body.id);

        return res.status(201).json({
            status: 201,
            provider: provider[0][0],
            message: `successful!`
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// Add New API Provider to DB
export const addNewApiProviderCtr = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // res.send(errors);
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

    const uAPIproviderID = () => {
        const val1 = Date.now().toString(36);
        const val2 = Math.random().toString(36).substring(2);
        return val1 + val2;
    }

    try {
        const apiProviderDetails = {
            APIproviderID: uAPIproviderID(),
            userID: req.userID || req.body.userID,
            name: req.body.name,
            url: req.body.url,
            apiKey: req.body.apiKey,
            balance: req.body.balance || 0,
            currency: req.body.currency,
            description: req.body.description,
            status: req.body.status
        };

        await admin.addNewApiProvider(apiProviderDetails);

        return res.status(201).json({
            status: 201,
            provider: apiProviderDetails,
            message: 'New Service API Provider was added successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

// Update Multiple Colomb Service API Provider DB
export const editApiProviderCtr = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // res.send(errors);
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

    try {
        // console.log(req.body);

        const apiProviderDetails = {
            condition: "OR",
            tableName: "API_Provider",
            colombName: ["name", "url", "apiKey", "currency", "description", "status"],
            NewColombNameValue: [req.body.name, req.body.url, req.body.apiKey, req.body.currency, req.body.description, req.body.status],

            conditionColombName: ["id", "APIproviderID"],
            conditionColombValue: [req.body.id, req.body.APIproviderID]
        };

        // const apiProviderDetails = req.body;

        const result = await admin.updateApiProvider(apiProviderDetails, "OR");

        return res.status(201).json({
            status: 201,
            provider: req.body,
            message: 'Service API Provider updated successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get user by username or email
export const searchUsernameOrEmailCtr = async (req, res, next) => {

    try {
        const formData = req.body;
    
        const userExist = await auth.find(formData.usernameEmail);
        if (userExist[0].length > 0) {
            return res.status(201).json({
                status: 201,
                user: userExist[0][0],
                message: `success`,
            });
        } else {
            return res.status(208).json({
                status: 208,
                message: `User with this username or email does not exist`,
            });
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// change User Role
export const changeUserRoleCtr = async (req, res, next) => {

    try {
        await admin.updateUserRole({role: req.body.role, userID: req.body.userID})
    
        return res.status(201).json({
            status: 201,
            message: `User role has been updated successfully!!`,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// change the price for all service
export const servicePriceChangeCtr = async (req, res, next) => {
    const percentageIncrease = req.body.percentageIncrease;

    try {
        let allServices = await services.getAllServices();
        allServices = allServices[0];

        for (let i = 0; i < allServices.length; i++) {
            const service = allServices[i];

            let incRate = percentageIncrease / 100;
            let price = service.providerRate + (service.providerRate * incRate);
            const newPrice = Math.round((price + Number.EPSILON) * 100) / 100;

            await services.updateService({name: 'resellRate', value: newPrice, key: 'serviceID', keyValue: service.serviceID});
        }

        return res.status(201).json({
            status: 201,
            message: `prices of all service has been increased & updated by ${percentageIncrease}% successfully!!`,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get All Payment Methods
export const getAllPaymentMethodsCtr = async (req, res, next) => {

    try {
        const paymentMethods = await admin.getAllPaymentMethods();

        return res.status(201).json({
            status: 201,
            paymentMethods: paymentMethods[0],
            message: `successful!`
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get specific Payment Method
export const getQueriedPaymentMethodCtr = async (req, res, next) => {

    try {
        const paymentMethod = await admin.getQueriedPaymentMethod(req.body.paymentMethodID);

        return res.status(201).json({
            status: 201,
            paymentMethod: paymentMethod[0][0],
            message: `successful!`
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// Add new Payment Method
export const addPaymentMethodCtr = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // res.send(errors);
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

    const uAPIproviderID = () => {
        const val1 = Date.now().toString(36);
        const val2 = Math.random().toString(36).substring(2);
        return val1 + val2;
    }

    try {
        const paymentMethodDetails = {
            paymentMethodID: uAPIproviderID(),
            // userID: req.userID || req.body.userID,
            name: req.body.name,
            currency: req.body.currency,
            // apiKey: req.body.apiKey,
            minAmount: 1,
            maxAmount: 1000,
            exchangeRate: req.body.exchangeRate,
            data: req.body.data,
            status: req.body.status
        };

        const result = await admin.addNewPaymentMethod(paymentMethodDetails);

        return res.status(201).json({
            status: 201,
            paymentMethod: paymentMethodDetails,
            message: 'New payment Method was added successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// Update Payment Method
export const editPaymentMethodCtr = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // res.send(errors);
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

    try {
        const paymentMethodDetails = {
            condition: "OR",
            tableName: "payment_method",
            colombName: ["name", "currency", "exchangeRate", "data", "status"],
            NewColombNameValue: [req.body.name, req.body.currency, req.body.exchangeRate, req.body.data, req.body.status],

            conditionColombName: ["id", "paymentMethodID"],
            conditionColombValue: [req.body.id, req.body.paymentMethodID]
        };

        await admin.updatePaymentMethod(paymentMethodDetails, "OR");

        return res.status(201).json({
            status: 201,
            paymentMethod: paymentMethodDetails,
            message: 'payment method updated successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// delete Payment Method
export const deletePaymentMethodCtr = async (req, res, next) => {

    try {
        await admin.deletePaymentMethod(req.body.id);

        return res.status(201).json({
            status: 201,
            message: `successful!`
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get Report Data
export const getReportDataCtr = async (req, res, next) => {

    const sort = req.body.sort;

    try {
        let users;
        let orders;
        let payments;

        switch (sort) {
            case 'year':
                // total users number count by year
                users = await admin.getUsersReport({
                    colombName: "createdAt",
                    date: 'year',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
        
                // total Orders number count by months
                orders = await admin.getOrdersReport({
                    colombName: "createdAt",
                    date: 'year',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });

                // total payment_transactions number count by months
                payments = await admin.getPaymentsReport({
                    colombName: "createdAt",
                    date: 'year',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
            
                break;
        
            case 'month':
                // total users number count by months
                users = await admin.getUsersReport({
                    colombName: "createdAt",
                    date: 'month',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
        
                // total Orders number count by months
                orders = await admin.getOrdersReport({
                    colombName: "createdAt",
                    date: 'month',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });

                // total payment_transactions number count by months
                payments = await admin.getPaymentsReport({
                    colombName: "createdAt",
                    date: 'month',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
            
                break;
        
            case 'day':
                // total users number count by day
                users = await admin.getUsersReport({
                    colombName: "createdAt",
                    date: 'day',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
        
                // total Orders number count by day
                orders = await admin.getOrdersReport({
                    colombName: "createdAt",
                    date: 'day',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });

                // total payment_transactions number count by day
                payments = await admin.getPaymentsReport({
                    colombName: "createdAt",
                    date: 'day',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                
                break;
        
            default:
                // total users number count by day
                users = await admin.getUsersReport({
                    colombName: "createdAt",
                    date: '',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
        
                // total Orders number count by day
                orders = await admin.getOrdersReport({
                    colombName: "createdAt",
                    date: '',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });

                // total payment_transactions number count by day
                payments = await admin.getPaymentsReport({
                    colombName: "createdAt",
                    date: '',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });

                break;
        }

        let years = await admin.getReportYears();

        return res.status(201).json({
            status: 201,
            years: years[0],
            orders: orders[0],
            users: users[0],
            payments: payments[0],
            message: 'successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

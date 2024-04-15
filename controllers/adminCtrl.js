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
    try {
        const userID = req.userID;
        const email = req.email;

        let apiProviderDetails = await general.getActiveApiProvider({tbName: "status" , tbValue: 1});
        if (apiProviderDetails && apiProviderDetails.status == false) {
            return res.status(500).json({
                status: 500,
                ...apiProviderDetails,
            });
        }
        apiProviderDetails = apiProviderDetails[0];

        const apiProviderBalRes = await axios.post(`${apiProviderDetails.url}?key=${apiProviderDetails.apiKey}&action=balance`);
        
        const newData = {
            balance: apiProviderBalRes.data.balance,
            currency: apiProviderBalRes.data.currency,
        };
        const condition1 = {
            APIproviderID: apiProviderDetails.APIproviderID
        };
        const result1 = await admin.updateApiProvider(condition1, newData);
        if (result1 && result1.status == false) {
            return res.status(500).json({
                status: 500,
                ...result1,
            });
        }

        let uzer = await admin.getUserByID(userID);
        if (uzer && uzer.status == false) {
            return res.status(500).json({
                status: 500,
                ...uzer,
            });
        }
        uzer = uzer[0];

        let totalUsers;
        if (uzer.role == 'admin') {
            totalUsers = await admin.getTotalUsers();
        } else {
            totalUsers = await admin.getTotalUserUsers();
        }
        if (totalUsers && totalUsers.status == false) {
            return res.status(500).json({
                status: 500,
                ...totalUsers
            });
        }

        const apiBalance = await admin.getApiBalance();
        if (apiBalance && apiBalance.status == false) {
            return res.status(500).json({
                status: 500,
                ...apiBalance
            });
        }

        const totalOrders = await admin.getTotalOrders();
        if (totalOrders && totalOrders.status == false) {
            return res.status(500).json({
                status: 500,
                ...totalOrders
            });
        }

        const totalProfit = await admin.getTotalProfit();
        if (totalProfit && totalProfit.status == false) {
            return res.status(500).json({
                status: 500,
                ...totalProfit
            });
        }

        const monthlyProfit = await admin.getMonthlyProfit();
        if (monthlyProfit && monthlyProfit.status == false) {
            return res.status(500).json({
                status: 500,
                ...monthlyProfit
            });
        }

        const totalPayments = await admin.getTotalPayments();
        if (totalPayments && totalPayments.status == false) {
            return res.status(500).json({
                status: 500,
                ...totalPayments
            });
        }

        // const totalUsers = await admin.getTotalUsers();
        const totalTickets = await admin.getTotalTickets();
        if (totalTickets && totalTickets.status == false) {
            return res.status(500).json({
                status: 500,
                ...totalTickets
            });
        }

        const dashboardOrders = await admin.getDashboardOrders();

        for (let i = 0; i < dashboardOrders.length; i++) {
            const service = await services.getServiceByID(dashboardOrders[i].serviceID);
            if (service && service.status == false) {
                return res.status(500).json({
                    status: 500,
                    ...service
                });
            }

            dashboardOrders[i].serviceCategory = service[0].serviceCategory;
        }

        return res.status(201).json({
            status: 201,
            result: {
                apiBalance: apiBalance[0].balance,
                totalOrders: totalOrders,
                totalProfit: totalProfit,
                monthlyProfit: monthlyProfit,
                totalPayments: totalPayments,
                totalUsers: totalUsers,
                totalTickets: totalTickets
            },
            orders: dashboardOrders,
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
    try {
        const allActiveTicket = await admin.getAllActiveTicket();
        if (allActiveTicket && allActiveTicket.status == false) {
            return res.status(500).json({
                status: 500,
                ...allActiveTicket,
            });
        }

        return res.status(201).json({
            status: 201,
            ticket: allActiveTicket,
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
    
    try {
        const message = req.body.message;
        const ticketID = req.body.ticketID;
        let file = '';
    
        const userID = req.userID;
        // const email = req.email;

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

        const result = await general.ticket_messages(data2send);
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result,
            });
        }

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
    try {
        // const userID = req.userID;
        const ticketID = req.body.ticketID;

        let ticket = await admin.getTicket({ticketID});
        if (ticket && ticket.status == false) {
            return res.status(500).json({
                status: 500,
                ...ticket,
            });
        }
        ticket = ticket[0];

        let ticketUser = await admin.getUserByID(ticket.userID);
        if (ticketUser && ticketUser.status == false) {
            return res.status(500).json({
                status: 500,
                ...ticketUser,
            });
        }
        ticketUser = ticketUser[0];

        let ticketMessages = await admin.getTicketMessage({ticketID});
        if (ticketMessages && ticketMessages.status == false) {
            return res.status(500).json({
                status: 500,
                ...ticketMessages,
            });
        }

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
    try {
        const result = await admin.closeTicket(req.body.ticketID);
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result,
            });
        }

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
    try {
        const userID = req.userID;
        // const ticketID = req.body.ticketID;

        let uzer = await admin.getUserByID(userID);
        if (uzer && uzer.status == false) {
            return res.status(500).json({
                status: 500,
                ...uzer,
            });
        }

        let users;
        if (uzer.role == 'admin') {
            users = await admin.getAllUsers();
        } else {
            users = await admin.getAllUserUsers();
        }
        if (users && users.status == false) {
            return res.status(500).json({
                status: 500,
                ...users,
            });
        }

        return res.status(201).json({
            statusCode: 201,
            users: users,
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
    try {
        // const userID = req.userID;
        const userID = req.body.userID;

        const user = await admin.getUserByID(userID);
        if (user && user.status == false) {
            return res.status(500).json({
                status: 500,
                ...user,
            });
        }

        return res.status(201).json({
            statusCode: 201,
            user: user[0],
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
    
    try {
        const userID = req.body.userID;
        // const formKeys = req.body.formKeys;
        // const formValues = req.body.formValues;
        const newData = req.body.newData;

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

        const updatedUser = await auth.updateUser(userID, newData);
        if (updatedUser && updatedUser.status == false) {
            return res.status(500).json({
                status: 500,
                ...updatedUser,
            });
        }

        const newUserData = await auth.findByID(userID);
        if (newUserData && newUserData.status == false) {
            return res.status(500).json({
                status: 500,
                ...newUserData,
            });
        }

        return res.status(201).json({
            status: 201,
            message: 'Profile details updated successfully!',
            user: newUserData,
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
    try {
        const userID = req.body.userID;
        // sned send an object with userID property
        const payments = await user.getUserPayments({userID});
        if (payments && payments.status == false) {
            return res.status(500).json({
                status: 500,
                ...payments,
            });
        }

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
    try {
        const userID = req.body.userID;

        const order = await user.getUserOrders({userID});
        if (order && order.status == false) {
            return res.status(500).json({
                status: 500,
                ...order,
            });
        }

        for (let i = 0; i < order.length; i++) {
            const element = order[i];

            let data = {
                tbColomb: "serviceID",
                value: element.serviceID
            };

            const result1 = await services.getSpecificService(data);
            if (result1 && result1.status == false) {
                return res.status(500).json({
                    status: 500,
                    ...result1,
                });
            }
            let serviceData = result1[0];
            order[i].serviceCategory = serviceData.serviceCategory;
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
    try {
        const order = await admin.getAllOrders();
        if (order && order.status == false) {
            return res.status(500).json({
                status: 500,
                ...order,
            });
        }

        for (let i = 0; i < order.length; i++) {
            const element = order[i];

            let data = {
                tbColomb: "serviceID",
                value: element.serviceID
            };

            const result1 = await services.getSpecificService(data);
            if (result1 && result1.status == false) {
                return res.status(500).json({
                    status: 500,
                    ...result1,
                });
            }
            let serviceData = result1[0];
            order[i].serviceCategory = serviceData.serviceCategory;
            

            const result2 = await admin.getUserByID(`${element.userID}`);
            if (result2 && result2.status == false) {
                return res.status(500).json({
                    status: 500,
                    ...result2,
                });
            }
            const user = result2[0];
            order[i].username = user.username;
            order[i].email = user.email;
            order[i].name = user.name;
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
    try {
        const userID = req.body.userID;
        const amount = req.body.amount;
        const username = req.body.username;

        const user = await admin.getUserByID(`${userID}`);
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

        if (user[0].username != username) {
            return res.status(401).json({
                statusCode: 401,
                message: "The Entered username is incorrect!"
            });
        };

        const newBal = Number(user[0].balance) + Number(amount);
        const result = await admin.deduct_upgradeUserBalance({userID, balance: newBal });
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result
            });
        }

        // const Cuser = await admin.getUserByID(`${userID}`);
        delete user[0].password;

        return res.status(201).json({
            status: 201,
            user: user[0],
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
    try {
        const userID = req.body.userID;
        const amount = req.body.amount;
        const username = req.body.username;

        const user = await admin.getUserByID(`${userID}`);
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

        if (user[0].username != username) {
            return res.status(401).json({
                statusCode: 401,
                message: "The Entered username is incorrect!"
            });
        };

        const newBal = Number(user[0].balance) - Number(amount);
        const result = await admin.deduct_upgradeUserBalance({userID, balance: newBal });
        if (result && result.status == false) {
            return res.status(201).json({
                status: 201,
                ...result
            });
        }

        // const Cuser = await admin.getUserByID(`${userID}`);
        delete user[0].password;

        return res.status(201).json({
            status: 201,
            user: user[0],
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
    try {
        const Payments = await admin.getAllPayments();
        if (Payments && Payments.status == false) {
            return res.status(500).json({
                status: 500,
                ...Payments
            });
        }

        for (let i = 0; i < Payments.length; i++) {
            const element = Payments[i];

            let uzer = await admin.getUserByID(element.userID);
            if (uzer && uzer.status == false) {
                return res.status(500).json({
                    status: 500,
                    ...uzer
                });
            }
            uzer = uzer[0];
            Payments[i].username = uzer.username;
            Payments[i].email = uzer.email;
            Payments[i].name = uzer.name;

            // const exraDatas = JSON.parse(element.extraData);
            const exraDatas = element.extraData;
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
    try {
        const serviceIDs = req.body;
        const result = [];
        
        for (let i = 0; i < serviceIDs.length; i++) {
            const serviceIDresult = await services.deleteServiceByID(serviceIDs[i]);
            if (serviceIDresult && serviceIDresult.status == false) {
                return res.status(500).json({
                    status: 500,
                    ...serviceIDresult
                });
            }

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
        const apiProvider = await general.getActiveApiProvider({tbName: "status" , tbValue: 1});
        if (apiProvider && apiProvider.status == false) {
            return res.status(500).json({
                status: 500,
                ...apiProvider
            });
        }

        // const responze = JSON.stringify(apiProvider[0]);
        // const response = JSON.parse(responze);

        const response = apiProvider[0]._doc;

        const url = `${response.url}?key=${response.apiKey}&action=services`;
        const providerServices = await axios.post(url);

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
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                message: result.message || 'New Service was added successfully!'
            });   
        }

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
        if (apiProvider && apiProvider.status == false) {
            return res.status(500).json({
                status: 500,
                ...apiProvider
            }); 
        }

        return res.status(201).json({
            status: 201,
            providers: apiProvider,
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
        const result = await admin.changeProviderStatus(req.body);
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result
            }); 
        }

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
        const result = await admin.deleteApiProvider(req.body.id);
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result
            }); 
        }

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
        if (provider && provider.status == false) {
            return res.status(500).json({
                status: 500,
                ...provider
            }); 
        }

        return res.status(201).json({
            status: 201,
            provider: provider[0],
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

    try {
        const uAPIproviderID = () => {
            const val1 = Date.now().toString(36);
            const val2 = Math.random().toString(36).substring(2);
            return val1 + val2;
        }

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

        const result = await admin.addNewApiProvider(apiProviderDetails);
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result
            }); 
        }

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
        const condition = {
            APIproviderID: req.body.APIproviderID
        }

        const newData = {
            name: req.body.name,
            url: req.body.url,
            apiKey: req.body.apiKey,
            currency: req.body.currency,
            description: req.body.description,
            status: req.body.status,
        }

        const result = await admin.updateApiProvider(condition, newData);
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result
            });
        }

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
        if (userExist && userExist.status != false) {
            return res.status(201).json({
                status: 201,
                user: userExist,
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
        const result = await admin.updateUserRole({role: req.body.role, userID: req.body.userID});
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result
            });
        }
    
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
    try {
        const percentageIncrease = req.body.percentageIncrease;

        const allServices = await services.getAllServices();
        if (allServices && allServices.status == false) {
            return res.status(500).json({
                status: 500,
                ...allServices
            });
        }

        for (let i = 0; i < allServices.length; i++) {
            const service = allServices[i];

            let incRate = percentageIncrease / 100;
            let price = service.providerRate + (service.providerRate * incRate);
            const newPrice = Math.round((price + Number.EPSILON) * 100) / 100;

            const result = await services.updateService({name: 'resellRate', value: newPrice, key: 'serviceID', keyValue: service.serviceID});
            if (result && result.status == false) {
                return res.status(500).json({
                    status: 500,
                    ...result
                });
            }
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
        if (paymentMethods && paymentMethods.status == false) {
            return res.status(500).json({
                status: 500,
                ...paymentMethods
            });
        }

        return res.status(201).json({
            status: 201,
            paymentMethods: paymentMethods,
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
        if (paymentMethod && paymentMethod.status == false) {
            return res.status(500).json({
                status: 500,
                ...paymentMethod
            });
        }

        return res.status(201).json({
            status: 201,
            paymentMethod: paymentMethod[0],
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
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result,
            });
        }

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

        const condition = {
            paymentMethodID: req.body.paymentMethodID
        };

        const newData = {
            name: req.body.name,
            currency: req.body.currency,
            exchangeRate: req.body.exchangeRate,
            data: req.body.data,
            status: req.body.status,
        }

        const result = await admin.updatePaymentMethod(newData, condition);
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result
            });
        }


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
        const result = await admin.deletePaymentMethod(req.body.id);
        if (result && result.status == false) {
            return res.status(500).json({
                status: 500,
                ...result
            }); 
        }

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
    try {
        const sort = req.body.sort;
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
                if (users && users.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...users
                    });
                }
        
                // total Orders number count by months
                orders = await admin.getOrdersReport({
                    colombName: "createdAt",
                    date: 'year',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (orders && orders.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...orders
                    });
                }

                // total payment_transactions number count by months
                payments = await admin.getPaymentsReport({
                    colombName: "createdAt",
                    date: 'year',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (payments && payments.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...payments
                    });
                }
            
                break;
        
            case 'month':
                // total users number count by months
                users = await admin.getUsersReport({
                    colombName: "createdAt",
                    date: 'month',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (users && users.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...users
                    });
                }
        
                // total Orders number count by months
                orders = await admin.getOrdersReport({
                    colombName: "createdAt",
                    date: 'month',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (orders && orders.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...orders
                    });
                }

                // total payment_transactions number count by months
                payments = await admin.getPaymentsReport({
                    colombName: "createdAt",
                    date: 'month',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (payments && payments.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...payments
                    });
                }
            
                break;
        
            case 'day':
                // total users number count by day
                users = await admin.getUsersReport({
                    colombName: "createdAt",
                    date: 'day',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (users && users.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...users
                    });
                }
        
                // total Orders number count by day
                orders = await admin.getOrdersReport({
                    colombName: "createdAt",
                    date: 'day',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (orders && orders.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...orders
                    });
                }

                // total payment_transactions number count by day
                payments = await admin.getPaymentsReport({
                    colombName: "createdAt",
                    date: 'day',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (payments && payments.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...payments
                    });
                }
                
                break;
        
            default:
                // total users number count by day
                users = await admin.getUsersReport({
                    colombName: "createdAt",
                    date: '',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (users && users.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...users
                    });
                }
        
                // total Orders number count by day
                orders = await admin.getOrdersReport({
                    colombName: "createdAt",
                    date: '',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (orders && orders.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...orders
                    });
                }

                // total payment_transactions number count by day
                payments = await admin.getPaymentsReport({
                    colombName: "createdAt",
                    date: '',
                    year: req.body.year || new Date().getFullYear(),
                    month: req.body.month || new Date().getMonth()+1
                });
                if (payments && payments.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...payments
                    });
                }

                break;
        }

        const years = await admin.getReportYears();
        if (years && years.status == false) {
            return res.status(500).json({
                status: 500,
                ...years
            });
        }
        return res.status(201).json({
            status: 201,
            years: years,
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

import { validationResult } from "express-validator";
import nodemailer from 'nodemailer';
import axios from "axios";

// models
import { general } from '../models/general.js';
import { services } from '../models/services.js';
import { user, auth } from '../models/users.js';
import { admin } from '../models/admin.js';


export const placeOrderCtr = async (req, res, next) => {
    try {
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
    
        let status;
        let note = [];
    
        // get the user current data to check bal
        let Cuser = await user.getCurrentUser({userID: req.body.userID});
        let CuserDetails;
        if (Cuser[0].length !== 1) {
            return res.status(401).json({
                status: 401,
                error: Cuser,
                message: `unable to get user data`
            });
        } else {
            CuserDetails = Cuser[0][0];
    
            if (CuserDetails.balance < req.body.amount) {
                return res.status(207).json({
                    status: 207,
                    message: "Insufficient Funds! add funds to your account and try again."
                });
            }
        }
    
        // get the service and check for errors
        let servicexx;
        try {
            // get the service details
            let service =  await services.getServiceByID(req.body.serviceID);
            service = service[0];
            // checks if the serviceID is valid
            if (service.length > 1) {
                const error = {
                    message: "an error occured!"
                };
    
                return res.status(500).json({
                    status: 500,
                    error
                });
            }
    
            // checks if the serviceID is valid
            if (service.length < 1 || !service || !service.length) {
                const error = {
                    message: "Incorrect serviceID"
                }
                
                return res.status(401).json({
                    status: 401,
                    error,
                });
            }
            service = service[0];
            servicexx = service;
            
            // check minimum order
            if (service.minOrder > req.body.quantity) {
                const error = {
                    message: `minimum order must be greater than ${service.minOrder}`
                }
        
                return res.status(401).json({
                    status: 401,
                    error
                });
            }
    
            // check maximum order
            if (req.body.quantity > service.maxOrder) {
                const error = {
                    message: `maximum order is ${service.minOrder}`
                }
        
                return res.status(401).json({
                    status: 401,
                    error
                });
            }
    
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "an error occured!",
                error
            });
        }
    
        let apiProvider  = await general.getActiveApiProvider({tbName: "status" , tbValue: 1});
        let apiProviderDetails;
        if (apiProvider[0]) {
            apiProviderDetails = apiProvider[0][0];
        }
    
        // check api provider price
        try {
            const apiProviderServices = await axios.post(`${apiProviderDetails.url}?key=${apiProviderDetails.apiKey}&action=services`);
    
            let service = apiProviderServices.find(obj => obj.service == req.body.serviceID);
    
            if(service) {
                if (service.rate > servicexx.resellRate || service.rate > servicexx.providerRate) {
                    // update the record with the new pricing
    
                    let price = service.rate + (service.rate * 30/100);
                    const newPrice = Math.round((price + Number.EPSILON) * 100) / 100;
    
                    const updateDetails = {
                        colombName: ["resellRate", "providerRate"],
                        NewColombNameValue: [newPrice, service.rate],
                
                        conditionColombName: ["serviceID"],
                        conditionColombValue: [req.body.serviceID]
                    };
                    
                    await services.updateMultipleServices(updateDetails);
    
                    return res.status(500).json({
                        status: 500,
                        message: "pricing error, please refresh and try again!",
                        error
                    });
                }
    
                // if (service.rate > servicexx.providerRate) {
                    
                // }
            }
    
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "an error occured!",
                error
            });
        }
        
        // NOTE::: update the current balance of the API Provider
        let err;
        try {
            const apiProviderBalRes = await axios.post(`${apiProviderDetails.url}?key=${apiProviderDetails.apiKey}&action=balance`);
            // console.log(apiProviderBalRes.data);
    
            let data = {
                colombName: ["balance", "currency"],
                NewColombNameValue: [`${apiProviderBalRes.data.balance}`, `${apiProviderBalRes.data.currency}`],
    
                conditionColombName: ["APIproviderID", "id"],
                conditionColombValue: [`${apiProviderDetails.APIproviderID}`, `${apiProviderDetails.id}`]
            }
            // UPDATE the database
            apiProviderDetails.balance = apiProviderBalRes.data.balance;
            apiProviderDetails.currency = apiProviderBalRes.data.currency;
            await admin.updateApiProvider(data, "OR");
        } catch (error) {
            err = error;
    
            status = "Pending";
            note.push("unable to check and update " + apiProviderDetails.name + " account balance");
        };
    
        // checks the  available balance at the providers ends 
        if (apiProviderDetails.balance < req.body.costAmount) {
            status = "Pending";
            note.push("API provider @ " + apiProviderDetails.name + " Insufficient Funds");
        }
    
        // DEDUCT the service cost from the user balance
        try {
            let data = {
                colombName: ["balance"],
                NewColombNameValue: [`${CuserDetails.balance - req.body.amount}`],
        
                conditionColombName: ["userID", "id"],
                conditionColombValue: [req.body.userID, CuserDetails.id]
            };
            await user.orderBalDeduction(data, "OR");
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error,
                message: `unable to deduct funds from the user account`
            });
        }
    
        // save the order details to the database;
        // const uOrderID = () => {
        //     const val1 = Date.now().toString(36);
        //     const val2 = Math.random().toString(36).substring(2);
        //     return val1 + val2;
        // }
        let result;
        try {
            const ordersDetails = {
                // orderID: uOrderID(),
                orderID: Date.now(),
                userID: req.body.userID,
                serviceID: req.body.serviceID,
                // id: req.body.serviceDBid,
                type: req.body.type,
                APIproviderID: apiProviderDetails.APIproviderID,
    
                quantity: req.body.quantity,
                link: req.body.link,
    
                amount: req.body.amount,
                costAmount: req.body.costAmount,
                apiCharge: null,
                profit: req.body.profit,
    
                status: status || "Pending",
                note: `${note}`
            };
    
            result = await general.placeOrder(ordersDetails);
        } catch (error) {
            const updateUserDetails = {
                colombName: ["balance"],
                NewColombNameValue: [CuserDetails.balance],
        
                conditionColombName: ["id"],
                conditionColombValue: [CuserDetails.id]
            };
            
            await auth.updateUser(updateUserDetails);
    
            return res.status(206).json({
                status: 206,
                error,
                message: `funds deducted and refunded. But was unable to save the order details to the database.`
            });
        }
    
        // Please Order to the Provide through the API 
        try {
            let apiText = `${apiProviderDetails.url}?key=${apiProviderDetails.apiKey}&action=add&service=${req.body.serviceID}&link=${req.body.link}&quantity=${req.body.quantity}`;
            const response = await axios.post(apiText);
    
            // check if the response from the api provider has 
            if (response.data.error) {
                err = response.data.error;
                status = "Pending";
                note.push("unable to place order through the API at " + apiProviderDetails.name + " because of this error "+err);
                let data = {
                    colombName: ["note", "status"],
                    NewColombNameValue: [`${note}`, `${status}`],
    
                    conditionColombName: ["id"],
                    conditionColombValue: [`${result[0].insertId}`]
                };
                await general.updateOrder(data, "AND");
    
                return res.status(202).json({
                    status: 202,
                    error: err,
                    message: `service order could not be placed to the Provide (${apiProviderDetails.name}) through the API`
                });
            }
    
            if (response.data.order) {
                let data = {
                    colombName: ["providerOrderID"],
                    NewColombNameValue: [`${response.data.order}`],
        
                    conditionColombName: ["id"],
                    conditionColombValue: [`${result[0].insertId}`]
                };
                await general.updateOrder(data, "AND");
            }
    
            let apiText2 = `${apiProviderDetails.url}?key=${apiProviderDetails.apiKey}&action=status&order=${response.data.order}`;
            const orderIdRes = await axios.post(apiText2);
           
            if (orderIdRes.data.status) {
                let data = {
                    colombName: ["apiCharge", "status", "startCount", "remains"],
                    NewColombNameValue: [`${orderIdRes.data.charge}`, `${orderIdRes.data.status}`, `${orderIdRes.data.start_count}`, `${orderIdRes.data.remains}`],
        
                    conditionColombName: ["id"],
                    conditionColombValue: [`${result[0].insertId}`]
                };
                await general.updateOrder(data, "AND");
            }
    
            let getOrderRes = await user.getOrderById(`${result[0].insertId}`);
            if (getOrderRes[0].length == 1) {
                // getOrderRes = getOrderRes[0][0];
                getOrderRes = {
                    orderID: getOrderRes[0][0].orderID,
                    providerOrderID: getOrderRes[0][0].providerOrderID,
                    serviceID: getOrderRes[0][0].serviceID,
                    userID: getOrderRes[0][0].userID,
                    link: getOrderRes[0][0].link,
                    quantity: getOrderRes[0][0].quantity,
    
                    amount: getOrderRes[0][0].amount,
                    costAmount: getOrderRes[0][0].costAmount,
                    apiCharge: getOrderRes[0][0].apiCharge,
    
                    startCount: getOrderRes[0][0].startCount,
                    remains: getOrderRes[0][0].remains,
    
                    status: getOrderRes[0][0].status,
                    createdAt: getOrderRes[0][0].createdAt
                }
            }
    
            return res.status(201).json({
                status: 201,
                result: getOrderRes,
                error: err,
                message: 'Service order was placed successfully!'
            });
        } catch (error) {
            err = error;
            status = "Pending";
            note.push("unable to place order through the API at " + apiProviderDetails.name);
            let data = {
                colombName: ["note", "status"],
                NewColombNameValue: [`${note}`, status],
    
                conditionColombName: ["id"],
                conditionColombValue: [`${result[0].insertId}`]
            };
            await general.updateOrder(data, "AND");
    
            return res.status(202).json({
                status: 202,
                error: err,
                message: `service order could not be placed to the Provide (${apiProviderDetails.name}) through the API`
            });
        }
        
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        error.msg = "unknown error!!!";
        next(error);
    }
}

// Add New Service API Provider to DB
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
            userID: req.body.userID,
            name: req.body.name,
            url: req.body.url,
            apiKey: req.body.apiKey,
            balance: req.body.balance,
            currency: req.body.currency,
            description: req.body.description,
            status: req.body.status
        };

        const result = await admin.addNewApiProvider(apiProviderDetails);

        return res.status(201).json({
            status: 201,
            result,
            message: 'New Service API Provider was added successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get the data dashboard needed data
export const getDashboardDataCtr = async (req, res, next) => {
    const sentData = req.body;

    try {
        let Cuser = await user.getCurrentUser(sentData);
        Cuser = Cuser[0][0];
        let payments = await user.getUserPayments(sentData);
        payments = payments[0];
        let order = await user.getUserOrders(sentData);
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
                    // console.log(err);
                }
            );
        }
        
        const resData = {
            user: Cuser,
            order,
            payments
        }

        return res.status(201).json({
            status: 201,
            result: resData,
            message: 'successfully!'
            // data: apiProviderDetails
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
    const sentData = req.body;
    // console.log(sentData);
    const userss = {
        userID: sentData.userID
    }

    try {
        let order = await user.getUserOrders(userss);
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
                    // console.log(err);
                }
            );
        }

        return res.status(201).json({
            status: 201,
            order,
            message: 'successfully!'
            // data: apiProviderDetails
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get user data
export const getUserCtr = async (req, res, next) => {
    const userID = req.userID || req.body.userID;

    try {
        let user = await auth.findByID(userID);
        user = user[0][0];

        return res.status(201).json({
            status: 201,
            user,
            message: 'successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// Update Multiple Colomb Service API Provider DB
export const updateApiProviderCtr = async (req, res, next) => {
    
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

        // const apiProviderDetails = {
        //     condition: "AND",
        //     tableName: "API_Provider",
        //     colombName: ["apiKey", "id",],
        //     NewColombNameValue: [],

        //     conditionColombName: [],
        //     conditionColombValue: []
        // };

        const apiProviderDetails = req.body;

        const result = await admin.updateApiProvider(apiProviderDetails, "AND");

        return res.status(201).json({
            status: 201,
            result,
            message: 'Service API Provider updated successfully!'
            // data: apiProviderDetails
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// create New Ticket
export const createNewTicketCtr = async (req, res, next) => {
    try {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(401).json({
                status: 401,
                message: 'Form data Error!', 
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

    const hostname = req.hostname.toLowerCase();

    const subject = req.body.subject;
    const message = req.body.message;
    const ticketID = (""+Date.now()).substring(4,10);

    const userID = req.userID;
    const email = req.email;
    let file = '';

    try {
        // file upload
        if (req.files) {
            const attachedFile = req.files.attachedFile;
    
            if (Object.keys(req.files).length > 0 && attachedFile.size < 2100000) {
                let fileExtension =  attachedFile.name.slice((attachedFile.name.lastIndexOf(".")))

                // let uploadPath =  'uploads/' + ticketID + '/' + attachedFile.name;
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

        let adminUsers = await user.getAdminUsers();
        adminUsers = adminUsers[0].map( element => 
            element.email
        );
        adminUsers = adminUsers.toString();

        const details = {
            from: authUser,
            to: adminUsers || `contact@tesamedia.com`, // who should recieve the mail
            replyTo: email || '',
            bcc: `contact@tesamedia.com, ${authUser || 'support@secretweb.vip'}`,
            subject: `#ticket: ${ticketID}, ${subject}`,
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

        const data2send = {
            ticketID,
            userID,
            subject,
            message,
            attachedFile: file
        };

        await general.createNewTicket(data2send);
        
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

// get User Ticket
export const getUserTicketCtr = async (req, res, next) => {
    const userID = req.userID;
    // const email = req.email;

    try {
        let ticket = await user.getUserTickets({userID});
        ticket = ticket[0];

        return res.status(201).json({
            status: 201,
            ticket,
            message: 'successful!'
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
        // file upload
        if (req.files) {
            const attachedFile = req.files.attachedFile;
    
            if (Object.keys(req.files).length > 0 && attachedFile.size < 2100000) {
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

// get User's Ticket Message
export const getUserTicketMessageCtr = async (req, res, next) => {
    // const userID = req.userID;
    const ticketID = req.body.ticketID;

    try {
        let ticket = await user.getTicket({ticketID});
        ticket = ticket[0][0];

        let ticketMessages = await user.getUserTicketMessage({ticketID});
        ticketMessages = ticketMessages[0];

        return res.status(201).json({
            status: 201,
            ticketMessages,
            ticket,
            message: 'successful!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// generate a New Api Key Controller
export const generateNewApiKeyCtr = async (req, res, next) => {
    const userID = req.userID;
    // const email = req.email;

    const uApiKey = () => {
        const val1 = Date.now().toString(36);
        const val2 = Math.random().toString(36).substring(2);
        return val1 + val2;
    };
    try {
        const changeApiKeyDetails = {
            colombName: ['apiKey'],
            NewColombNameValue: [`${uApiKey()}`],

            conditionColombName: ['userID'],
            conditionColombValue: [`${userID}`]
        };

        await auth.updateUser(changeApiKeyDetails);

        // get the the user new data and send back to the view
        let user = await auth.findByID(userID);
        if (user[0].length !== 1) {
            const error = new Error('A user with this ID could not be found!');
            error.statusCode = 401;
            error.message = "an error occured, but Api Key was changed!";

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                message: error.message
            });
        };
        user = user[0][0];

        return res.status(201).json({
            status: 201,
            newApiKey: user.apiKey,
            message: 'Api Key changed!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// add Funds to user balance Controller
export const addFundsCtr = async (req, res, next) => {
    const userID = req.userID;
    // const email = req.email;
    const sentData = req.body;
    
    try {
        const ipResponse = await axios.get("http://ip-api.com/json");

        let extraData = JSON.parse(sentData.extraData);
        extraData.ip = ipResponse.data.query;
        extraData.lat = ipResponse.data.lat;
        extraData.lon = ipResponse.data.lon;
        extraData.country = ipResponse.data.country;
        extraData.usedNetwork = ipResponse.data.as;

        extraData = JSON.stringify(extraData);

        const data2send = {
            transactionID: sentData.transactionID,
            userID: userID,
            currency: sentData.currency,
            paymentMethod: sentData.paymentMethod,
            extraData: extraData,
            amount: sentData.amount,
            status: sentData.status
        };

        await user.addFunds(data2send);

        // get the the user data
        let Cuser = await auth.findByID(userID);
        if (Cuser[0].length !== 1) {
            const error = new Error('A user with this ID could not be found!');
            error.statusCode = 401;
            error.message = "Payment successful, but couldn't add to your curreent blance, please contact admins with this payment transaction id: "+data2send.transactionID;

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                message: error.message
            });
        }
        Cuser = Cuser[0][0];

        // if its a failed transaction it ends here
        if (sentData.status == 'Failed') {
            return res.status(201).json({
                status: 201,
                balance: Cuser.balance,
                message: 'payment cancelled'
            });
        }

        const newBalanceDetails = {
            colombName: ['balance'],
            NewColombNameValue: [`${sentData.amount + Cuser.balance}`],

            conditionColombName: ['userID'],
            conditionColombValue: [`${userID}`]
        };
        await auth.updateUser(newBalanceDetails);

        Cuser.balance = sentData.amount + Cuser.balance;

        return res.status(201).json({
            status: 201,
            balance: Cuser.balance,
            message: 'Funds added Successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// get users payment transactions
export const getPaymentTransactionsCtr = async (req, res, next) => {
    const userID = req.userID;
    
    try {
        // send an object with userID property
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

// get Payment Method transactions
export const getPaymentMethodCtr = async (req, res, next) => {
    const userID = req.userID;
    
    try {
        // get the the user data
        let Cuser = await auth.findByID(userID);
        if (Cuser[0].length !== 1) {
            const error = new Error('A user with this ID could not be found!');
            error.statusCode = 401;
            error.message = "user authentication error";

            return res.status(401).json({
                error,
                statusCode: error.statusCode,
                message: error.message
            });
        }
        Cuser = Cuser[0][0];

        const user = {
            userID: Cuser.userID,
            role: Cuser.role,
            name: Cuser.name,
            username: Cuser.username,
            email: Cuser.email,
            phoneNumber: Cuser.phoneNumber,
            balance: Cuser.balance,
            apiKey: Cuser.apiKey,
            country: Cuser.country,
            status: Cuser.status
        };

        // get Payment Methods
        let paymentMethods = await general.getPaymentMethods();
        paymentMethods = paymentMethods[0];

        return res.status(201).json({
            status: 201,
            user,
            paymentMethods
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
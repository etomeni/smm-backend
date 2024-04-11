import axios from "axios";

// models
import { general } from '../models/general.js';
import { services } from '../models/services.js';
import { user, auth } from '../models/users.js';

// user's API v1.0.0
export const apiv1ctr = async (req, res, next) => {
    try {
        // checks if the user sent his/her api key
        if (!req.query || !req.query.key) {
            const error = {
                message: "unauthorized access!"
            }
    
            return res.status(401).json({
                statusCode: 401,
                error,
            });
        }
    
        const key = req.query.key;
        // API key authentication
        const apiUser = await auth.findByApiKey(key);
        if (apiUser && apiUser.status == false) {
            return res.status(500).json({
                status: 500,
                ...apiUser,
            });
        }
    
        if (apiUser.length > 1) {
            const error = {
                message: "Api Key Error! Please reset the key or contact the admin for help"
            }
    
            return res.status(401).json({
                statusCode: 401,
                error,
            });
        }
    
        if (apiUser.length < 1 || !apiUser || !apiUser.length) {
            const error = {
                message: "unauthorized access! Wrong api key"
            }
    
            return res.status(401).json({
                statusCode: 401,
                error,
            });
        }
        apiUser = apiUser[0];
        
        // checks if the user specified the action to carry out
        var action_options = ["services", "order", "status", "balance"];
        if (!req.query.action || !action_options.includes(req.query.action)) {
            const error = {
                message: "Incorrect request!"
            };
    
            return res.status(401).json({
                statusCode: 401,
                error,
            });
        }
    
        const action = req.query.action; // VALUES:: services | order | status | balance
        
        if (action == "services") {
            try {
                const dbServices = await services.getAllServices();
                if (dbServices && dbServices.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...dbServices,
                    });
                }

                if (!(dbServices.length)) {
                    const error = {
                        dbServices,
                        message: "an error occured!"
                    };
    
                    return res.status(500).json({
                        statusCode: 500,
                        error
                    });
                }
    
                
                dbServices.forEach(element => {
                    element.rate = element.resellRate;
    
                    delete element.id;
                    delete element.description;
                    delete element.updatedAt;
                    delete element.createdAt;
                    delete element.providerRate;
                    delete element.resellRate;
    
                    // delete Object.assign(element, {[rate]: element[resellRate] })[resellRate];
                });
        
                return res.send(dbServices);
      
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        }
    
        if (action == "balance") {
            return res.status(201).json({
                statusCode: 201,
                balance: apiUser.balance,
                currency: "USD"
            });
        }
    
        if (action == "status") {
            try {
                // checks if there is an orderID query parameter
                if (!req.query.orderID) {
                    const error = {
                        message: "Incorrect request!"
                    };
    
                    return res.status(401).json({
                        statusCode: 401,
                        error,
                    });
                }
                
                const orderID = req.query.orderID;
                
                let order =  await general.getOrder(orderID);
                if (order && order.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...order,
                    });
                }

                // checks if the orderID is valid
                if (order.length > 1) {
                    const error = {
                        message: "an error occured!"
                    };
    
                    return res.status(500).json({
                        statusCode: 500,
                        message: "duplicated order with same id found!",
                        error
                    });
                }
    
                // checks if the orderID is valid
                if (order.length < 1 || !order || !order.length) {
                    const error = {
                        message: "Incorrect orderID"
                    }
            
                    return res.status(401).json({
                        statusCode: 401,
                        message: "order with id not found!",
                        error,
                    });
                }
    
                order = order[0];
                
                return res.status(201).json({
                    statusCode: 201,
    
                    serviceID: order.serviceID,
                    link: order.link,
                    quantity: order.quantity,
                    amount: order.amount,
                    // serviceProvider: "",
                    // serviceType: "",
                    
                    startCount: order.startCount,
                    remains: order.remains,
                    status: order.status,
                    createdDate: order.createdAt,
                    currency: "USD"
                });
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        }
        
        if (action == "order") {
            try {
                // checks if there is serviceID, link or quantity query parameter
                if (!req.query.serviceID || !req.query.link || !req.query.quantity) {
                    const error = {
                        message: "Incorrect request!"
                    };
    
                    return res.status(401).json({
                        statusCode: 401,
                        error,
                    });
                }
    
                const serviceID = req.query.serviceID;
                const link = req.query.link;
                const quantity = req.query.quantity;
    
                // get the service details
                let service =  await services.getServiceByID(serviceID);
                if (service && service.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...service,
                    });
                }

                // checks if the serviceID is valid
                if (service.length > 1) {
                    const error = {
                        message: "an error occured!"
                    };
    
                    return res.status(500).json({
                        statusCode: 500,
                        message: "duplicate service id found!",
                        error
                    });
                }
    
                // checks if the serviceID is valid
                if (service.length < 1 || !service || !service.length) {
                    const error = {
                        message: "Incorrect serviceID"
                    }
            
                    return res.status(401).json({
                        statusCode: 401,
                        error,
                    });
                }
                service = service[0];
    
                // calculate the cost for the amount of quantity he/she is purchasing
                let pricePer = service.resellRate/1000;
                const price = pricePer*quantity;
                
                let costPricePer = service.providerRate/1000;
                const costPrice = costPricePer*quantity;
                
                // checks user account balance
                if (service.resellRate > apiUser.balance || price > apiUser.balance) {
                    const error = {
                        message: "Insufficient Funds! Please fund your account and try again"
                    }
            
                    return res.status(401).json({
                        statusCode: 401,
                        error
                    });
                }
    
                // check minimum order
                if (service.minOrder > quantity) {
                    const error = {
                        message: `minimum order must be greater than ${service.minOrder}`
                    }
            
                    return res.status(401).json({
                        statusCode: 401,
                        error
                    });
                }
    
                // check maximum order
                if (quantity > service.maxOrder) {
                    const error = {
                        message: `maximum order is ${service.minOrder}`
                    }
            
                    return res.status(401).json({
                        statusCode: 401,
                        error
                    });
                }
    
                // get the provider details to use an place the order
                let apiProviderDetails = await general.getActiveApiProvider({tbName: "status" , tbValue: 1});
                if (apiProviderDetails && apiProviderDetails.status == false) {
                    return res.status(500).json({
                        status: 500,
                        ...apiProviderDetails,
                    });
                }

                if (apiProviderDetails.length) {
                    apiProviderDetails = apiProviderDetails[0];
                }
    
                // debit the user then save order in the database
                // debit the user
                let newUserBal = apiUser.balance - price;
                // let updatedUser;
                try {
                    // const updateUserDetails = {
                    //     colombName: ['balance'],
                    //     NewColombNameValue: [`${newUserBal}`],
            
                    //     conditionColombName: ['userID'],
                    //     conditionColombValue: [`${apiUser.userID}`]
                    // };

                    const result1 = await auth.updateUser(apiUser.userID, { balance: newUserBal });
                    if (result1 && result1.status == false) {
                        return res.status(500).json({
                            status: 500,
                            ...result1,
                        });
                    }
    
                } catch (err) {
                    const error = {
                        message: "an error occured!"
                    };
    
                    return res.status(500).json({
                        statusCode: 500,
                        error
                    });
                }

                // check api provider price
                try {
                    const apiProviderServices = await axios.post(`${apiProviderDetails.url}?key=${apiProviderDetails.apiKey}&action=services`);
            
                    let service = apiProviderServices.data.find(obj => obj.service == req.body.serviceID);

                    if(service) {
                        if (service.rate > servicexx.resellRate || service.rate > servicexx.providerRate) {
                            // update the record with the new pricing
            
                            let price = service.rate + (service.rate * 30/100);
                            const newPrice = Math.round((price + Number.EPSILON) * 100) / 100;
            
                            // const updateDetails = {
                            //     colombName: ["resellRate", "providerRate"],
                            //     NewColombNameValue: [newPrice, service.rate],
                        
                            //     conditionColombName: ["serviceID"],
                            //     conditionColombValue: [req.body.serviceID]
                            // };

                            const condition = {
                                serviceID: req.body.serviceID
                            };

                            const newData = {
                                resellRate: newPrice,
                                providerRate: service.rate,
                            }
                            
                            const result = await services.updateMultipleServices(condition, newData);
                            if (result && result.status == false) {
                                return res.status(500).json({
                                    status: 500,
                                    ...result,
                                });
                            }
            
                            return res.status(500).json({
                                status: 500,
                                message: "pricing error, please refresh and try again!",
                                error
                            });
                        }
                    }

                } catch (error) {
                    return res.status(500).json({
                        status: 500,
                        message: "an error occured!",
                        error
                    });
                }
    
                // save order in the database
                let placeOrderResult;
                try {
                    const ordersDetails = {
                        // orderID: uOrderID(),
                        orderID: Date.now(), // will settup a new orderID numeric this time
                        serviceID: serviceID,
                        type: "API",
                        APIproviderID: apiProviderDetails.APIproviderID,
                        userID: apiUser.userID,
                        link: link,
                        quantity: quantity,
                        amount: price,
                        costAmount: costPrice,
                        profit: Math.round((price-costPrice  + Number.EPSILON) * 100) / 100,
                        status: "Pending",
                        note: ``
                    };
                    placeOrderResult = await general.placeOrder(ordersDetails);
                    if (placeOrderResult && placeOrderResult.status == false) {
                        return res.status(500).json({
                            status: 500,
                            ...placeOrderResult,
                        });
                    }
                } catch (err) {
                    // let newUserBal = apiUser.balance - price;
                    const newData = {
                        balance: apiUser.balance
                    };

                    const result = await auth.updateUser(apiUser.userID, newData);
                    if (result && result.status == false) {
                        return res.status(500).json({
                            status: 500,
                            ...result,
                        });
                    }

                    const error = {
                        message: "an error occured!"
                    };
                    return res.status(500).json({
                        statusCode: 500,
                        error
                    });
                }
    
                // place order via the provider api
                let apiProviderResponse;
                // get details of the new order placed by the user
                let orderPlaced;
                // status of the order placed via API
                let apiOrderStatus;
                try {
                    // get details of the new order placed by the user
                    // orderPlaced =  await general.getorderPlaced(placeOrderResult.orderID);
                    // if (orderPlaced && orderPlaced.status == false) {
                    //     return res.status(500).json({
                    //         status: 500,
                    //         ...orderPlaced,
                    //     });
                    // }
                    // orderPlaced = orderPlaced[0][0];

                    orderPlaced = placeOrderResult;

                    // place order via the provider api
                    let apiText = `${apiProviderDetails.url}?key=${apiProviderDetails.apiKey}&action=add&service=${serviceID}&link=${link}&quantity=${quantity}`;
                    apiProviderResponse = await axios.post(apiText);
                    // console.log(apiProviderResponse.data);
        
                    // update the database with details of the order placed via the provider api
                    if (apiProviderResponse.data.error) {
                        let note = "unable to place order through the API at " + apiProviderDetails.name + `with this response::: ${apiProviderResponse.data}`;
                    
                        const result2 = await general.updateOrder(placeOrderResult.orderID, { note });
                        if (result2 && result2.status == false) {
                            return res.status(500).json({
                                status: 500,
                                ...result2,
                            });
                        }

                        return res.status(201).json({
                            statusCode: 201,
                            status: "Pending",
                            orderID: orderPlaced.orderID,
                            // message: 'order placed successfully!'
                        });
                    }
    
                    // update the DB with the response from the API order placed
                    if (apiProviderResponse.data.order) {
                        const newData = {
                            providerOrderID: apiProviderResponse.data.order
                        }

                        const result = await general.updateOrder(placeOrderResult.orderID, newData);
                        if (result && result.status == false) {
                            return res.status(500).json({
                                status: 500,
                                ...result,
                            });
                        }
                    }
    
                    let apiText22 = `${apiProviderDetails.url}?key=${apiProviderDetails.apiKey}&action=status&order=${apiProviderResponse.data.order}`;
                    apiOrderStatus = await axios.post(apiText22);
                
                    if (apiOrderStatus.data.status) {
                        const newData = {
                            apiCharge: apiOrderStatus.data.charge,
                            status: apiOrderStatus.data.status,
                            startCount: apiOrderStatus.data.start_count,
                            remains: apiOrderStatus.data.remains,
                        }

                        const result = await general.updateOrder(placeOrderResult.orderID, newData);
                        if (result && result.status == false) {
                            return res.status(500).json({
                                status: 500,
                                ...result,
                            });
                        }
                    }
                    
                } catch (err) {
                    let note = "unable to place order through the API at " + apiProviderDetails.name;

                    const result = await general.updateOrder(placeOrderResult.orderID, { note });
                    if (result && result.status == false) {
                        return res.status(500).json({
                            status: 500,
                            ...result,
                        });
                    }
    
                    return res.status(201).json({
                        statusCode: 201,
                        status: "Pending",
                        orderID: orderPlaced.orderID,
                        // message: 'order placed successfully!'
                    });
                }
    
                return res.status(201).json({
                    statusCode: 201,
                    status: apiOrderStatus.data.status || "Processing",
                    orderID: orderPlaced.orderID,
                    // message: 'order placed successfully!'
                });
    
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        }
        
        const error = {
            message: "Incorrect request! or an error occured!"
        };
    
        return res.status(401).json({
            statusCode: 401,
            error,
        });
        
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
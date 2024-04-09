import axios from "axios";

// models
import { general } from './../models/general.js';
import { user, auth } from './../models/users.js';
// import { admin } from './../models/admin.js';

// get the data dashboard needed data
export const checkUsersPendingOrders = async (req, res, next) => {
    try {
        let apiProvider = await general.getActiveApiProvider({tbName: "status" , tbValue: 1});

        if (apiProvider.length && apiProvider.status != false) {
            apiProvider = apiProvider[0];
        }
    
        const getOrderData = {
            userID: req.userID,
            status1: "Pending", 
            status2: "Processing"
        };
        let orders = await general.getUserOrderByStatus(getOrderData);
        
        if (orders.length && orders.status != false ) {
            orders = orders[0];
    
            for (const order of orders) {
                if (order.providerOrderID || order.providerOrderID != null) {
                    let apiText = `${apiProvider.url}?key=${apiProvider.apiKey}&action=status&order=${order.providerOrderID}`;
                    const orderIdRes = await axios.post(apiText);
    
                    if (orderIdRes.data.status == "Refunded") {
                        // get the user current data to check bal
                        const Cuser = await user.getCurrentUser({userID: getOrderData.userID});
    
                        // const RefundBal = {
                        //     colombName: ["balance"],
                        //     NewColombNameValue: [Cuser.balance + order.amount],
                    
                        //     conditionColombName: ["id"],
                        //     conditionColombValue: [Cuser.id]
                        // };
                        
                        await auth.updateUser(Cuser.userID, { balance: Cuser.balance + order.amount });
                    }
    
                    // const updateData = {
                    //     colombName: ["apiCharge", "status", "startCount", "remains"],
                    //     NewColombNameValue: [`${orderIdRes.data.charge}`, `${orderIdRes.data.status}`, `${orderIdRes.data.start_count}`, `${orderIdRes.data.remains}`],
            
                    //     conditionColombName: ["id"],
                    //     conditionColombValue: [`${order.id}`]
                    // };

                    const data2update = {
                        apiCharge: orderIdRes.data.charge,
                        status: orderIdRes.data.status,
                        startCount: orderIdRes.data.start_count,
                        remains: orderIdRes.data.remains,
                    };
                    await general.updateOrder(order.orderID, data2update);
                } else {
                    let apiText = `${apiProvider.url}?key=${apiProvider.apiKey}&action=add&service=${order.serviceID}&link=${order.link}&quantity=${order.quantity}`;
                    const response = await axios.post(apiText);
            
                    if (response.data.order) {
                        await general.updateOrder(order.orderID, { providerOrderID: response.data.order });
                    }
                }
            }
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
import { userModel } from "./../util/users.model.js";
import { paymentTransactionModel } from "./../util/paymentTransactions.model.js";
import { ticketMessagesModel } from "./../util/ticketMessages.model.js";
import { orderModel } from "./../util/orders.model.js"
import { ticketModel } from "./../util/tickets.model.js"
import { serviceModel } from "./../util/services.model.js"
import { apiProviderModel } from "../util/apiProvider.model.js";
import { paymentMethodModel } from "../util/paymentMethod.model.js";


export class general {
    static dbConnect() {
        return "";
    };

    constructor() { }
    
    // get Active Api Provider
    static async getActiveApiProvider(data) {
        try {
            const result = await apiProviderModel.find({ status: 1 });

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get api provider.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get api provider.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT * FROM API_Provider WHERE ${data.tbName} = ?`,
        //     [data.tbValue]
        // );
    };

    // get All Api Provider
    static async getAllApiProvider() {
        try {
            const result = await apiProviderModel.find({});

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get api provider.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get api provider.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM API_Provider WHERE 1'
        // );
    };

    // delete Api Provider
    static async deleteApiProvider(data) {
        try {
            const result = await apiProviderModel.deleteOne({ [data.key]: data.keyValue });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to delete api provider.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to delete api provider.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `DELETE FROM API_Provider WHERE (${data.key}) = ${data.keyValue}`,
        //     [ data.value ]
        // );
    };

    // update Api Provider
    static async updateApiProvider(data) {
        try {
            const result = await apiProviderModel.updateOne({ [data.key]: data.keyValue }, { $set: { [data.name]: data.value } });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to update api provider.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to update api provider.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `UPDATE API_Provider SET (${data.name}) VALUES (?) WHERE (${data.key}) VALUES (?)`,
        //     [ data.value, data.keyValue ]
        // );
    };

    // Add New Provider API to the Database
    static async addNewApiProvider(data) {
        try {
            const newApiProvider = new apiProviderModel({
                APIproviderID: data.APIproviderID,
                userID: data.userID,
                name: data.name,
                url: data.url,
                key: data.key,
                balance: data.balance,
                currency: data.currency,
                description: data.description,
                status: data.status                
            });
    
            const result = await newApiProvider.save();
            if (result) {
                return result;
            } else {
                return {
                    message: "Error new api provider.",
                    status: false
                }
            }
        } catch (error) {
            return {
                message: "Error new api provider.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'INSERT INTO API_Provider (APIproviderID, userID, name, url, key, balance, currency, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        //     [ 
        //         data.APIproviderID, 
        //         data.userID, 
        //         data.name, 
        //         data.url, 
        //         data.key, 
        //         data.balance, 
        //         data.currency, 
        //         data.description, 
        //         data.status, 
        //         // data.updatedAt, 
        //         // data.updatedAt 
        //     ]
        // );
    };

    // add new order to the DB
    static async placeOrder(order) {
        try {
            const newOrder = new orderModel({
                orderID: order.orderID,
                serviceID: order.serviceID,
                type: order.type,
                APIproviderID: order.APIproviderID,
                userID: order.userID,
                link: order.link,
                quantity: order.quantity,
                amount: order.amount,
                costAmount: order.costAmount,
                apiCharge: order.apiCharge,
                profit: order.profit,
                note: order.note,
                status: order.status
            });
    
            const result = await newOrder.save();
            if (result) {
                return result;
            } else {
                return {
                    message: "Error new order.",
                    status: false
                }
            }
        } catch (error) {
            return {
                message: "Error new order.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'INSERT INTO orders (orderID, serviceID, type, APIproviderID, userID, link, quantity, amount, costAmount, apiCharge, profit, note, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        //     [ order.orderID, order.serviceID, order.type, order.APIproviderID, order.userID, order.link, order.quantity, order.amount, order.costAmount, null, order.profit, order.note, order.status ]
        // );
    };

    // update order records to the DB
    static async updateOrder(orderId, newOrderData) {
        try {
            const updatedOrder = await orderModel.findOneAndUpdate(
                { orderID: orderId },
                newOrderData,
                {
                    runValidators: true,
                    returnOriginal: false,
                }
            );
    
            if (updatedOrder) {
                return updatedOrder;
            } else {
                return {
                    message: "unable to update user data",
                    status: false
                }
            }
        } catch (error) {
            return {
                message: "unable to update user data",
                status: false,
                error
            }
        }


        // let sqlText = this.multipleUpdate(data, "orders", condition);
        // return db.execute(
        //     sqlText,
        //     data.NewColombNameValue
        // )
    };

    // create New Ticket
    static async createNewTicket(ticket) {
        try {
            const newTicket = new ticketModel({
                ticketID: ticket.ticketID,
                userID: ticket.userID,
                subject: ticket.subject,
                message: ticket.message,
                attachedFile: ticket.attachedFile
            });
    
            const result = await newTicket.save();
            if (result) {
                return result;
            } else {
                return {
                    message: "Error creating new ticket.",
                    status: false
                }
            }
        } catch (error) {
            return {
                message: "Error creating new ticket.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'INSERT INTO tickets (ticketID, userID, subject, message, attachedFile) VALUES (?, ?, ?, ?, ?)',
        //     [ ticket.ticketID, ticket.userID, ticket.subject, ticket.message, ticket.attachedFile]
        // );
    };

    // create ticket messages
    static async ticket_messages(ticketMsg) {
        try {
            const newTicketMsg = new ticketMessagesModel({
                userID: ticketMsg.userID,
                ticketID: ticketMsg.ticketID,
                message: ticketMsg.message,
                attachedFile: ticketMsg.attachedFile
            });
    
            const result = await newTicketMsg.save();
            if (result) {
                return result;
            } else {
                return {
                    message: "Error creating a new message.",
                    status: false
                }
            }
        } catch (error) {
            return {
                message: "Error creating a new message.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'INSERT INTO ticket_messages (userID, ticketID, message, attachedFile) VALUES (?, ?, ?, ?)',
        //     [ ticketMsg.userID, ticketMsg.ticketID, ticketMsg.message, ticketMsg.attachedFile ]
        // );
    };

    // update Ticket records on the DB
    static updateTicket(data, condition="AND") {
        const db = this.dbConnect();

        let sqlText = this.multipleUpdate(data, "tickets", condition);

        return db.execute(
            sqlText,
            data.NewColombNameValue
        );
    };

    // update ticket messages records on the DB
    static updateTicketMessages(data, condition="AND") {
        const db = this.dbConnect();

        let sqlText = this.multipleUpdate(data, "ticket_messages", condition);

        return db.execute(
            sqlText,
            data.NewColombNameValue
        );
    };

    // get Payment Method
    static async getPaymentMethods() {
        try {
            const result = await paymentMethodModel.find({});

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get payment method.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get payment method.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM payment_method WHERE 1',
        // );
    };


    // API section

    // get order by orderID
    static async getOrder(orderID) {
        try {
            const result = await orderModel.find({ orderID: orderID });

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get order.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get order.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM orders WHERE orderID = ?',
        //     [`${orderID}`]
        // );
    };

    // get order by id
    static async getOrderBy_id(id) {
        try {
            const result = await orderModel.findById(id);

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get order.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get order.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM orders WHERE id = ?',
        //     [`${id}`]
        // );
    };

    // get user orders
    static async getUserOrderBy(userID) {
        try {
            const result = await orderModel.find({ userID: userID });

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get order.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get order.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM orders WHERE userID = ?',
        //     [`${userID}`]
        // );
    };

    // get user orders by status (pending/processing )
    static async getUserOrderByStatus(data) {
        try {
            const query = {
                userID: data.userID,
                $or: [
                    { status: data.status1 },
                    { status: data.status2 }
                ]
            };
    
            const result = await orderModel.find(query);
            
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get api provider.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get api provider.",
                status: false,
                error
            }
        }


        // return db.execute(
        //     `SELECT * FROM orders WHERE userID = ? AND (status = ? OR status = ?)`,
        //     [`${data.userID}`, `${data.status1}`, `${data.status2}`]
        // );
    };

    // get all orders by status (pending/processing)
    static async getAllOrderByStatus(status) {
        try {
            const result = await orderModel.find({ status: status });

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get order.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get order.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM orders WHERE status = ?',
        //     [`${status}`]
        // );
    };

    static multipleUpdate(data, tableName, condition) {
        const db = this.dbConnect();

        let sqlText = `UPDATE ${tableName} SET `

        for (let i = 0; i < data.colombName.length; i++) {
            const element = data.colombName[i];

            if (i === 0) {
                sqlText += `${element} = ?`;
            } else {
                sqlText += `, ${element} = ?`;
            }
        }

        for (let i = 0; i < data.conditionColombName.length; i++) {
            const conditionName = data.conditionColombName[i];
            const elconditionValue = data.conditionColombValue[i];

            if (i === 0) {
                sqlText += ` WHERE ${tableName}.${conditionName} = '${elconditionValue}'`;
            } else {
                sqlText += ` ${condition} ${tableName}.${conditionName} =' ${elconditionValue}'`;
            }
        }

        return sqlText;
    }
}
	
import { userModel } from "./../util/users.model.js";
import { paymentTransactionModel } from "./../util/paymentTransactions.model.js";
import { ticketMessagesModel } from "./../util/ticketMessages.model.js";
import { orderModel } from "./../util/orders.model.js";
import { ticketModel } from "./../util/tickets.model.js";
import { apiProviderModel } from "./../util/apiProvider.model.js";
import { paymentMethodModel } from "./../util/paymentMethod.model.js";


export class admin {
    static dbConnect() {
        return "";
    };
    
    constructor() { }

    static async getApiBalance() {
        try {
            const result = await apiProviderModel.find({ status: 1 }, 'balance');
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get services.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT API_Provider.balance AS apiBalance FROM API_Provider WHERE  API_Provider.status = 1;`,
        // )
    };

    static async getTotalOrders() {
        try {
            const result = await orderModel.countDocuments();
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to count total orders.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to count total orders.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT COUNT(orders.id) AS totalOrders FROM orders;`,
        // )
    };

    static getTotalProfit() {
        const db = this.dbConnect();

        return db.execute(
            // `SELECT SUM(orders.profit) AS totalProfit FROM orders WHERE status != 'Refunded';`,
            `SELECT SUM(orders.amount - orders.apiCharge) AS totalProfit FROM orders WHERE status != 'Refunded';`,
        )
    };

    static getMonthlyProfit() {
        const db = this.dbConnect();

        return db.execute(
            `SELECT SUM(orders.amount - orders.apiCharge) AS monthlyProfit 
             FROM orders 
             WHERE status != 'Refunded'
             AND createdAt = ${new Date().getMonth()}
             ;
            `,
        )
    };
    
    static getTotalPayments() {
        const db = this.dbConnect();

        return db.execute(
            `SELECT COUNT(payment_transactions.id) AS totalPayments FROM payment_transactions;`,
        )
    };

    static getTotalUsers() {
        const db = this.dbConnect();

        return db.execute(
            `SELECT COUNT(users.id) AS totalUsers FROM users WHERE 1;`,
        )
    };

    static getTotalUserUsers() {
        const db = this.dbConnect();

        return db.execute(
            `SELECT COUNT(users.id) AS totalUsers FROM users WHERE role != 'admin';`,
        )
    };

    static getTotalTickets() {
        const db = this.dbConnect();

        return db.execute(
            `SELECT COUNT(tickets.id) AS totalTickets FROM tickets WHERE tickets.status = 1;`,
        )
    };

    static async getDashboardOrders() {
        try {
            const result = await orderModel
                            .find({})
                            .limit(10);

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get ticket.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get ticket.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT * FROM orders LIMIT 10;`,
        // )
    };

    static async getAllActiveTicket() {
        try {
            const result = await ticketModel.find({ status: 1 });

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get ticket.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get ticket.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT * FROM tickets WHERE tickets.status = 1;`,
        // )
    };

    static async getTicket(ticket) {
        try {
            const result = await ticketModel.find({ ticketID: ticket.ticketID });

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get ticket.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get ticket.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM tickets WHERE ticketID = ?',
        //     [ticket.ticketID]
        // );
    };

    static async getTicketMessage(data) {
        try {
            const result = await ticketMessagesModel.find({ ticketID: data.ticketID });

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get ticket Messages.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get ticket Messages.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM ticket_messages WHERE ticketID = ?',
        //     [data.ticketID]
        // );
    };

    static async closeTicket(ticketID) {
        try {
            const result = await ticketModel.updateOne({ ticketID: ticketID }, { $set: { status:0 } });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to update tickets.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to update tickets.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `UPDATE tickets SET status = 0 WHERE tickets.ticketID = ${ticketID};`
        // );
    };

    static async getUserByID(userID) {
        try {
            const result = await userModel.find({ userID: userID });

            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get user.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get user.",
                status: false,
                error
            }
        }


        // return db.execute(
        //     'SELECT * FROM users WHERE userID = ?;',
        //     [`${userID}`]
        // );
    };

    static async deduct_upgradeUserBalance(user) {
        try {
            const result = await userModel.updateOne({ userID: user.userID }, { $set: { balance: user.balance } });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to update user balance.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to update user balance.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'UPDATE users SET balance = ? WHERE users.userID = ?;',
        //     // `UPDATE users SET balance = ${user.balance} WHERE users.userID = ${user.userID};`,
        //     [user.balance, user.userID]
        // );
    };

    static async getAllUsers() {
        try {
            const result = await userModel.find({});
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get all users.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get all users.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM users WHERE 1;',
        // );
    };

    static async getAllUserUsers() {
        try {
            const result = await userModel.find({role: "admin" });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get all users.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get all users.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT * FROM users WHERE role != 'admin';`,
        // );
    };

    static async getAllOrders() {
        try {
            const result = await orderModel.find({});
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get all orders.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get all orders.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM orders WHERE 1;',
        //     // [user.userID]
        // );
    };

    static async getAllPayments() {
        try {
            const result = await paymentTransactionModel.find({});
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get payment transactions.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get payment transactions.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM payment_transactions WHERE 1;',
        //     // [user.userID]
        // );
    };

    static async getAllProviders() {
        try {
            const result = await apiProviderModel.find({});
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get api providers.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get api providers.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM API_Provider;',
        //     // [user.userID]
        // );
    };

    static async changeProviderStatus(data) {
        try {
            const result = await apiProviderModel.updateOne({ id: data.id }, { $set: { status: data.status } });
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
        //     `UPDATE API_Provider SET status = '${data.status}' WHERE API_Provider.id = '${data.id}';`
        //     // [data.status]
        // );
    };

    static async deleteApiProvider(data) {
        try {
            const result = await apiProviderModel.deleteOne({ _id: data });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get services.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `DELETE FROM API_Provider WHERE API_Provider.id = '${data}';`
        // );
    };

    static async getQueriedProvider(data) {
        try {
            const result = await apiProviderModel.find({APIproviderID: data });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get all users.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get all users.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM API_Provider WHERE APIproviderID = ?;',
        //     [data]
        // );
    };

    // Add New Provider API to the Database
    static addNewApiProvider(data) {



        const db = this.dbConnect();

        return db.execute(
            'INSERT INTO API_Provider (APIproviderID, userID, name, url, apiKey, balance, currency, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [ 
                data.APIproviderID, 
                data.userID, 
                data.name, 
                data.url, 
                data.apiKey, 
                data.balance, 
                data.currency, 
                data.description, 
                data.status
            ]
        )
    };

    // Update Multiple API Provider colomb
    static async updateApiProvider(condition, data) {
        try {
            const result = await apiProviderModel.updateMany(condition, data);
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to update services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to update services.",
                status: false,
                error
            }
        }
    };

    static async updateUserRole(user) {
        try {
            const result = await userModel.updateOne({ userID: user.userID }, { $set: { role: user.role } });
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to update services.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to update services.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'UPDATE users SET role = ? WHERE users.userID = ?;',
        //     [user.role, user.userID]
        // );
    };

    static async getAllPaymentMethods() {
        try {
            const result = await paymentMethodModel.find({});
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get all users.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get all users.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM payment_method;',
        //     // [user.userID]
        // );
    };

    static async getQueriedPaymentMethod(data) {
        try {
            const result = await paymentMethodModel.find({paymentMethodID: data});
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to get all users.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to get all users.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM payment_method WHERE paymentMethodID = ?;',
        //     [data]
        // );
    };


    // Add New Payment Method to the Database
    static async addNewPaymentMethod(data) {
        try {
            const paymentTransaction = new paymentMethodModel({
                paymentMethodID: data.paymentMethodID, 
                name: data.name, 
                currency: data.currency, 
                minAmount: data.minAmount, 
                maxAmount: data.maxAmount, 
                exchangeRate: data.exchangeRate, 
                data: data.data, 
                status: data.status
            });
    
            const result = await paymentTransaction.save();
            if (result) {
                return result;
            } else {
                return {
                    message: "Error creating new transaction.",
                    status: false
                }
            }
        } catch (error) {
            return {
                message: "Error adding funds to account.",
                status: false,
                error
            }
        }


        return db.execute(
            'INSERT INTO payment_method (paymentMethodID, name, currency, minAmount, maxAmount, exchangeRate, data, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
            [ 
                data.paymentMethodID, 
                data.name, 
                data.currency, 
                data.minAmount, 
                data.maxAmount, 
                data.exchangeRate, 
                data.data, 
                data.status
            ]
        )
    };

    // update Payment Method
    static updatePaymentMethod(data, condition) {
        const db = this.dbConnect();

        let sqlText = this.multipleUpdate(data, "payment_method" || data.tableName, condition);

        return db.execute(
            sqlText,
            data.NewColombNameValue
        )
    };

    static deletePaymentMethod(data) {
        const db = this.dbConnect();

        return db.execute(
            `DELETE FROM payment_method WHERE payment_method.id = '${data}';`
        );
    };

    static getReportYears(createdAt = 'createdAt', tbName = 'users') {
        const db = this.dbConnect();

        return db.execute(
            `SELECT DISTINCT YEAR(${createdAt}) AS years FROM ${tbName};`,
            // [data]
        );
    };

    // get Users Report data
    static getUsersReport(data, colombName='createdAt') {
        const db = this.dbConnect();

        // updatedAt, createdAt, 
        let sqlText = `
            SELECT 
                DATE_FORMAT(updatedAt, '%m/%d/%y') AS updatedAt,
                DATE_FORMAT(createdAt, '%m/%d/%y') AS createdAt,
                SUM(balance) AS totalBalance, 
                COUNT(${colombName}) AS numCount
            FROM users
        `;
        
        switch (data.date) {
            case 'year':
                sqlText += ` GROUP BY EXTRACT(YEAR FROM ${colombName});`;
                break;
        
            case 'month':
                sqlText += ` 
                    WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year} 
                    GROUP BY EXTRACT(MONTH FROM ${colombName});
                `;
                break;
        
            case 'day':
                sqlText += ` 
                    WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year}
                    AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
                    GROUP BY EXTRACT(DAY FROM ${colombName});
                `;
                break;
        
            default:
                // AND EXTRACT(MONTH FROM ${data.colombName}) = ${data.month}
                sqlText += ` 
                    WHERE ${colombName} > (curdate() - interval 30 day)
                    AND EXTRACT(YEAR FROM ${colombName}) = ${data.year}
                    GROUP BY EXTRACT(DAY FROM ${colombName});
                `;
                break;
        }

        return db.execute(
            sqlText,
        );
    }

    // get Payments Report data
    static getPaymentsReport(data, colombName='createdAt') {
        const db = this.dbConnect();

        // updatedAt, createdAt, 
        let sqlText = `
            SELECT 
                DATE_FORMAT(updatedAt, '%m/%d/%y') AS updatedAt,
                DATE_FORMAT(createdAt, '%m/%d/%y') AS createdAt,
                COUNT(${colombName}) AS numCount, 
                SUM(amount) as totalAmount
            FROM payment_transactions
        `;

        switch (data.date) {
            case 'year':
                sqlText += ` GROUP BY EXTRACT(YEAR FROM ${colombName});`;
                break;
        
            case 'month':
                sqlText += ` 
                    WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year} 
                    GROUP BY EXTRACT(MONTH FROM ${colombName});
                `;
                break;
        
            case 'day':
                sqlText += ` 
                    WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year}
                    AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
                    GROUP BY EXTRACT(DAY FROM ${colombName});
                `;
                break;
        
            default:
                // AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
                sqlText += ` 
                    WHERE ${colombName} > (curdate() - interval 30 day)
                    AND EXTRACT(YEAR FROM ${colombName}) = ${data.year}
                    GROUP BY EXTRACT(DAY FROM ${colombName});
                `;
                break;
        }

        return db.execute(
            sqlText,
        );
    }

    // get Orders Report data
    static getOrdersReport(data, colombName='createdAt') {
        const db = this.dbConnect();

        // updateAt, createdAt, 
        let sqlText = `
            SELECT 
                SUM(quantity) AS totalProccessed, 
                SUM(amount) AS totalAmount, 
                SUM(costAmount) AS totalCost, 
                SUM(apiCharge) AS totalSpent, 
                SUM(profit) AS sumProfit, 
                DATE_FORMAT(updateAt, '%m/%d/%y') AS updatedAt,
                DATE_FORMAT(createdAt, '%m/%d/%y') AS createdAt,
                COUNT(${colombName}) AS numCount, 
                SUM(apiCharge - amount) AS totalProfit
            FROM orders
        `;
        
        switch (data.date) {
            case 'year':
                sqlText += ` GROUP BY EXTRACT(YEAR FROM ${colombName});`;
                break;
        
            case 'month':
                sqlText += ` 
                    WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year} 
                    GROUP BY EXTRACT(MONTH FROM ${colombName});
                `;
                break;
        
            case 'day':
                sqlText += ` 
                    WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year}
                    AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
                    GROUP BY EXTRACT(DAY FROM ${colombName});
                `;
                break;
        
            default:
                // AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
                sqlText += ` 
                    WHERE ${colombName} > (curdate() - interval 30 day)
                    AND EXTRACT(YEAR FROM ${colombName}) = ${data.year}
                    GROUP BY EXTRACT(DAY FROM ${colombName});
                `;

                break;
        }

        return db.execute(
            sqlText,
        );
    }

    // static deleteApiProvider(data) {
    //     return db.execute(
    //         `DELETE FROM API_Provider WHERE (${data.key}) = ${data.keyValue}`,
    //         [ data.value ]
    //     )
    // };

    static multipleUpdate(data, tableName, condition="AND") {
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
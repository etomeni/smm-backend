import { userModel } from "./../util/users.model.js";
import { paymentTransactionModel } from "./../util/paymentTransactions.model.js";
import { ticketMessagesModel } from "./../util/ticketMessages.model.js";
import { orderModel } from "./../util/orders.model.js";
import { ticketModel } from "./../util/tickets.model.js";
import { apiProviderModel } from "./../util/apiProvider.model.js";
import { paymentMethodModel } from "./../util/paymentMethod.model.js";


export class admin {
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
            const result = await orderModel.countDocuments({}).exec();
            // const result = await orderModel.find({}).count();
            return result;
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

    static async getTotalProfit() {
        try {
            const pipeline = [
                {
                    $match: {
                        status: { $ne: 'Refunded' } // Filter orders with status not equal to 'Refunded'
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalProfit: {
                            $sum: { $subtract: ['$amount', '$apiCharge'] } // Calculate total profit
                        }
                    }
                }
            ];

            const result = await orderModel.aggregate(pipeline).exec();
            if (result) {
                const totalProfit = result[0]?.totalProfit || 0;
                return totalProfit;
            } else {
                return {
                    message: "Error calculating total profit.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Error calculating total profit.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     // `SELECT SUM(orders.profit) AS totalProfit FROM orders WHERE status != 'Refunded';`,
        //     `SELECT SUM(orders.amount - orders.apiCharge) AS totalProfit FROM orders WHERE status != 'Refunded';`,
        // )
    };

    static async getMonthlyProfit() {
        try {
            // Get the current month (0-indexed, where January is 0)
            const currentMonth = new Date().getMonth();

            // Create a Mongoose aggregation pipeline
            const pipeline = [
                {
                    $match: {
                        status: { $ne: 'Refunded' },
                        // createdAt: { $expr: { $eq: [{ $month: '$createdAt' }, currentMonth] } },
                        $expr: { $eq: [{ $month: '$createdAt' }, currentMonth] }, // Filter by current month

                    }
                },
                {
                    $group: {
                        _id: null,
                        monthlyProfit: {
                            $sum: { $subtract: ['$amount', '$apiCharge'] }
                        }
                    }
                }
            ];

            const result = await orderModel.aggregate(pipeline).exec();

            if (result) {
                const monthlyProfit = result[0]?.monthlyProfit || 0;
                return monthlyProfit;
            } else {
                return {
                    message: "Error calculating monthly profit.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Error calculating monthly profit.",
                status: false,
                error
            }
        }


        // return db.execute(
        //     `SELECT SUM(orders.amount - orders.apiCharge) AS monthlyProfit 
        //      FROM orders 
        //      WHERE status != 'Refunded'
        //      AND createdAt = ${new Date().getMonth()}
        //      ;
        //     `,
        // )
    };
    
    static async getTotalPayments() {
        try {
            const result = await paymentTransactionModel.countDocuments({}).exec();
            return result;
        } catch (error) {
            return {
                message: "Unable to count total payment transaction.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT COUNT(payment_transactions.id) AS totalPayments FROM payment_transactions;`,
        // )
    };

    static async getTotalUsers() {
        try {
            const result = await userModel.countDocuments({});
            return result;

        } catch (error) {
            return {
                message: "Unable to count total orders.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT COUNT(users.id) AS totalUsers FROM users WHERE 1;`,
        // )
    };

    static async getTotalUserUsers() {
        try {
            const result = await userModel.countDocuments({ role: { $ne: 'admin' } });
            return result;
        } catch (error) {
            return {
                message: "Unable to count total users.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT COUNT(users.id) AS totalUsers FROM users WHERE role != 'admin';`,
        // )
    };

    static async getTotalTickets() {
        try {
            const result = await ticketModel.countDocuments({ status: 1 }).exec();
            return result;
        } catch (error) {
            return {
                message: "Unable to count total tickets.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT COUNT(tickets.id) AS totalTickets FROM tickets WHERE tickets.status = 1;`,
        // );
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
        //     'INSERT INTO API_Provider (APIproviderID, userID, name, url, apiKey, balance, currency, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
        //     [ 
        //         data.APIproviderID, 
        //         data.userID, 
        //         data.name, 
        //         data.url, 
        //         data.apiKey, 
        //         data.balance, 
        //         data.currency, 
        //         data.description, 
        //         data.status
        //     ]
        // )
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


        // return db.execute(
        //     'INSERT INTO payment_method (paymentMethodID, name, currency, minAmount, maxAmount, exchangeRate, data, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        //     [ 
        //         data.paymentMethodID, 
        //         data.name, 
        //         data.currency, 
        //         data.minAmount, 
        //         data.maxAmount, 
        //         data.exchangeRate, 
        //         data.data, 
        //         data.status
        //     ]
        // )
    };

    // update Payment Method
    static async updatePaymentMethod(data, condition) {
        try {
            const result = await paymentMethodModel.updateMany(condition, data);
            if (result) {
                return result;
            } else {
                return {
                    message: "Unable to update payment method.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Unable to update payment method.",
                status: false,
                error
            }
        }
    };

    static async deletePaymentMethod(paymentMethodId) {
        try {
            // Create a Mongoose query to delete the document with the specified id
            const result = await paymentMethodModel.deleteOne({ paymentMethodID: paymentMethodId });
            if (result) {
                return result;
            } else {
                return {
                    message: "Error deleting payment method.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Error deleting payment method.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `DELETE FROM payment_method WHERE payment_method.id = '${data}';`
        // );
    };

    static async getReportYears(createdAt = 'createdAt', tbName = 'users') {
        try {
            const pipeline = [
                {
                    $project: {
                        year: { $year: '$createdAt' } // Extract the year from createdAt
                    }
                },
                {
                    $group: {
                        _id: null,
                        years: { $addToSet: '$year' } // Collect distinct years
                    }
                }
            ];

            const result = await paymentMethodModel.aggregate(pipeline);

            if (result) {
                console.log(result);
                const distinctYears = result[0]?.years || [];

                return distinctYears;
            } else {
                return {
                    message: "Error fetching distinct years.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Error fetching distinct years.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     `SELECT DISTINCT YEAR(${createdAt}) AS years FROM ${tbName};`,
        // );
    };

    // get Users Report data
    static async getUsersReport(data, colombName='createdAt') {
        try {
            // Assuming you have a Mongoose model called "User" for the "users" collection

            // Define the aggregation pipeline stages
            const pipeline = [
                {
                    $project: {
                        updatedAt: { $dateToString: { format: "%m/%d/%y", date: "$updatedAt" } },
                        createdAt: { $dateToString: { format: "%m/%d/%y", date: "$createdAt" } },
                        balance: 1,
                        [colombName]: 1,
                    },
                },
                {
                    $group: {
                        _id: {
                            year: { $year: `$${colombName}` },
                            month: { $month: `$${colombName}` },
                            day: { $dayOfMonth: `$${colombName}` },
                        },
                        totalBalance: { $sum: "$balance" },
                        numCount: { $sum: 1 },
                    },
                },
            ];

            // Add additional stages based on the "data.date" value
            switch (data.date) {
                case "year":
                    pipeline.push({ $group: { _id: "$_id.year", totalBalance: { $first: "$totalBalance" }, numCount: { $first: "$numCount" } } });
                    break;
                case "month":
                    pipeline.push({ $match: { "_id.year": data.year } });
                    break;
                case "day":
                    pipeline.push({ $match: { "_id.year": data.year, "_id.month": data.month } });
                    break;
                default:
                    pipeline.push({
                        $match: {
                            [colombName]: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
                            "_id.year": data.year,
                        },
                    });
                    break;
            }

            // Execute the aggregation pipeline
            const result = await userModel.aggregate(pipeline);
            if (result) {
                return result;
            } else {
                return {
                    message: "Error executing aggregation.",
                    status: false,
                }
            }

        } catch (error) {
            return {
                message: "Error executing aggregation.",
                status: false,
                error
            } 
        }

        // // updatedAt, createdAt, 
        // let sqlText = `
        //     SELECT 
        //         DATE_FORMAT(updatedAt, '%m/%d/%y') AS updatedAt,
        //         DATE_FORMAT(createdAt, '%m/%d/%y') AS createdAt,
        //         SUM(balance) AS totalBalance, 
        //         COUNT(${colombName}) AS numCount
        //     FROM users
        // `;
        
        // switch (data.date) {
        //     case 'year':
        //         sqlText += ` GROUP BY EXTRACT(YEAR FROM ${colombName});`;
        //         break;
        
        //     case 'month':
        //         sqlText += ` 
        //             WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year} 
        //             GROUP BY EXTRACT(MONTH FROM ${colombName});
        //         `;
        //         break;
        
        //     case 'day':
        //         sqlText += ` 
        //             WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year}
        //             AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
        //             GROUP BY EXTRACT(DAY FROM ${colombName});
        //         `;
        //         break;
        
        //     default:
        //         // AND EXTRACT(MONTH FROM ${data.colombName}) = ${data.month}
        //         sqlText += ` 
        //             WHERE ${colombName} > (curdate() - interval 30 day)
        //             AND EXTRACT(YEAR FROM ${colombName}) = ${data.year}
        //             GROUP BY EXTRACT(DAY FROM ${colombName});
        //         `;
        //         break;
        // }

        // return db.execute(
        //     sqlText,
        // );

    }

    // get Payments Report data
    static async getPaymentsReport(data, colombName='createdAt') {
        try {
            // Assuming you have a Mongoose model for the "payment_transactions" collection in MongoDB

            // Get the relevant parameters from the data object
            const { date, year, month } = data;
            const colombName = 'yourColumnName'; // Replace with the actual column name

            // Create a Mongoose aggregation pipeline
            const pipeline = [];

            // Match stage based on date criteria
            if (date === 'year') {
                pipeline.push({
                    $match: {
                        [colombName]: { $exists: true },
                        createdAt: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year + 1}-01-01`) }
                    }
                });
            } else if (date === 'month') {
                pipeline.push({
                    $match: {
                        [colombName]: { $exists: true },
                        createdAt: { $gte: new Date(`${year}-${month}-01`), $lt: new Date(`${year}-${month + 1}-01`) }
                    }
                });
            } else if (date === 'day') {
                pipeline.push({
                    $match: {
                        [colombName]: { $exists: true },
                        createdAt: { $gte: new Date(`${year}-${month}-${data.day}T00:00:00Z`), $lt: new Date(`${year}-${month}-${data.day + 1}T00:00:00Z`) }
                    }
                });
            } else {
                // Default case (last 30 days)
                pipeline.push({
                    $match: {
                        [colombName]: { $exists: true },
                        createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }
                    }
                });
            }

            // Group stage to calculate aggregated metrics
            pipeline.push({
                $group: {
                    _id: null,
                    updatedAt: { $first: { $dateToString: { format: '%m/%d/%y', date: '$updatedAt' } } },
                    createdAt: { $first: { $dateToString: { format: '%m/%d/%y', date: '$createdAt' } } },
                    numCount: { $sum: 1 },
                    totalAmount: { $sum: '$amount' }
                }
            });

            // Execute the aggregation pipeline
            const result = await paymentTransactionModel.aggregate(pipeline);
            if (result) {
                return result
            } else {
                return {
                    message: "Error executing aggregation.",
                    status: false,
                }
            }
            
        } catch (error) {
            return {
                message: "Error executing aggregation.",
                status: false,
                error
            }
        }

        
        // // updatedAt, createdAt, 
        // let sqlText = `
        //     SELECT 
        //         DATE_FORMAT(updatedAt, '%m/%d/%y') AS updatedAt,
        //         DATE_FORMAT(createdAt, '%m/%d/%y') AS createdAt,
        //         COUNT(${colombName}) AS numCount, 
        //         SUM(amount) as totalAmount
        //     FROM payment_transactions
        // `;

        // switch (data.date) {
        //     case 'year':
        //         sqlText += ` GROUP BY EXTRACT(YEAR FROM ${colombName});`;
        //         break;
        
        //     case 'month':
        //         sqlText += ` 
        //             WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year} 
        //             GROUP BY EXTRACT(MONTH FROM ${colombName});
        //         `;
        //         break;
        
        //     case 'day':
        //         sqlText += ` 
        //             WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year}
        //             AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
        //             GROUP BY EXTRACT(DAY FROM ${colombName});
        //         `;
        //         break;
        
        //     default:
        //         // AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
        //         sqlText += ` 
        //             WHERE ${colombName} > (curdate() - interval 30 day)
        //             AND EXTRACT(YEAR FROM ${colombName}) = ${data.year}
        //             GROUP BY EXTRACT(DAY FROM ${colombName});
        //         `;
        //         break;
        // }

        // return db.execute(
        //     sqlText,
        // );
        
    }

    // get Orders Report data
    static async getOrdersReport(data, colombName='createdAt') {
        try {
            // Assuming you have a Mongoose model for the "orders" collection in MongoDB

            // Get the relevant parameters from the data object
            const { date, year, month } = data;
            const colombName = 'yourColumnName'; // Replace with the actual column name

            // Create a Mongoose aggregation pipeline
            const pipeline = [];

            // Match stage based on date criteria
            if (date === 'year') {
                pipeline.push({
                    $match: {
                        [colombName]: { $exists: true }, // Adjust this condition as needed
                        createdAt: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year + 1}-01-01`) }
                    }
                });
            } else if (date === 'month') {
                pipeline.push({
                    $match: {
                        [colombName]: { $exists: true }, // Adjust this condition as needed
                        createdAt: { $gte: new Date(`${year}-${month}-01`), $lt: new Date(`${year}-${month + 1}-01`) }
                    }
                });
            } else if (date === 'day') {
                pipeline.push({
                    $match: {
                        [colombName]: { $exists: true }, // Adjust this condition as needed
                        createdAt: { $gte: new Date(`${year}-${month}-${data.day}T00:00:00Z`), $lt: new Date(`${year}-${month}-${data.day + 1}T00:00:00Z`) }
                    }
                });
            } else {
                // Default case (last 30 days)
                pipeline.push({
                    $match: {
                        [colombName]: { $exists: true }, // Adjust this condition as needed
                        createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }
                    }
                });
            }

            // Group stage to calculate aggregated metrics
            pipeline.push({
                $group: {
                    _id: null,
                    totalProcessed: { $sum: '$quantity' },
                    totalAmount: { $sum: '$amount' },
                    totalCost: { $sum: '$costAmount' },
                    totalSpent: { $sum: '$apiCharge' },
                    sumProfit: { $sum: '$profit' },
                    updatedAt: { $first: { $dateToString: { format: '%m/%d/%y', date: '$updatedAt' } } },
                    createdAt: { $first: { $dateToString: { format: '%m/%d/%y', date: '$createdAt' } } },
                    numCount: { $sum: 1 },
                    totalProfit: { $sum: { $subtract: ['$apiCharge', '$amount'] } }
                }
            });

            // Execute the aggregation pipeline
            const reult2 = await orderModel.aggregate(pipeline);

            if (reult2) {
                return reult2;
            } else {
                return {
                    message: "Error executing aggregation.",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "Error executing aggregation.",
                status: false,
                error
            }
        }


        // // updateAt, createdAt, 
        // let sqlText = `
        //     SELECT 
        //         SUM(quantity) AS totalProccessed, 
        //         SUM(amount) AS totalAmount, 
        //         SUM(costAmount) AS totalCost, 
        //         SUM(apiCharge) AS totalSpent, 
        //         SUM(profit) AS sumProfit, 
        //         DATE_FORMAT(updateAt, '%m/%d/%y') AS updatedAt,
        //         DATE_FORMAT(createdAt, '%m/%d/%y') AS createdAt,
        //         COUNT(${colombName}) AS numCount, 
        //         SUM(apiCharge - amount) AS totalProfit
        //     FROM orders
        // `;
        
        // switch (data.date) {
        //     case 'year':
        //         sqlText += ` GROUP BY EXTRACT(YEAR FROM ${colombName});`;
        //         break;
        
        //     case 'month':
        //         sqlText += ` 
        //             WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year} 
        //             GROUP BY EXTRACT(MONTH FROM ${colombName});
        //         `;
        //         break;
        
        //     case 'day':
        //         sqlText += ` 
        //             WHERE EXTRACT(YEAR FROM ${colombName}) = ${data.year}
        //             AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
        //             GROUP BY EXTRACT(DAY FROM ${colombName});
        //         `;
        //         break;
        
        //     default:
        //         // AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
        //         sqlText += ` 
        //             WHERE ${colombName} > (curdate() - interval 30 day)
        //             AND EXTRACT(YEAR FROM ${colombName}) = ${data.year}
        //             GROUP BY EXTRACT(DAY FROM ${colombName});
        //         `;

        //         break;
        // }

        // return db.execute(
        //     sqlText,
        // );

    }

}
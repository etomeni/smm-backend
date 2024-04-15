import { userModel } from "./../util/users.model.js";
import { paymentTransactionModel } from "./../util/paymentTransactions.model.js";
import { ticketMessagesModel } from "./../util/ticketMessages.model.js";
import { orderModel } from "./../util/orders.model.js"
import { ticketModel } from "./../util/tickets.model.js"


export class auth {
    static async findEmail(email) {
        try {
            const userExists = await userModel.findOne({ email });
            return userExists;
            
        } catch (error) {
            return {
                message: "No user with such email.",
                status: false,
                ...error
            }
        }
    };

    static async findUsername(username) {
        try {
            const userExists = await userModel.findOne({ username });
            return userExists;
        } catch (error) {
            return {
                message: "No user with such username.",
                status: false,
                ...error
            }
        }
    };

    static async find(usernameEmail) {
        try {
            const userExists = await userModel.findOne({
                $or: [
                { email: usernameEmail },
                { username: usernameEmail }
                ]
            });

            return userExists;
        } catch (error) {
            return {
                message: "No user with such username or email.",
                status: false,
                ...error
            }
        }
    };

    static async findByID(userId) {
        try {
            const userExists = await userModel.findOne({ userID: userId });
            return userExists;
        } catch (error) {
            return {
                message: "No user with such user id.",
                status: false,
                ...error
            }
        }
    };

    static async findByApiKey(apiKey) {
        const userExists = await userModel.findOne({ apiKey });

        if (userExists) {
            return userExists;
        } else {
            return {
                message: "No user with such api key exist.",
                status: false
            }
        }
    };


    static async save(user) {
        try {
            const newUser = new userModel({
                userID: user.userID, 
                name: user.name, 
                username: user.username,
                email: user.email, 
                phoneNumber: user.phoneNumber,
                apiKey: user.apiKey,
                ipHistory: user.ipHistory,
                country: user.country,
                password: user.password
            });
    
            const result = await newUser.save();

            if (result) {
                return result;
            } else {
                return {
                    message: "Error creating new user.",
                    status: false
                }
            }
            
        } catch (error) {
            return {
                error,
                message: error._message || "Error creating new user.",
                status: false
            }
        }
    };

    static async updateUser(userId, updatedUserData) {
        try {
            const updatedUser = await userModel.findOneAndUpdate(
                { userID: userId },
                updatedUserData,
                {
                    runValidators: true,
                    returnOriginal: false,
                }
            );
    
            return updatedUser;
            
        } catch (error) {
            return {
                message: "unable to update user data",
                status: false,
                ...error
            }
            
        }
    };

}

export class user {

    static async orderBalDeduction(condition, data) {
        try {
            const result = await userModel.updateOne(condition, data);
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
                ...error
            }
        }
    };

    static async getCurrentUser(user) {
        try {
            const exisitingUser = await userModel.findOne({ userID: user.userID });
            return exisitingUser;
        } catch (error) {
            return {
                message: "Error creating new transaction.",
                status: false,
                ...error
            }
        }


        // return db.execute(
        //     'SELECT * FROM users WHERE userID = ?',
        //     [user.userID]
        // );
    };

    static async getUserOrders(user) {
        try {
            const allUserOrders = await orderModel.find({ userID: user.userID });
            if (allUserOrders) {
                return allUserOrders;
            } else {
                return {
                    message: "unable to get orders",
                    status: false,
                }
            }
        } catch (error) {
            return {
                message: "unable to get orders",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM orders WHERE userID = ?',
        //     [user.userID]
        // );
    };

    static async getOrderById(id) {
        try {
            const order = await orderModel.findById(id);
            return order;
        } catch (error) {
            return {
                message: `Order with ID "${id}" not found.`,
                status: false,
                ...error
            }
        }

        // return db.execute(
        //     'SELECT * FROM orders WHERE id = ?',
        //     [`${order}`]
        // );
    };

    static async getOrderByOrderID(orderID) {
        try {
            const order = await orderModel.findOne({ orderID: orderID });

            if (order) {
                return order;
            } else {
                return {
                    status: false,
                    message: `Order with ID "${orderID}" not found.`,
                }
            }
        } catch (error) {
            return {
                message: "unable to get orders",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM orders WHERE orderID = ?',
        //     [`${orderID}`]
        // );
    };

    static async getUserTickets(user) {
        try {
            const tickets = await ticketModel.find({ userID: user.userID });

            if (tickets) {
                return tickets;
            } else {
                return {
                    status: false,
                    message: `unable to get tickets.`,
                }
            }
        } catch (error) {
            return {
                message: "unable to get tickets",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM tickets WHERE userID = ?',
        //     [user.userID]
        // );
    };

    static async getTicket(ticket) {
        try {
            const ticketData = await ticketModel.findOne({ ticketID: ticket.ticketID });
            if (ticketData) {
                return ticketData._doc;
            } else {
                return {
                    statuz: false,
                    message: `unable to get tickets.`,
                }
            }
        } catch (error) {
            return {
                message: error.Error ||error.error || "unable to get tickets",
                statuz: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM tickets WHERE ticketID = ?',
        //     [ticket.ticketID]
        // );
    };

    static async getUserTicketMessage(data) {
        try {
            const ticketMessages = await ticketMessagesModel.find({ ticketID: data.ticketID });

            if (ticketMessages) {
                return ticketMessages;
            } else {
                return {
                    status: false,
                    message: `unable to get ticket messages.`,
                }
            }
        } catch (error) {
            return {
                message: "unable to get tickets messages.",
                status: false,
                error
            }
        }

        // return db.execute(
        //     'SELECT * FROM ticket_messages WHERE ticketID = ?',
        //     [data.ticketID]
        // );
    };

    static async getUserPayments(user) {
        try {
            const transactions = await paymentTransactionModel.find({ userID: user.userID });
            if (transactions) {
                return transactions;
            } else {
                return {
                    message: "unable to get user transaction data.",
                    status: false
                }
            }
        } catch (error) {
            return {
                message: "unable to get user transaction data.",
                status: false,
                error
            }
        }


        // return db.execute(
        //     'SELECT * FROM payment_transactions WHERE userID = ?',
        //     [user.userID]
        // );
    };

    static async addFunds(funds) {
        try {
            const paymentTransaction = new paymentTransactionModel({
                transactionID: funds.transactionID,
                userID: funds.userID,
                currency: funds.currency,
                paymentMethod: funds.paymentMethod,
                extraData: funds.extraData,
                amount: funds.amount,
                status: funds.status
            });
    
            const result = await paymentTransaction.save();
            return result;
        } catch (error) {
            return {
                message: "Error adding funds to account.",
                statuz: false,
                ...error
            }
        }


        // return db.execute(
        //     'INSERT INTO payment_transactions (
        //         transactionID, userID, currency, paymentMethod, extraData, amount, status
        //         ) VALUES (?, ?, ?, ?, ?, ?, ?)',
        //     [ funds.transactionID, funds.userID, funds.currency, funds.paymentMethod, funds.extraData, funds.amount, funds.status, ]
        // );
    };

    static async getAdminUsers() {
        try {
            // Assuming you have a User model with a 'role' field
            const adminUserEmail = userModel.find({ role: { $ne: 'user' } }, 'email');
            
            if (adminUserEmail) {
                return adminUserEmail;
            } else {
                return {
                    message: "unable to get admin user emails",
                    status: false
                }
            }
        } catch (error) {
            return {
                message: "unable to get admin user emails",
                status: false,
                error
            }
        }
        

        // return db.execute(
        //     `SELECT email FROM users WHERE role != 'user'`,
        // );
    };

}
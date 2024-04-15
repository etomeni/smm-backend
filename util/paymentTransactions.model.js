import mongoose from 'mongoose';
import validator from 'validator';

const paymentTransactionSchema = mongoose.Schema(
    {
        transactionID: {
            type: String,
            required: [true, "transaction id is required."],
            unique: true,
        },
        userID: {
            type: String,
            required: [true, "user id is required."],
        },
        currency: {
            type: String,
            required: [true, "Currency used in payment is required."]
        },
        paymentMethod: {
            type: String,
            required: [true, "Payment method used is required."],
        },
        extraData: {
            type: Object,
        },
        amount: {
            type: Number,
            required: [true, "Transaction amount is required."],
        }, 
        status: {
            type: String,
            required: [true, "Please enter the user apiKey."],
            // enum: ['Failed', 'Pending', 'Processing', 'successful'], 
        },

    }, 
    {
        timestamps: true
    }
);

export const paymentTransactionModel = mongoose.model("payment_transaction", paymentTransactionSchema);
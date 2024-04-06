import mongoose from 'mongoose';

const paymentMethodSchema = mongoose.Schema(
    {
        paymentMethodID: {
            type: String,
            required: [true, "payment method id is required."],
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: [true, "Currency used in payment is required."]
        },
        minAmount: {
            type: Number,
            required: true,
        },
        maxAmount: {
            type: Number,
            required: true,
        },
        exchangeRate: {
            type: Number,
            required: true,
        }, 
        data: {
            type: Number,
            required: true,
        }, 
        status: {
            type: Number,
            required: true,
            enum: [1, 0], 
        },

    }, 
    {
        timestamps: true
    }
);

export const paymentMethodModel = mongoose.model("payment_method", paymentMethodSchema);
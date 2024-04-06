import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        orderID: {
            type: String,
            required: [true, "Order id is required."],
            unique: true,
        },
        serviceID: {
            type: String,
            required: [true, "Service id is requied."],
        },
        type: {
            type: String,
            required: true,
            enum: ['direct', 'API'], 
            default: 'direct' 
        },
        APIproviderID: {
            type: String,
            // required: [true, "service category is required."],
        },
        userID: {
            type: String,
            required: [true, "user id is required."],
        },
        link: {
            type: String,
            required: [true, "link is required."],
        }, 
        quantity: {
            type: Number,
            required: [true, "quantity is required."],
        },
        amount: {
            type: Number,
            required: [true, "amount is required."]
        },
        costAmount: {
            type: Number,
            required: [true, "cost amount is required."]
        },
        apiCharge: {
            type: String,
        },
        profit: {
            type: Number,
            required: [true, "profit is required."]
        },
        startCount: {
            type: Number,
        },
        remains: {
            type: Number,
        },
        note: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
    }, 
    {
        timestamps: true
    }
);

export const orderModel = mongoose.model("Order", orderSchema);
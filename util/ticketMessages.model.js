import mongoose from 'mongoose';
import validator from 'validator';

const ticketMessageSchema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: [true, "user id is required."],
        },
        ticketID: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true
        },
        attachedFile: {
            type: String,
        },
        adminRead: {
            type: Number,
            required: true,
            enum: [0, 1],
            default: 0
        }, 
        userRead: {
            type: String,
            required: true,
            enum: [0, 1],
            default: 0
        },

    }, 
    {
        timestamps: true
    }
);

export const ticketMessagesModel = mongoose.model("ticket_message", ticketMessageSchema);
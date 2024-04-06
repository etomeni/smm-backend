import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema(
    {
        ticketID: {
            type: String,
            required: [true, "ticket id is required."],
            unique: true,
        },
        userID: {
            type: String,
            required: [true, "user id is required."],
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        attachedFile: {
            type: String,
            required: true,
        },
        isRead: {
            type: Number,
            required: true,
            enum: [0, 1],
            default: 0
        }, 
        status: {
            type: Number,
            required: true,
            enum: [0, 1],
            default: 1
        },

    }, 
    {
        timestamps: true
    }
);

export const ticketModel = mongoose.model("ticket", ticketSchema);
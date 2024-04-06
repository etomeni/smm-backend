import mongoose from 'mongoose';

const generalNewSchema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true,
            enum: [1, 0],
        },
        expiryDate: {
            type: String,
            required: true,
        },
    }, 
    {
        timestamps: true
    }
);

export const generalNewModel = mongoose.model("general_new", generalNewSchema);
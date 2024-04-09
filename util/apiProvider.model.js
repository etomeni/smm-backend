import mongoose from 'mongoose';
import validator from 'validator';

const apiProviderSchema = mongoose.Schema(
    {
        APIproviderID: {
            type: String,
            required: [true, "Please enter user id."],
            unique: true,
        },
        userID: {
            type: String,
            required: [true, "Please enter user id."],
        },
        name: {
            type: String,
            required: [true, "provider name is required."],
        },
        url: {
            type: String,
            required: [true, "api url is required."],
        },
        key: {
            type: String,
            required: [true, "api key is required."],
        },
        balance: {
            type: Number,
            required: [true, "api provider balance is required."],
        }, 
        currency: {
            type: String,
            required: [true, "currency is required."],
        },
        status: {
            type: Number,
            required: [true, "status is required."]
        },
        description: {
            type: String,
        }
    }, 
    {
        timestamps: true
    }
);

export const apiProviderModel = mongoose.model("API_Provider", apiProviderSchema);
import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema(
    {
        serviceID: {
            type: String,
            required: [true, "Please enter user id."],
            unique: true,
        },
        serviceProvider: {
            type: String,
            required: [true, "service provider is required."],
        },
        serviceCategory: {
            type: String,
            required: [true, "service category is required."],
        },
        serviceType: {
            type: String,
            required: [true, "service type is required."],
        },
        providerRate: {
            type: Number,
            required: [true, "provider rate is required."],
        }, 
        resellRate: {
            type: Number,
            required: [true, "resell rate is required."],
        },
        minOrder: {
            type: Number,
            required: [true, "minimum order is required."]
        },
        maxOrder: {
            type: Number,
            required: [true, "maximum order is required."]
        },
        description: {
            type: String,
        }
    }, 
    {
        timestamps: true
    }
);

export const serviceModel = mongoose.model("Service", serviceSchema);
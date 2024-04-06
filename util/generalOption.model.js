import mongoose from 'mongoose';

const generalOptionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            // required: true,
        },
        value: {
            type: String,
            // required: true,
        }
    }, 
    {
        timestamps: true
    }
);

export const generalOptionsModel = mongoose.model("general_option", generalOptionSchema);
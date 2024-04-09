import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: [true, "Please enter user id."],
            unique: true,
        },
        role: { 
            type: String, 
            enum: ['user', 'admin'], 
            default: 'user' 
        }, // Added role field
        name: {
            type: String,
            required: [true, "Please enter the user name."]
        },
        username: {
            type: String,
            required: [true, "Please enter the user username."],
            
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Please enter the user email adddress."],

            unique: true,
            lowercase: true,
            validate: {
              validator: (v) => validator.isEmail(v),
              message: ({ value }) => `${value} is not a valid email`,
            },
        },
        phoneNumber: {
            type: String,
            required: [true, "Please enter the user Phone number."],

            // unique: true,
            validate: {
                validator: (v) => validator.isMobilePhone(v),
                message: ({ value }) => `${value} is not a phone number.`,
            },
        }, 
        balance: {
            type: Number,
            required: true,
            default: 0
        },
        apiKey: {
            type: String,
            required: [true, "Please enter the user apiKey."],
            unique: true,
        },
        ipHistory: {
            type: String,
            required: [true, "Please enter the user ip."]
        },
        country: {
            type: String,
            required: [true, "Please enter the user country."]
        },

        status: {
            type: Number,
            required: true,
            enum: [0, 1],
            default: 1
        },

        password: {
            type: String,
            required: [true, "User password required."]
        },
        twitterLink: {
            type: String,
            required: false
        },
        instagramLink: {
            type: String,
            required: false
        },
        facebookLink: {
            type: String,
            required: false
        },
        webSiteLink: {
            type: String,
            required: false
        },
    }, 
    {
        timestamps: true
    }
);

export const userModel = mongoose.model("User", userSchema);
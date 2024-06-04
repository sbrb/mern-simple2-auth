


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profilePic: {
        type: String,
        trim: true
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;




// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         trim: true
//     },
//     userName: {
//         type: String,
//         trim: true
//     },
//     phone: {
//         type: String,
//         trim: true
//     },
//     email: {
//         type: String,
//         trim: true
//     },
//     password: {
//         type: String,
//         trim: true
//     },
//     profilePic: {
//         type: String,
//         trim: true
//     },
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// }, {
//     timestamps: true
// });

// const userModel = mongoose.model("User", userSchema);

// module.exports = userModel;

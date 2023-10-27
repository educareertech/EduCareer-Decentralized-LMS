import mongoose from "mongoose";

const SignUpSchema = new mongoose.Schema({
    full_name : {
        type : String,
    },
    father_name : {
        type : String
    },
    surname : {
        type: String
    },
    email : {
        type : String,
        unique : true,
        require : true,
        lowercase : true,
        validate : {
            validator : function(value){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value)
            },
            message : props => `${props.value} is not a valid email address!`
        }
    },
    city : {
        type : String
    },
    zip : {
        type : Number
    },
    postal_address :{
        type : String
    },
    password : {
        type: String,
        require : true
    },
    confirm_password : {
        type : String,
        require : true
    }
})


const SignUpTab = new mongoose.model('SignUpTab', SignUpSchema);

export { SignUpTab }
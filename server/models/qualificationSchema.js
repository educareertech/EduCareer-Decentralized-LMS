import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
    addmission_fee : {
        type: Number
    },
    annual_fee : {
        type: Number
    },
    registeration_fee : {
        type: Number
    },
    examination_fee : {
        type: Number
    },
    certificate_fee : {
        type: Number
    },
    subject_fee : {
        type: Number
    },
})

const QualificationSchema = new mongoose.Schema({
    q_name: {
        type : String,
    },
    q_code: {
        type : String
    },
    q_level: {
        type : String,
    },
    q_duration: {
        type : String,
    },
    q_semesters: {
        type: Number
    },
    q_exams: {
        type : String,
    },
    q_subjects: {
        type : [String]
    },
    q_fee: {
        type: feeSchema
    },
    q_entry_criteria: {
        type : String,
    },
    q_passing_criteria: {
        type : String,
    },
})

const QualificationTab = new mongoose.model('Qualification', QualificationSchema);

export { QualificationTab }
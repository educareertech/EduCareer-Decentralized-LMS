import { QualificationTab } from "../models/qualificationSchema.js";

const addQualification = async (req, res) => {
    try {
        console.log("Data with req", req.body);
        const addQualif = new QualificationTab(req.body);
        const saveQualif = await addQualif.save();
        res.status(200).json("Qualification Added Successfully");
    } catch (error) {
        res.status(201).json("Backend: Error:", error.message)
    }
}

const getQualifDetail = async(req, res) => {
    try {
        console.log(req.body);
        const detail = await QualificationTab.find({q_code : req.body.q_code});
        console.log(detail);
        res.status(200).json({detail});
    } catch (error) {
        res.status(201).json("Backend: Error", error.message);
    }
}

export { addQualification, getQualifDetail }
import mongoose from "mongoose";
import { is } from "type-is";
const resumeSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tittle : { type: String, default: 'Resume' },
    public : { type: Boolean, default: false },
    template : { type: String, default: 'classic' },
    accent_color : { type: String, default: '#000000' },
    professional_summary: { type: String, default: '' },
    skills: [String],
    personal_info: {
        image : {type : String, default : ''},
        fullname : { type: String, default: '' },
        profession : { type: String, default: '' },
        email : { type: String, default: '' },
        phone : { type: String, default: '' },
        location : { type: String, default: '' },
        linkedin: { type: String, default: '' },
    },
    experiences: [
        {
            company: String,
            position: String,
            startDate: Date,
            endDate: Date,
            description: String,
            isCurrentlyWorking: { type: Boolean, default: false },
        },
    ],
    educations: [
        {
            institution: String,
            degree: String,
            field: String,
            startDate: Date,
            endDate: Date,
            gpa : String,
        },
    ],
    projects: [
        {
            name: String,
            description: String,
            link: String,
        },
    ],
}, { timestamps: true, minimize: false });

export default mongoose.model("Resume", resumeSchema);
import Resume from '../models/resumeModel.js';


// post : /api/resume/create
export const createResume = async (req, res) => {  
    try {
        const userId = req.userId; // Assuming userId is set in req by auth middleware
        const {title} = req.body;
        const newResume = new Resume({
            userId,
            title: title || 'Resume',
        });
        await newResume.save();
        res.status(201).json({ message: "Resume created successfully", resume: newResume });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }      
};

//delete : /api/resume/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is set in req by auth middleware
        const deletedResume = await Resume.findOneAndDelete({ userId });
        if (!deletedResume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};  

//controller for getting resume
//get: /api/resume/:id
export const getResumebyID= async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is set in req by auth middleware
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    resume.__v = undefined; // Hide __v in response
    resume.createdAt = undefined; // Hide createdAt in response
    resume.updatedAt = undefined; // Hide updatedAt in response
    res.status(200).json({ resume });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
}};

//get: /api/resume/public 
export const getPublicResumesbyID = async (req, res) => {
  try {
    const {resumeId} = req.params; // Assuming userId is set in req by auth middleware
    const resume = await Resume.findOne({ _id: resumeId, public: true }); // Exclude __v, createdAt, updatedAt
    if (!resume) {
      return res.status(404).json({ message: "Public resume not found" });
    }
    resume.__v = undefined; // Hide __v in response
    resume.createdAt = undefined; // Hide createdAt in response
    resume.updatedAt = undefined; // Hide updatedAt in response
    res.status(200).json({ resume });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
};
};


//update: /api/resume/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is set in req by auth middleware
    const {resumeId, resume} = req.body;
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: updateData }, { new: true }
    );  
    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }   
    res.status(200).json({ message: "Resume updated successfully", resume: updatedResume });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
};
};  

import QualificationModel from "../models/qualification.js";

// Create CRUD operations for Qualification

// Get All Qualification = Same as db.qualifications.find()
export const getAllQualification = async (req, res) => {
  try {
    const qualifications = await QualificationModel.find();
    res.status(200).json(qualifications);
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
  }
};

// Read a qualification by ID = Same as db.qualification.findOne({_id: ObjectId("id")})
export const getQualificationById = async (req, res) => {
  try {
    const qualification = await QualificationModel.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ message: "Project not found" }); // 404 HTTP status code for not found
    }
    res.status(200).json(qualification);
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
  }
};

// Create a new qualification = Same as db.qualification.insertOne()
export const createQualification = async (req, res) => {
  try {
    const newQualification = new QualificationModel(req.body);
    const savedQualification = await newQualification.save();
    res.status(201).json(savedQualification); // 201 HTTP status code for created
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
  }
};

// Update a qualification by ID = Same as db.qualification.updateOne({_id: ObjectId("id")}, {$set: {...}})
export const updateQualification = async (req, res) => {
  try {
    const updatedQualification = await QualificationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updateQualification) {
      return res.status(404).json({ message: "Qualification not found" }); // 404 HTTP status code for not found
    }

    res.status(200).json(updatedQualification);
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
  }
};

// Delete a Qualification by ID = Same as db.Qualification.deleteOne({_id: ObjectId("id")})
export const deleteQualification = async (req, res) => {
  try {
    const deletedQualification = await QualificationModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedQualification) {
      return res.status(404).json({ message: "Qualification not found" }); // 404 HTTP status code for not found
    }

    res.status(200).json({ message: "Qualification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 HTTP status code for server error
  }
};

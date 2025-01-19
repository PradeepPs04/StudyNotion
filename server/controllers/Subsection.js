// Import necessary modules
const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description } = req.body;
      // extract video 
      const video = req.files.video;
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res.status(404).json(
          { success: false, 
            message: "All Fields are Required" 
          });
      }
      console.log(video);
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
      console.log(uploadDetails)

      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      });
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection").exec();
  
      // Return the updated section in the response
      return res.status(200).json(
        { success: true, 
          data: updatedSection 
        });
    } catch (error) {
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

// UPDATE sub-section
exports.updateSubSection = async (req, res) => {
    try {
      // fetch data
      const { sectionId, subSectionId, title, description } = req.body
      // serach sub-section
      const subSection = await SubSection.findById(subSectionId)

      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        });
      }

      // update the fields that are provided
      if (title !== undefined) {
        subSection.title = title
      }

      if (description !== undefined) {
        subSection.description = description
      }

      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
      
      console.log('updated subsection: ', subSection);
      // save changes to sub-section entry in db
      await subSection.save();

      const updatedSection = await Section.findById(sectionId).populate("subSection");

      // return response
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      });
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
}

// DELETE sub-section
exports.deleteSubSection = async (req, res) => {
    try {
      // fetch data
      const { subSectionId, sectionId } = req.body

      // remove sub-section from Section
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      );

      // delete sub-section
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection");

      // return response
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      });
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
}
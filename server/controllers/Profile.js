const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// controller for updating proifle picture of user
exports.updateDisplayPicture = async (req, res) => {
    try {
	  // fetch file
		const displayPicture = req.files.displayPicture
		const userId = req.user.id

		const image = await uploadImageToCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			100
		);
		console.log(image);

		// TODO: delete old profile picture from cloudniary ????????

		// update profile picture
		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: image.secure_url },
			{ new: true }
		);
		
		res.send({
			success: true,
			message: `Image Updated successfully`,
			data: updatedProfile,
		})
    } catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
};

// controller for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		// fetch data from request body
		// if data not present then default value = ""
		const { firstName="", lastName="", dateOfBirth="", about="", contactNumber="", gender="" } = req.body;
		const id = req.user.id;

		// Find the user and profile
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// update user fields
		if(firstName !== userDetails.firstName)	userDetails.firstName = firstName;
		if(lastName !== userDetails.lastName)	userDetails.lastName = lastName;

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
		profile.gender = gender;

		// Save the updated profile
		await userDetails.save();
		await profile.save();

		const updatedUser = await User.findById(id).populate('additionalDetails');


		console.log('logging user details:', updatedUser);

		return res.json({
			success: true,
			message: "Profile updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

// controller for deleting an account
exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Delete user after few days using job schedule

		const id = req.user.id;
		// search user
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		
		// Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ 
			success: false,
			message: "User Cannot be deleted successfully" 
		});
	}
};

// controller for getting all details of a user
exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);

		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// controller for getting enrolled courses of a user
exports.getEnrolledCourses = async (req, res) => {
    try {
		const userId = req.user.id;
		// search user
		const userDetails = await User.findOne(
			{_id: userId})
			.populate("courses")
			.exec();
		
		// if user not found
		if (!userDetails) {
			return res.status(400).json({
			success: false,
			message: `Could not find user with id: ${userDetails}`,
			});
		}
		
		return res.status(200).json({
			success: true,
			data: userDetails.courses,
		});
    } catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
};
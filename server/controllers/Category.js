const Category = require("../models/Category");
const Course = require("../models/Course");

// create category controller
exports.createCategory = async (req, res) => {
	try {
        // fetch data
		const { name, description } = req.body;

        // validate data
		if (!name) {
			return res.status(400).json(
                { 
                    success: false, 
                    message: "All fields are required" 
                });
		}

        // check if category already exists
        const categoryFind = await Category.findOne({name:name});
        if(categoryFind) {
            return res.status(409).json({
                success: false,
                message: 'Category already exists',
            });
        }

        // create category
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
        
        // return success response
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

// show all categories controller
exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);

		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// categoryPageDetails 
exports.categoryPageDetails = async (req, res) => {
    try {
            // get categoryId
            const {categoryId} = req.body;
            // get courses for specified categoryId
            const selectedCategory = await Category.findById(categoryId)
                                            .populate("courses")
                                            .exec();
            // validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Category Not Found',
                });
            }

            // get courses for different categories
            const differentCategories = await Category.find(
                { _id: {$ne: categoryId}}) // not equals to
                .populate("courses")
                .exec();

            // get top 10 selling courses
            const topSellingCourses = await Course.find()
            .sort({'studentsEnrolled.length':-1}) // sort by number of enrolled students in course (descending)
            .limit(10) // get first 10
            .exec();

            // return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                    topSellingCourses,
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
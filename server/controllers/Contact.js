const mailSender = require("../utils/mailSender");

require('dotenv').config();

// contact us controller
exports.contactUs = async (req, res) => {
    try {
        // fetch data from req body
        const {firstName, lastName, email, phone, message} = req.body;

        // validate data
        if(!firstName || !lastName || !email || !phone || !message) {
            return res.status(403).json({
                success: false,
                message: 'All fields are reqired',
            });
        }
        
        // send mail (user message) from user to StudyNotion
        try {
            await mailSender(
                process.env.MAIL_USER,
                'Message from user',
                `
                    <p>User name: ${firstName} ${lastName}</p>
                    <p>Email: ${email}</p>
                    <p>Phone: ${phone}</p>
                    <p>Message: ${message}</p>
                `, 
            );
        } catch(err) {
            console.log('Error while sending mail from user to StudyNotion');
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }

        // send mail from StudyNotion to user (your message has been delievered)
        try {
                await mailSender(email, 
                    'Message received', 
                    'Your message has been delievered successfully'
                );
        } catch(err) {
            console.log('Error while sending (message received) mail to user');
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Message received from user',
        });
    } catch(err) {
        console.log('Error in contact us');
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
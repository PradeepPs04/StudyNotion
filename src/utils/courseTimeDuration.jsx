import { convertSecondsToDuration } from "./secondsToDuration";

export const getCourseTimeDuration = (enrolledCourses) => {
    let timeArray = [];

    enrolledCourses.forEach((courseObj) => {

        //////////// using forEach /////////
        // let totalSeconds = 0;
        // courseObj.courseContent.forEach((sectionObj) => {
        //     sec  totalSeconds += subSection.timeDuration;
        //     });
        // });tionObj.subSection.forEach((subSection) => {


        ///////// using reduce ///////////////
        const totalSeconds = courseObj.courseContent.reduce((total, sectionObj) => {
            return total + sectionObj.subSection.reduce((subTotal, subSection) => {
                return subTotal + Number.parseInt(subSection.timeDuration);
            }, 0);
        }, 0);

        console.log("total seconds: ", totalSeconds);

        timeArray.push(convertSecondsToDuration(totalSeconds));
    });

    return timeArray;
}
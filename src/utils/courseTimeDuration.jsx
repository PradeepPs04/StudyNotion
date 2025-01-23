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
                return subTotal + subSection.timeDuration;
            }, 0);
        }, 0);

        timeArray.push(convertSecondsToDuration(totalSeconds));
    });

    return timeArray;
}

const convertSecondsToDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60 );
    const seconds = Math.floor((totalSeconds % 3600) % 60);

    if(hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if(minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}
import toast from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

import {setLoading, setUser} from '../../slices/profileSlice'
import { logout } from "./authAPI";

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API
} = profileEndpoints;

export function getUserDetails(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "GET",
                GET_USER_DETAILS_API,
                null,
                {Authorization: `Bearer ${token}`},
            );

            console.log('get user details api response: ', response);

            const userImage = response.data.data.image 
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
            
            dispatch(setUser({...response.data.data, image:userImage}));
        } catch(err) {
            console.log('Get user details api error...', err);
            toast.error(err.response.data.message);
            dispatch(logout(navigate));
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Fetching courses...");
    try {
        const response = apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {Authorization: `Bearer ${token}`}
        );

        toast.dismiss(toastId);
        return response;
    } catch(err) {
        console.log(err);

        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}
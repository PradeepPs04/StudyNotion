import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { useSelector } from "react-redux";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;

export function uploadDisplayPicture(image, user) {
    return async (dispatch) => {
        const toastId = toast.loading('Uploading...');
        try {
            const response = await apiConnector(
                "PUT", 
                UPDATE_DISPLAY_PICTURE_API, 
                {image, user}, 
                {'Content-Type': 'multipart/form-data'}
            );
            console.log('Logging response', response);

            // update user details in the store
            dispatch(setUser(response.data.data));
            toast.success('Profile picture updated successfully');
        } catch(err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
        toast.dismiss(toastId);
    }
}
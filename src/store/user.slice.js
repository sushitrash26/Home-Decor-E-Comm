import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URI = import.meta.env.VITE_URI;

const initialState = {
    userInfo:{},
    isLoggedIn: false,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
            fetchUser(state,action){ 
            
                state.userInfo = action.payload;
                state.isLoggedIn = !!action.payload;
                
            },
            logUserOut(state,action){
                state.userInfo= action.payload;
                state.isLoggedIn = false;
            },
            updateUserInfo(state,action){
                state.userInfo = {...state.userInfo,...action.payload}
            }
    }

});

export const {fetchUser, logUserOut,updateUserInfo} = userSlice.actions;
export default userSlice.reducer;

export const getUser = ()=>{
    return async function getUserThunk(dispatch,getState){

        try {
            const token= localStorage.getItem("accessToken");
            const response = await axios.get(`${URI}/api/v1/users/get-current-user`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(fetchUser(response.data.data));
        } catch (error) {
            console.error("Error fetching user:", error);
            dispatch(fetchUser(null));
        }

    }
}

export const logoutUser = ()=>{
    return async function logoutUserThunk(dispatch,getState){
        try {

            const response = await axios.get(`${URI}/api/v1/users/logout`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            localStorage.removeItem("accessToken")
            dispatch(logUserOut(response.data.data))
            
        } catch (error) {
            dispatch(logUserOut(null))


        }
    }
}
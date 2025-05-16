import { createAsyncThunk,createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import {  ISignup } from "../../interfaces";
import { createStandaloneToast } from "@chakra-ui/react";

interface ISignUpInfo{
    loading:boolean ;
    data:ISignup |null;
    error:string | null;
}

interface IErrorResponse {
    response?: {
        data?: {
        error?: {
            message?: string;
        };
        };
    };
    }

const initialState:ISignUpInfo={
    loading:false, // pending
    data:null, //sucsess
    error:null//error =>rejuct
}

const {toast}=createStandaloneToast()


export const userSignup=createAsyncThunk("signup/userSignup",async(user:ISignup,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try{
        const{data}=await axiosInstance.post("auth/local/register",user)
        console.log(data)
        return data
    }catch(error){
        return rejectWithValue(error)
    }

})

const signupSlice=createSlice({
    initialState,
    name:"signup",
    reducers:{

    },
    extraReducers: (builder) => {


            // Pending state
            builder.addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
            })
            // Fulfilled state
            builder.addCase(userSignup.fulfilled, (state, action: PayloadAction<ISignup>) => {
                state.loading = false;
                state.data = action.payload;
                toast({
                    title: 'SignUp is successfuly',
                    status: 'success',
                    isClosable: true,
                })
            
                setTimeout(()=>{
                    location.replace('/Login')
                },2000)
            })
            // Rejected state
            builder.addCase(userSignup.rejected, (state, action: PayloadAction<unknown>) => {
                console.log(action)
                state.loading = false;
                state.data = null;
                state.error = typeof action.payload === "string" ? action.payload : "Something went wrong";
                
                toast({
                    title: (action.payload as IErrorResponse)?.response?.data?.error?.message ?? "Login failed",
                    status: 'error',
                    isClosable: true,
                })
            });
    },

})



export default signupSlice.reducer
import { createAsyncThunk,createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  ISignup } from "../../interfaces";
import { createStandaloneToast } from "@chakra-ui/react";
import { supabase } from '../../config/supabaseClient';

interface ISignUpInfo{
    loading:boolean ;
    data: { user: any; session: any } | null;
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
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: { data: { username: user.username } }
        });
        if (error) throw error;
        return data;
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
            builder.addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast({
                    title: 'SignUp is successful',
                    status: 'success',
                    isClosable: true,
                });
                setTimeout(() => {
                    location.replace('/Login');
                }, 2000);
            })
            // Rejected state
            builder.addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = typeof action.payload === 'string' ? action.payload : 'Something went wrong';
                toast({
                    title: 'SignUp failed',
                    status: 'error',
                    isClosable: true,
                });
            });
    },

})



export default signupSlice.reducer
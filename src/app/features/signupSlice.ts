import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { supabase } from '../../config/supabaseClient';
import { createStandaloneToast } from "@chakra-ui/react";

interface ISignUpInfo{
    loading:boolean ;
    data: { user: any; session: any } | null;
    error:string | null;
}

const initialState:ISignUpInfo={
    loading:false, // pending
    data:null, //sucsess
    error:null//error =>rejuct
}

const { toast } = createStandaloneToast();

export const userSignup=createAsyncThunk("signup/userSignup",async(user:any,thunkAPI)=>{
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
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(userSignup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
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
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { supabase } from '../../config/supabaseClient';
import { createStandaloneToast } from "@chakra-ui/react";
import CookiesService from "../../services/CookiesService";

interface IloginInfo{
    loading:boolean ;
    data: { user: any; session: any } | null;
    error:string | null;
}

const initialState:IloginInfo={
    loading:false, // pending
    data:null, //sucsess
    error:null//error =>rejuct
}

const { toast } = createStandaloneToast();

export const userlogin=createAsyncThunk("login/userlogin",async(user:any,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try{
        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password
        });
        if (error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error)
    }

})

const loginSlice=createSlice({
    initialState,
    name:"signup",
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(userlogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(userlogin.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            
            toast({
                title: 'Logged in successfully',
                status: 'success',
                isClosable: true,
            });
            // إعداد الكوكيز لمدة 3 أيام
            const date = new Date();
            const IN_DAYS = 3;
            const EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * IN_DAYS;
            date.setTime(date.getTime() + EXPIRES_IN_MS);
            const options = { path: '/', expires: date };
            const token = action.payload?.session?.access_token || '';
            CookiesService.set('jwt', token, options);
            localStorage.setItem('loggedInAdmin', action.payload?.user?.email || '');
            setTimeout(() => {
                location.replace('/Products');
            }, 2000);
        })
        builder.addCase(userlogin.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = typeof action.payload === 'string' ? action.payload : 'Something went wrong';
            toast({
                title: 'Login failed',
                status: 'error',
                isClosable: true,
            });
        });
    },
})

export default loginSlice.reducer
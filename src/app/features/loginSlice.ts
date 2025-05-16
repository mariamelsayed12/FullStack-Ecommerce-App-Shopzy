import { createAsyncThunk,createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import { Ilogin } from "../../interfaces";
import { createStandaloneToast } from "@chakra-ui/react";
import CookiesService from "../../services/CookiesService";

interface IloginInfo{
    loading:boolean ;
    data:Ilogin |null;
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

const initialState:IloginInfo={
    loading:false, // pending
    data:null, //sucsess
    error:null//error =>rejuct
}



const {toast}=createStandaloneToast()


export const userlogin=createAsyncThunk("login/userlogin",async(user:Ilogin,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try{
        const{data}=await axiosInstance.post("/auth/local",user)
        console.log(data)
        return data
    }catch(error){
        return rejectWithValue(error)
    }

})

const loginSlice=createSlice({
    initialState,
    name:"signup",
    reducers:{

    },
    extraReducers: (builder) => {


            // Pending state
            builder.addCase(userlogin.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
            })
            // Fulfilled state
            builder.addCase(userlogin.fulfilled, (state, action: PayloadAction<Ilogin>) => {
                state.loading = false;
                state.data = action.payload;
                const date=new Date ()
                const IN_DAYES=3;
                const EXPIRES_IN_DAYS=1000*60*60*24*IN_DAYES
                date.setTime(date.getTime()+EXPIRES_IN_DAYS)
                const opetions={path:'/',expires:date}
                CookiesService.set('jwt',action.payload.jwt??'',opetions)
                localStorage.setItem("loggedInAdmin", JSON.stringify(action.payload.user?.email));
                toast({
                    title: 'logged in successfuly',
                    status: 'success',
                    isClosable: true,
                })
                setTimeout(()=>{
                    location.replace('/Products')
                },2000)

            })
            // Rejected state
            builder.addCase(userlogin.rejected, (state, action: PayloadAction<unknown>) => {
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



export default loginSlice.reducer
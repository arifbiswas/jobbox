import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {createUserWithEmailAndPassword , GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import auth from '../../firebase/firebaseConfig'

const initialState = {
 user : { email : "",role : ""},
  isLoading : true,
  isError : false,
  error : '',
}

export const createUser = createAsyncThunk("auth/createUser", async({email,password}) => {
  const data = await createUserWithEmailAndPassword(auth, email,password)
  return data.user.email;
})
export const getUser = createAsyncThunk("auth/getUser", async(email) => {
  const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`)
  const data = await res.json();

  if(data?.status){
    return data;
  }
  return email;
})
export const loginUser = createAsyncThunk("auth/loginUser", async({email,password}) => {
  const data = await signInWithEmailAndPassword(auth, email,password)
  return data.user.email;
})
export const googleLogin = createAsyncThunk("auth/googleLogin", async() => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth,googleProvider);
  return data.user.email;
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut : (state)=>{
      state.user.email = ""; 
    },
    setUser : (state, actions) =>{
      state.user.email = actions.payload ;
      state.isLoading = false;
    },
    toggleLoading : (state)=>{
      state.isLoading = false;
    }
  },
  extraReducers : (builder) => {
    builder
    .addCase(createUser.pending , (state, actions)=> {
      state.isLoading = true ;
      state.isError = false ;
      state.error = "";
    })
    .addCase(createUser.fulfilled , (state , {payload})=>{
      state.isLoading = false ;
      state.user.email = payload;
      state.isError = false ;
      state.error = "";
    })
    .addCase(createUser.rejected , (state, actions)=>{
      state.isLoading = false ;
      state.user.email = "";
      state.isError = true ;
      state.error = actions.error.message;
    })
    .addCase(loginUser.pending , (state, actions)=> {
      state.isLoading = true ;
      state.isError = false ;
      state.error = "";
    })
    .addCase(loginUser.fulfilled , (state , {payload})=>{
      state.isLoading = false ;
      state.user.email = payload;
      state.isError = false ;
      state.error = "";
    })
    .addCase(loginUser.rejected , (state, actions)=>{
      state.isLoading = false ;
      state.user.email = "";
      state.isError = true ;
      state.error = actions.error.message;
    })
    .addCase(googleLogin.pending , (state, actions)=> {
      state.isLoading = true ;
      state.isError = false ;
      state.error = "";
    })
    .addCase(googleLogin.fulfilled , (state , {payload})=>{
      state.isLoading = false ;
      state.user.email = payload;
      state.isError = false ;
      state.error = "";
    })
    .addCase(googleLogin.rejected , (state, actions)=>{
      state.isLoading = false ;
      state.user.email = "";
      state.isError = true ;
      state.error = actions.error.message;
    })
    .addCase(getUser.pending , (state, actions)=> {
      state.isLoading = true ;
      state.isError = false ;
      state.error = "";
    })
    .addCase(getUser.fulfilled , (state , {payload})=>{
      state.isLoading = false ;
      if(payload?.status){
        state.user = payload.data;
      }else if(payload){
        state.user.email = payload
      }
      state.isError = false ;
      state.error = "";
    })
    .addCase(getUser.rejected , (state, actions)=>{
      state.isLoading = false ;
      state.user.email = "";
      state.isError = true ;
      state.error = actions.error.message;
    });
  }
})

export const {logOut , setUser, toggleLoading} = authSlice.actions;

export default authSlice.reducer
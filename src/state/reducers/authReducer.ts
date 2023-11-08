import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { asyncUserT, userT } from '../../types/authType';
import $api from '../../http';


export const registerAsync = createAsyncThunk<{}, asyncUserT>(
  'auth/registerAsync',
  async ({ email, password }, { dispatch} ) => {
    try{
      const { data } = await $api.post('http://localhost:8080/users/register', {
        email,
        password
      });

      dispatch(setUser(data.user));
      dispatch(setIsAuth(true));

      console.log(data);
    }catch(err){
      console.log('ERROR');
    }
  }
);
export const loginAsync = createAsyncThunk<{}, asyncUserT>(
  'auth/loginAsync',
  async ({ email, password }, { dispatch }) => {
    try{
      const { data } = await $api.post('/users/login', {
        email,
        password
      });


      dispatch(setUser(data.user));
      dispatch(setIsAuth(true));

      console.log(data);
    }catch(err){
      console.log('ERROR');
    }
  }
);
export const authAsync = createAsyncThunk(
  'auth/authAsync',
  async (_, { dispatch }) => {
    try{
      const { data } = await axios.get('http://localhost:8080/users/auth', {withCredentials: true});

      dispatch(setUser(data.user));
      dispatch(setIsAuth(true));

      console.log(data);
    }catch(err){
      console.log('ERROR');
    }
  }
);
export const getListAsync = createAsyncThunk(
  'auth/getList',
  async (_, { dispatch }) => {
    try{
      const { data } = await $api.get('/users/list');

      console.log('list: ', data);
    }catch(err){
      console.log('ERROR');
    }
  }
);



export interface iAuthSlice {
  user: userT
  isAuth: boolean
}

const initialState: iAuthSlice = {
  user: {
    email: '',
    role: ''
  },
  isAuth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    }
  }
});

export const { setUser, setIsAuth } = authSlice.actions;
export default authSlice.reducer;

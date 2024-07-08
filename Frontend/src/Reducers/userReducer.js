import { createSlice } from '@reduxjs/toolkit';
import localforage from 'localforage';

const initialState = {
  onboarding: true,
  verified: true,
  _id: '7bb15a44-56f6-4a5e-b4b8-f0ca2dfb0c77',
  role       : 'candidiate'
  // role       : 'company'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setReduxUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setReduxUser } = userSlice.actions;

 const initUser = () => async (dispatch) => {
  try {
    const userValue = await localforage.getItem('user');
    console.log('initialState userValue', userValue);

    if (userValue) {
      dispatch(setReduxUser(userValue));
    }
  } catch (error) {
    console.error('Error initializing user:', error);
  }
};
// initUser()

export default userSlice.reducer;
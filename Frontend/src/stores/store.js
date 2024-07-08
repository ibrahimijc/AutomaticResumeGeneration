import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../Reducers/userReducer';
import dashboardReducer from '../Reducers/dashboardReducer';
import sidebarSlice from '../Reducers/sidebar';

export const store = configureStore({
  reducer: {
    'user': userSlice,
    'dashboard': dashboardReducer,
    'sidebar': sidebarSlice,
  },
});
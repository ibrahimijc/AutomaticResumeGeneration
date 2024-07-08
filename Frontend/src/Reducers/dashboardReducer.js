import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentRoute: 'home'
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setReduxDashboard: (state, action) => {
            console.log('payload', action.payload);
            state.currentRoute = action.payload;
        },
    },
});

export const { setReduxDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;

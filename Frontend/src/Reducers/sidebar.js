import { createSlice } from '@reduxjs/toolkit';
import SvgIcons from '../../public/images/SvgIcons';
import localForage from "localforage";
const initialState = {
    selected: {
        title: 'Dashboard',
        icon: <SvgIcons.dashboard />,
        clickedIcon: <SvgIcons.ClickedDashbaord />,
        route: 'home'
    },
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setReduxSidebar: (state, action) => {
            

                
            state.selected = action.payload;
        },
    },
});

export const { setReduxSidebar} = sidebarSlice.actions;

export default sidebarSlice.reducer;

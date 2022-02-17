import { createSlice } from '@reduxjs/toolkit'


export const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState: {
        sidebarShow: true,
    },
    reducers: {
        toggleSideBar: (state) => {
            state.sidebarShow = !state.sidebarShow;
        }
    }
});

// Action creators are generated for each case reducer function
export const { toggleSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

export const groupSlice = createSlice({
    name:"group",
    initialState:{
        group: null,
    },
    reducers:{
        theGroup: (state, action) => {
            state.group = action.payload;
        },
    },
});
export const {theGroup} = groupSlice.actions;

export const selectGroup = (state) => state.group.group;

export default groupSlice.reducer;

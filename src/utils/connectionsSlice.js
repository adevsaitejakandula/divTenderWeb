import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        getConnections(state,action) {
            return action.payload
        }
    }
})

export const {getConnections} = connectionsSlice.actions

export default connectionsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        getRequests(state,action) {
            return action.payload
        },
        removeRequest(state,action) {
            const newRequests = state.filter(req => req._id !== action.payload)
            return newRequests
        }
    }
})

export const {getRequests, removeRequest} = requestsSlice.actions;

export default requestsSlice.reducer;
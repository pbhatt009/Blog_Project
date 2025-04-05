import { createSlice } from "@reduxjs/toolkit";
const initialState={
    postarray:[],
}
const postmanager=createSlice({
    name:"postmanager",
    initialState,
    reducers:{
        addallposts:(state,action)=>{
            state.postarray=action.payload
        },
        removeallposts:(state)=>{
            state.postarray=[]
        },
        addpost:(state,action)=>{
            state.postarray.push(action.payload)
        },
        removepost:(state,action)=>{
            state.postarray=state.postarray.filter(post=>post.$id!==action.payload)
        },
        updatepost:(state,action)=>{
            state.postarray=state.postarray.map(post=>post.$id===action.payload.$id?action.payload:post)
        }
    }
})
export const {addpost,removepost,updatepost,addallposts,removeallposts}=postmanager.actions;
export default postmanager.reducer;
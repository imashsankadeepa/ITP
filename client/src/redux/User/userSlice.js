import  {createSlice, current} from '@reduxjs/toolkit'



const initialState={
    currentUser:null,
    loading:false,
    error:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false;
            state.error=false;
        },
        signInFailure:(state,action)=>{
            
            state.loading=false;
            state.error=action.payload;
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false;
            state.error=false;
        },
        updateUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteUserStart:(state)=>{
            state.loading=true;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null,
            state.loading=false;
            state.error=false;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        signout:(state)=>{
            state.currentUser=null,
            state.loading=false;
            state.error=false;
        },

        updateItemStart:(state)=>{
            state.loading=true;
        },
        updateItemSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false;
            state.error=false;
        },
        updateItemFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteItemStart:(state)=>{
            state.loading=true;
        },
        deleteItemSuccess:(state)=>{
            state.currentUser=null,
            state.loading=false;
            state.error=false;
        },
        deleteItemFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },


    }
})

export const {deleteItemFailure,deleteItemSuccess,deleteItemStart,updateItemFailure,updateItemSuccess,updateItemStart,signInStart,signInSuccess,signInFailure,updateUserFailure,updateUserStart,updateUserSuccess,deleteUserStart,deleteUserSuccess,deleteUserFailure,signout}=userSlice.actions;

export default userSlice.reducer;
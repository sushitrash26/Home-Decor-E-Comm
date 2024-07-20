import {createSlice} from '@reduxjs/toolkit'

const initialState = []

const cartSlice = createSlice({
    name :"cart",
    initialState,
    reducers:{
        add(state,action){
            
            const itemIndex = state.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state[itemIndex].quantity = (state[itemIndex].quantity || 1) + 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        remove(state,action){
            return state.filter((item) => item._id !== action.payload);
        },
        updateQuantity(state, action) {
            const { _id, quantity } = action.payload;
            const itemIndex = state.findIndex(item => item._id === _id);
            if (itemIndex >= 0) {
             
                if (quantity > 0) {
                    state[itemIndex].quantity = quantity;
                } else {
    
                    state.splice(itemIndex, 1);
                }
            }
        },
        setCart(state, action) {
            return action.payload; 
        },
        emptyCart(state) {
            return []; // Reset the cart to an empty array
        }
    }
})


export const {add,remove,updateQuantity,setCart,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;
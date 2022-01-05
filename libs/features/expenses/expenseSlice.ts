// import { createSlice } from '@reduxjs/toolkit'
// import {dumdumData} from "../../dummy_data/data";
// import {Expense} from "../../../../Definitions/Expense";
//
// export const expenseSlice = createSlice({
//     name: 'expenses',
//     initialState: {
//         value: dumdumData,
//     },
//     reducers: {
//         modifyExpenses: (state, action) => {
//             // Redux Toolkit allows us to write "mutating" logic in reducers. It
//             // doesn't actually mutate the state because it uses the Immer library,
//             // which detects changes to a "draft state" and produces a brand new
//             // immutable state based off those changes
//             state.value = action.payload;
//             // console.log(state.value, action.payload);
//             // state.value.push(action.payload);
//         },
//         addExpense: (state, action) => {
//             state.value = [...state.value, action.payload];
//         },
//
//         // incrementByAmount: (state, action) => {
//         //     state.value += action.payload
//         // },
//     },
// })
//
// // Action creators are generated for each case reducer function
// export const { modifyExpenses, addExpense } = expenseSlice.actions
//
// const expensesReducer =  expenseSlice.reducer;
// export default expensesReducer;
export {};
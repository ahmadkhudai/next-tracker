import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../features/counter/counterSlice";
import expensesReducer from "../features/expenses/expenseSlice";
import settingsReducer from "../features/settings/settingsSlice";

export default configureStore({
    reducer: {
        expenses:expensesReducer,
        settings:settingsReducer
    },
})
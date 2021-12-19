import { createSlice } from '@reduxjs/toolkit'
import {baseSettings} from "../../utils/expense_utils";
import {InputTypes} from "../../../../Definitions/InputTypes";
import {SettingLabels} from "../../../../Definitions/Setting";

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        value: {
            "maxAcceptableRange": {
                type: InputTypes.number,
                label: SettingLabels.maxAcceptableRange,
                value: 150,
                name: "Max Value"
            },
            "deleteMode": {
                type: InputTypes.checkbox,
                label: SettingLabels.deleteMode,
                value: true,
                name: "Delete Mode?"
            },

        }
    },
    reducers: {
        modifySettings: (state, action) => {
            console.log(action.payload);
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { modifySettings } = settingsSlice.actions

const settingsReducer =  settingsSlice.reducer;
export default settingsReducer;
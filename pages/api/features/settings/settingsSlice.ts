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
                value: 1,
                name: "Max Valhjhkue"
            },
            "deleteMode": {
                type: InputTypes.checkbox,
                label: SettingLabels.deleteMode,
                value: true,
                name: "Deletehjhjh"
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


const settingsReducer =  settingsSlice.reducer;
export default settingsReducer;
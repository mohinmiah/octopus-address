import { PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import { UserActions } from "./UserActions";

const initialState = {};

export const userReducer: Reducer<any, PayloadAction> = (prevState: any = initialState, action: PayloadAction): any => {
    let newState = prevState;
    switch (action.type) {
        case UserActions.SAVE_ADDRESS.type:
            newState = { ...newState, address: action.payload }
            break;
    }
    return newState;
}
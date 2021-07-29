import { PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import { UserActions } from "./UserActions";


export interface UserAddressState {
    line1?: string;
    line2?: string;
    postcode?: string;
    townCity?: string;
    county?: string;
    country?: string;
    years?: string;
    months?: string;
}

export interface UserState {
    address: UserAddressState | undefined;
}

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
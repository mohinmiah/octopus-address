import { PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";
import PostcodeAddressSuggestion from "../../services/addressService/postcodeAddressSuggestion";
import LocationActions from "./LocationActions";

export interface LocationState {
    suggestions: PostcodeAddressSuggestion | null | undefined;
    error: string | undefined;
}

const initialState: LocationState = {
    suggestions: undefined,
    error: undefined
};

export const locationReducer: Reducer<any, PayloadAction> = (prevState: any = initialState, action: PayloadAction): LocationState => {
    let newState = prevState;
    console.log("action called:", action)
    switch (action.type) {
        case LocationActions.RESOLVED_POSTCODE.type:
            newState = { ...newState, suggestions: action.payload, error: undefined }
            console.log("yoyo");
            break;
        case LocationActions.RESOLVED_POSTCODE_ERROR.type:
            newState = { ...newState, suggestions: undefined, error: action.payload }
            break;
    }
    return newState;
}
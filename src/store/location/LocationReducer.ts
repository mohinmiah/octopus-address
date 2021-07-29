import { PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";
import PostcodeAddressSuggestion, { AddressSuggestion } from "../../services/addressService/postcodeAddressSuggestion";
import LocationActions from "./LocationActions";

export interface LocationState {
    selectedSuggestion: AddressSuggestion | undefined;
    suggestions: PostcodeAddressSuggestion | null | undefined;
    error: string | undefined;
}

const initialState: LocationState = {
    selectedSuggestion: undefined,
    suggestions: undefined,
    error: undefined
};

export const locationReducer: Reducer<any, PayloadAction> = (prevState: any = initialState, action: PayloadAction): LocationState => {
    let newState = prevState;
    console.log("action called:", action)
    switch (action.type) {
        case LocationActions.RESOLVED_POSTCODE.type:
            newState = { ...newState, suggestions: action.payload, error: undefined, selectedSuggestion: undefined };
            break;
        case LocationActions.RESOLVED_POSTCODE_ERROR.type:
            newState = { ...newState, suggestions: undefined, error: action.payload };
            break;
        case LocationActions.SELECT_ADDRESS_SUGGESTION.type:
            newState = { ...newState, selectedSuggestion: action.payload, suggestions: undefined };
            newState.selectedSuggestion.postcode = prevState.suggestions.postcode;
            break;
    }
    return newState;
}
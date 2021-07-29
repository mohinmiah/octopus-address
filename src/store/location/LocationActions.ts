import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Observable } from "rxjs";
import AddressService from "../../services/addressService/addressService";
import PostcodeAddressSuggestion, { AddressSuggestion } from "../../services/addressService/postcodeAddressSuggestion";

export default class LocationActions {
    static readonly RESOLVED_POSTCODE = createAction<PostcodeAddressSuggestion | null>("location/resolvePostcode");
    static readonly RESOLVED_POSTCODE_ERROR = createAction<string>("location/resolvePostcodeError");
    static readonly RESOLVE_POSTCODE = createAsyncThunk("location/resolvePostcode", async (postcode: string, thunkApi) => {
        thunkApi.dispatch(LocationActions.RESOLVED_POSTCODE(null));
        const obs: Observable<any> = new AddressService().mockLookupAddressFromPostcode(postcode)
        obs.subscribe({
            next: (suggestions: PostcodeAddressSuggestion) => {
                thunkApi.dispatch(LocationActions.RESOLVED_POSTCODE(suggestions));
            },
            error: (error: Error) => {
                thunkApi.dispatch(LocationActions.RESOLVED_POSTCODE_ERROR(error.message));
            }
        });

        return Promise.resolve();
    });

    static readonly SELECT_ADDRESS_SUGGESTION = createAction<AddressSuggestion | undefined>("location/selectAddressSuggestion");

}
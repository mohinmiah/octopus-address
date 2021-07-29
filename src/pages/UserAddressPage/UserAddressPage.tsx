import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressSelector from "../../components/AddressSelector/AddressSelector";
import PostCodeInput from "../../components/PostcodeInput/PostCodeInput";
import { CenteredColumn } from "../../layouts/CenteredColumnLayout";
import PostcodeAddressSuggestion from "../../services/addressService/postcodeAddressSuggestion";
import LocationActions from "../../store/location/LocationActions";
import { AppState } from "../../store/Store";

export function UserAddressPage() {

    const dispatch = useDispatch();
    const addressSuggestions: PostcodeAddressSuggestion = useSelector<AppState>(state => state.location.suggestions) as PostcodeAddressSuggestion;
    const postcodeError: string = useSelector<AppState>(state => state.location.error) as string;

    const handlePostCodeSearch: Function = (postCode: string) => {
        dispatch(LocationActions.RESOLVE_POSTCODE(postCode));
    }

    const handleAddressSelected: Function = () => { };

    const shouldShowAddressSuggestions = (): boolean => {
        return !postcodeError && addressSuggestions !== undefined;
    }

    const render = () => {
        return (
            <CenteredColumn>
                <h2>Home address</h2>
                <PostCodeInput onPostcodeSearch={handlePostCodeSearch} />
                {
                    shouldShowAddressSuggestions()
                    && <AddressSelector suggestions={addressSuggestions} onSelected={handleAddressSelected} />
                }
            </CenteredColumn>
        );
    }

    return render();
}
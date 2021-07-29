import React, { ReactNode } from "react";
import { CenteredColumn } from "../../layouts/CenteredColumnLayout";
import { AddressSuggestion } from "../../services/addressService/postcodeAddressSuggestion";
import { UserAddressState } from "../../store/user/UserReducer";
import styles from "./AddressForm.module.scss";

interface AddressFormProps {
    address: AddressSuggestion | undefined;
    onSave: Function;
}

interface AddressFormState {
    address: UserAddressState | undefined;
    valid: boolean;
}

export default class AddressForm extends React.Component<AddressFormProps, AddressFormState> {

    constructor(props: AddressFormProps) {
        super(props);
        this.state = {
            address: undefined,
            valid: true
        };
    }

    componentDidMount() {
        if (this.props.address) {
            this.copyPropsToState();
        }
    }

    private copyPropsToState() {
        this.setState({
            address: {
                line1: this.props.address?.line_1,
                line2: this.props.address?.line_2,
                postcode: this.props.address?.postcode,
                townCity: this.props.address?.town_or_city,
                county: this.props.address?.county,
                country: this.props.address?.country,
                years: "0",
                months: "0"
            }
        });
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            address: { ...this.state.address, [event.target.name]: event.target.value }
        });
    }

    handleSaveClicked() {
        if (this.isValidForm()) {
            this.props.onSave(this.state.address);
            this.setState({ valid: true });
        } else {
            this.setState({ valid: false });
        }
    }

    isValidForm(): boolean {
        return !!this.state.address?.line1 && !!this.state.address?.postcode && !!this.state.address?.townCity
            && !!this.state.address?.country && !!this.state.address?.years && !!this.state.address?.months;
    }



    renderForm(): ReactNode {
        return <div className={`${styles.container} ${!this.state.valid && styles.invalid}`}>
            <CenteredColumn>
                <label htmlFor="line1" className={`${!this.state.valid && styles.required}`}>Address line 1 *</label>
                <input id="line1" name="line1" onChange={(event) => this.handleInputChange(event)} type="text" value={this.state.address?.line1} data-required="true" />
                <label htmlFor="line2">Address line 2</label>
                <input id="line2" name="line2" onChange={(event) => this.handleInputChange(event)} type="text" value={this.state.address?.line2} />
                <label htmlFor="postcodeAddress" className={`${!this.state.valid && styles.required}`}>Postcode *</label>
                <input id="postcodeAddress" name="postcode" onChange={(event) => this.handleInputChange(event)} type="text" value={this.state.address?.postcode} data-required="true" />
                <label htmlFor="townCity" className={`${!this.state.valid && styles.required}`}>Town/city *</label>
                <input id="townCity" name="townCity" onChange={(event) => this.handleInputChange(event)} type="text" value={this.state.address?.townCity} data-required="true" />
                <label htmlFor="county">County</label>
                <input id="county" name="county" onChange={(event) => this.handleInputChange(event)} type="text" value={this.state.address?.county} />
                <label htmlFor="country" className={`${!this.state.valid && styles.required}`}>Country *</label>
                <input id="country" name="country" onChange={(event) => this.handleInputChange(event)} type="text" value={this.state.address?.country} data-required="true" />
                {this.renderYearSelect()}
                {!this.state.valid && <div className={styles.validationMessage}>Complete all mandatory fields</div>}
                <button className={styles.saveButton} onClick={() => this.handleSaveClicked()}>Save</button>

            </CenteredColumn>
        </div>
    }

    //TODO: This should be it's own component, but I'm running out of time
    renderYearSelect(): ReactNode {
        return <div className={styles.durationContainer}>
            <label htmlFor="years" className={`${!this.state.valid && styles.required}`}>How long have you been at your current address? *</label>
            <div>
                <select defaultValue="-1" id="years" name="years" onChange={(event) => this.handleInputChange(event)} data-required="true">
                    <option value="-1" disabled key="-1">Years</option>
                    <option value="0" key="0">0 years</option>
                    <option value="1" key="1">1 year</option>
                    <option value="2" key="2">2 years</option>
                    <option value="3" key="3">3+ years</option>
                </select>
                <select defaultValue="-1" id="months" name="months" onChange={(event) => this.handleInputChange(event)} data-required="true">
                    <option value="-1" disabled key="-1">Months</option>
                    {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].map(x => {
                        return <option key={x} value={x}>{x} months</option>;
                    })}
                </select>
            </div>
        </div>;
    }

    renderLoading(): ReactNode {
        return <div className={styles.loading}>Loading...</div>;
    }

    render(): ReactNode {
        return (this.state.address) ? this.renderForm() : this.renderLoading();
    }

}
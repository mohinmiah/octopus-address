import React, { ReactNode } from "react";
import PostcodeAddressSuggestion, { AddressSuggestion } from "../../services/addressService/postcodeAddressSuggestion";
import styles from "./AddressSelector.module.scss";

interface AddressSelectorProps {
    suggestions: PostcodeAddressSuggestion | undefined | null;
    onSelected: Function;
}

export default class AddressSelector extends React.Component<AddressSelectorProps> {


    renderLoading(): ReactNode {
        return <div className={styles.loading}>Loading...</div>
    }

    handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        const index: number = parseInt(event.target.value, 10);
        const address: AddressSuggestion | undefined = (this.props.suggestions?.addresses) ? this.props.suggestions?.addresses[index] : undefined;
        this.props.onSelected(address);
    }

    renderSelector(): ReactNode {
        return <div className={styles.container} ><select className={styles.addressSelector} defaultValue="-1" onChange={(event) => { this.handleSelect(event); }}>
            <option key="-1" value="-1" disabled >Please select an address...</option>
            {
                this.props.suggestions?.addresses && this.props.suggestions?.addresses.map((address, i) => {
                    return <option key={i} value={i}>{address.line_1}</option>
                })
            }
        </select></div>
    }

    render(): ReactNode {
        const node: ReactNode = (this.props.suggestions) ? this.renderSelector() : this.renderLoading();
        return node;
    }
}
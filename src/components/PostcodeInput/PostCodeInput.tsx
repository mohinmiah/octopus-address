import React, { ReactNode } from "react";
import { CenteredColumn } from "../../layouts/CenteredColumnLayout";
import styles from "./PostCodeInput.module.scss";

interface PostCodeInputProps {
    onPostcodeSearch: Function;
    serviceError?: string | undefined;
}

interface PostCodeInputState {
    postcode: string;
}

export default class PostCodeInput extends React.Component<PostCodeInputProps, PostCodeInputState> {

    constructor(props: PostCodeInputProps) {
        super(props);
        this.state = {
            postcode: ""
        };
    }

    handlePostcodeLookup() {
        this.props.onPostcodeSearch(this.state.postcode);
    }

    handleKeyInput(kbEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (kbEvent.key === "Enter") {
            this.handlePostcodeLookup();
        }
    }

    displayErrorMessage(): string {
        console.log(this.props.serviceError)
        let errorMessage: string = "Sorry, there was an error finding your address. Try again.";
        switch (this.props.serviceError) {
            case "400":
                errorMessage = "Enter a valid UK postcode";
                break;
        }
        return errorMessage;
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ postcode: event.target.value });
    }

    render(): ReactNode {
        return (
            <div className={styles.container}>
                <CenteredColumn>
                    <label htmlFor="postcodeInput">Your address:</label>
                    <input type="text"
                        id="postcodeInput"
                        value={this.state.postcode}
                        className={styles.postCodeInput}
                        onChange={(event) => this.onChange(event)}
                        onKeyUp={(event) => this.handleKeyInput(event)} />
                    <button className={styles.searchButton} onClick={() => this.handlePostcodeLookup()}>&#128269;</button>
                    {this.props.serviceError && <div>{this.displayErrorMessage()}</div>}
                </CenteredColumn>
            </div>
        );
    }
}
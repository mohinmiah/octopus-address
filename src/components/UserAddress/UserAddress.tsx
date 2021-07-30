import React from "react";
import { ReactNode } from "react";
import { UserAddressState } from "../../store/user/UserReducer";
import styles from "./UserAddress.module.scss";
import editSvg from "../../images/pencil-fill.svg";
import deleteSvg from "../../images/trash.svg";

interface UserAddressProps {
    userAddress: UserAddressState;
    onEdit: Function;
    onDelete: Function;
}


export default class UserAddress extends React.Component<UserAddressProps> {

    render(): ReactNode {
        return <div className={styles.container}>
            <div className={styles.details}>
                <ul className={styles.address}>
                    <li>{this.props.userAddress.line1}</li>
                    <li>{this.props.userAddress.line2}</li>
                    <li>{this.props.userAddress.postcode}</li>
                    <li>{this.props.userAddress.townCity}</li>
                    <li>{this.props.userAddress.county}</li>
                    <li>{this.props.userAddress.country}</li>
                </ul>
                <div className={styles.duration}>Time at address: <span>{this.props.userAddress.years}</span> years,
                    <span> {this.props.userAddress.months}</span> months</div>
            </div>
            <div className={styles.controlPanel}>
                <button onClick={() => this.props.onEdit(this.props.userAddress)}><img src={editSvg} alt="Edit" /></button>
                <button onClick={() => this.props.onDelete()}><img src={deleteSvg} alt="Delete" /></button>
            </div>
        </div>
    }
}
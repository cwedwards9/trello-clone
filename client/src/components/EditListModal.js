import React from "react";
import useToggle from "../hooks/useToggle";
import { ImCross } from "react-icons/im"
import editListStyles from "./EditListModal.module.scss";

export default function EditListModal(props) {
    const [isDeleteMsg, toggleDeleteMsg] = useToggle(false);
    
    return (
        <div className={editListStyles.listEditModal}>
            <div>
                <h3>List Actions</h3>
                <button onClick={props.toggleListModal} className={editListStyles.listModalExit}><ImCross /></button>
            </div>
            <hr />
            <ul>
                <li onClick={function() {props.toggleListModal(); props.inputFocus();}}>Add card...</li>
                <li onClick={function() {props.toggleListModal(); props.toggleEditListTitle();}}>Rename list...</li>
                {isDeleteMsg ?
                    <li>Confirm list deletion:
                        <span className={editListStyles.confirmDeletebtns}>
                            <button onClick={props.handleDelete} className={editListStyles.deleteBtn}>Delete</button>
                            <button onClick={toggleDeleteMsg} className={editListStyles.cancelBtn}>Cancel</button>
                        </span>
                    </li>
                    :
                    <li onClick={toggleDeleteMsg}>Delete list...</li>
                }
            </ul>
        </div>
    );
}
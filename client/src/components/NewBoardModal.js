import React from "react";
import modalStyles from "./NewBoardModal.module.scss";

export default function NewBordModal(props) {
    const { toggleModal, createBoard, updateName, updateDesc, boardName, boardDesc } = props;

    return (
        <div className={modalStyles.newBoardModal}>
            <h2>Create New Board</h2>
            <form onSubmit={createBoard} className={modalStyles.newBoardForm}>
                <div>
                    <label htmlFor="boardName">Board Name:</label>
                    <input type="text" id="boardName" value={boardName} onChange={updateName} />
                </div>
                <div>
                    <label htmlFor="boardDesc">Description:</label>
                    <input type="text" id="boardDesc" value={boardDesc} onChange={updateDesc} />
                </div>
                <div className={modalStyles.modalBtn}>
                    <button>Create</button>
                    <button onClick={toggleModal}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
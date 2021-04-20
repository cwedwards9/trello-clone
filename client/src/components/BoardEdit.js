import React from "react";
import useToggle from "../hooks/useToggle";
import useInputState from "../hooks/useInputState";
import { Link } from "react-router-dom";
import boardEditStyles from "./BoardEdit.module.scss";
import dateFormat from "dateformat";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi';

export default function BoardEdit(props) {
    const [isEditingBoard, toggleEditForm] = useToggle(false);
    const { id, name, description, isStarred, bgImage, updatedAt } = props.boardInfo;
    const [boardName, updateBoardName] = useInputState(name);
    const [boardDesc, updateBoardDesc] = useInputState(description);
    const [isModal, toggleModal] = useToggle(false);

    const handleUpdate = (e) => {
        e.preventDefault();

        props.updateBoard(id, { name: boardName, description: boardDesc });
        toggleEditForm();
    }


    return (
        <>
        {isEditingBoard ? 
            <form onSubmit={handleUpdate} className={boardEditStyles.boardEditForm} style={{backgroundImage: `url(${bgImage})`}}>
                <div>
                    <label>Board Name:</label>
                    <input value={boardName} onChange={updateBoardName} />
                </div>
                <div>
                    <label>Board Description:</label>
                    <textarea value={boardDesc} onChange={updateBoardDesc}></textarea>
                </div>
                <button>Update</button>
                <button onClick={toggleEditForm}>Cancel</button>
            </form>
        :
            <section key={id} className={boardEditStyles.boardSettingsCard} style={{backgroundImage: `url(${bgImage})`}}>
                <div className={boardEditStyles.boardSettingsTitle}>
                    <h2><Link to={`/board/${id}`}>{name}</Link></h2>
                    { isStarred ? <button style={{ color: "gold"}}><AiFillStar /></button> : <button><AiOutlineStar /></button> }
                </div>
                <div className={boardEditStyles.boardSettingsBtns}>
                    <button onClick={toggleEditForm}><BiPencil /></button>
                    <button onClick={toggleModal}><BiTrash /></button>
                </div>
                <div className={boardEditStyles.boardSettingsInfo}>
                    <p>{description}</p>
                    <p>Last updated: {dateFormat(updatedAt, "fullDate")}</p>
                </div>
            </section>
        }

        {isModal
            ?
                <div className={boardEditStyles.deleteBoardModal}>
                    <h3>Delete Board?</h3>
                    <hr />
                    <p>Are you sure you want to delete the project "{name}"?</p>
                    <div>
                        <button onClick={() => props.deleteBoard(id)} className={boardEditStyles.deleteBtn}>Delete</button>
                        <button onClick={toggleModal} className={boardEditStyles.cancelBtn}>Cancel</button>
                    </div>
                </div>
            :
                null
        }
            
        </>
    );
}
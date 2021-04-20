import React, { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";
import useInputState from "../hooks/useInputState";
import modalStyles from "./NewBoardModal.module.scss";
import axios from "axios";
import { ImCross } from "react-icons/im"

export default function NewBordModal({ toggleModal, createBoard }) {
    const [boardName, updateName, resetBoardName] = useInputState("");
    const [boardDesc, updateDesc, resetBoardDesc] = useInputState("");
    const [isStarred, toggleStarred] = useToggle(false);
    const [boardBg, setBoardBg] = useState("");
    const [bgImagesList, setBgImagesList] = useState([]);

    useEffect(() => {
        axios.get("/api/unsplash")
            .then((res) => {
                console.log(res.data.results)
                const images = res.data.results.map(result => {
                    return { urlImgMedium: result.urls.regular, urlImgFull: result.urls.full };
                });
                setBgImagesList(images);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        createBoard({ name: boardName, description: boardDesc, bgImage: boardBg, isStarred: isStarred });
        resetBoardName();
        resetBoardDesc();
    }

    return (
        <div className={modalStyles.newBoardModal}>
            <div className={modalStyles.modalHeading}>
                <h3>Create New Board</h3>
                <button onClick={toggleModal}><ImCross /></button>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className={modalStyles.textInputs}>
                    <label htmlFor="boardName">Board Name:</label>
                    <input type="text" id="boardName" value={boardName} onChange={updateName} required />
                </div>
                <div className={modalStyles.textInputs}>
                    <label htmlFor="boardDesc">Description:</label>
                    <input type="text" id="boardDesc" value={boardDesc} onChange={updateDesc} required />
                </div>
                <div className={modalStyles.backgroundSelect}>
                    <label htmlFor="bg-select">Choose a background:</label>
                    <ul id="bg-select" name="bg-image" className={modalStyles.backgroundBtns}>
                    {
                        bgImagesList.map(img => (
                            <li key={img.urlImgMedium} value=""><button onClick={() => setBoardBg(`${img.urlImgFull}`)} type="button" 
                            style={{backgroundImage: `url(${img.urlImgMedium})`}}></button></li>
                        ))
                    }
                    </ul>
                </div>
                <div id={modalStyles.checkbox}>
                    <input type="checkbox" id="starred" name="starred" value="starred" onChange={toggleStarred} />
                    <label htmlFor="starred">Starred Project</label>
                </div>
                
                <button className={modalStyles.modalBtn}>Create</button>
            </form>
        </div>
    );
}
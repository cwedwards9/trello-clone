import React, { useState } from "react";
import Card from "./Card";
import EditListModal from "./EditListModal";
import useInputState from "../hooks/useInputState";
import useToggle from "../hooks/useToggle";
import axios from "axios";
import listStyles from "./List.module.scss";
import { BsThreeDots } from "react-icons/bs";
import { FaWindowMinimize } from "react-icons/fa"


export default function List(props) {
    const [newCardDesc, updateCardDesc, resetCardDesc] = useInputState("");
    const [listCards, setListCards] = useState(props.list.Cards || []);
    const [listModal, toggleListModal] = useToggle(false);
    const [listTitle, updateListTitle] = useInputState(props.list.listTitle);
    const [isEditingListTitle, toggleEditListTitle] = useToggle(false);
    const [addCardBtn, toggleAddCardBtn] = useToggle(false);

    const createCard = (e) => {
        e.preventDefault();
        axios.post("/api/cards", { description: newCardDesc, ListId: props.list.id })
            .then((response) => {
                setListCards([...listCards, response.data]);
                resetCardDesc();
            })
    }

    const dropCard = (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        const card = document.getElementById(cardId);
        card.style.display = "block";

        e.target.appendChild(card);

        axios.put("/api/cards", { id: cardId, ListId: props.list.id })
            .then((response) => {
                // setListCards([...listCards, response.data]);
            })
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const handleDelete = () => {
        props.deleteList(props.list.id)
    }

    const handleListTitleUpdate = (e) => {
        e.preventDefault();
        axios.put("/api/lists", { id: props.list.id, listTitle: listTitle })
            .then(() => {
                toggleEditListTitle();
            })
    }

    const inputFocus = () => {
        document.querySelector(`#newCardInput-${props.list.id}`).focus();
    }

    return (
        <section className={listStyles.list}>
            <div className={listStyles.listHead}>
                {isEditingListTitle ?
                    <form onSubmit={handleListTitleUpdate}>
                        <input value={listTitle} onChange={updateListTitle} />
                        <button>Update</button>
                        <button onClick={toggleEditListTitle}>Cancel</button>
                    </form>
                    :
                    <>
                        <h3>{listTitle}</h3>
                        <button className={listStyles.listOptionsBtn} onClick={toggleListModal}><BsThreeDots /></button>
                    </>
                }
                
            </div>
            <div id={props.list.id} onDrop={dropCard} onDragOver={dragOver} className={listStyles.listDropArea}>
                {listCards && listCards.map(card => (
                    <Card 
                        key={card.id} 
                        card={card} 
                    />
                ))}
            </div>
            
            <form onSubmit={createCard} className={listStyles.newCardForm} autocomplete="off">
                <input value={newCardDesc} onChange={updateCardDesc} onFocus={toggleAddCardBtn} placeholder="+ Add another card" id={`newCardInput-${props.list.id}`} />
                {
                    addCardBtn ?
                        <div>
                            <button>Add Card</button>
                            <button aria-label="Collapse" type="button" onClick={toggleAddCardBtn}><FaWindowMinimize /> </button>
                        </div>
                    :
                        null
                }
            </form>

            {listModal ?
                <EditListModal 
                    handleDelete={handleDelete}
                    toggleListModal={toggleListModal}
                    toggleEditListTitle={toggleEditListTitle}
                    inputFocus={inputFocus}
                />
                :
                null
            }
        </section>
    );
}
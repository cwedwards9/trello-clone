import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import useToggle from "../hooks/useToggle";
import List from "../components/List";
import axios from "axios";
import boardStyles from "./Board.module.scss";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function Board() {
    const { id: boardId } = useParams();
    const [listArray, setListArray] = useState([]);
    const [boardInfo, setBoardInfo] = useState("");
    const [newListTitle, updateListTitle, resetListTitle] = useInputState("");
    const [isStarred, toggleStarStatus] = useToggle(false);
    const [addListBtn, toggleAddListBtn] = useToggle(false);

    useEffect(() => {
        axios.get(`/api/boards/${boardId}`)
            .then(response => {
                setBoardInfo(response.data);
                if(response.data.isStarred) toggleStarStatus();
                else return; 
            })

        axios.get(`/api/lists/${boardId}`)
            .then(response => {
                setListArray(response.data.listData);
            })
    }, []);

    const createList = (e) => {
        e.preventDefault();

        axios.post("/api/lists", { listTitle: newListTitle, BoardId: boardId })
            .then((response) => {
                console.log(response);
                setListArray([...listArray, response.data]);
                resetListTitle();
            })
    };

    const deleteList = (id) => {
        axios.delete(`/api/lists/${id}`)
            .then(() => {
                const updatedList = listArray.filter(list => list.id !== id);
                setListArray(updatedList);
            })
    }

    const toggleBoardStarStatus = () => {
        axios.put(`/api/boards/${boardId}`, { isStarred: !isStarred })
            .then(() => {
                toggleStarStatus();
            })
    }

    return (
        <>
        <Navbar />
        <div className={boardStyles.boardPage} style={{backgroundImage: `url(${boardInfo.bgImage})`}}>
        <header className={boardStyles.boardHeader}>
            <h1>{boardInfo.name}</h1>
            { isStarred ? <button style={{ color: "yellow"}} onClick={toggleBoardStarStatus}><AiFillStar /></button> 
                : <button style={{ color: "white"}} onClick={toggleBoardStarStatus}><AiOutlineStar /></button> 
            }
            <Link to="/board-settings" className={boardStyles.settingsLink}>Board Settings</Link>
        </header>
        <main className={boardStyles.mainBoard} >
            {listArray.map(list => (
                <List 
                    key={list.id}
                    list={list}
                    deleteList={deleteList}
                />
            ))}

            <section className={boardStyles.addListForm}>
                <form onSubmit={createList}>
                    <input value={newListTitle} onChange={updateListTitle} onFocus={toggleAddListBtn} placeholder="+ Add a list" />
                    {
                        addListBtn ?
                            <button>Add List</button>
                        :
                            null
                    }
                </form>
            </section>
        </main>
        </div>
        </>
    );
};
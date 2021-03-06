import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NewBoardModal from "../components/NewBoardModal";
import useToggle from "../hooks/useToggle";
import { Link } from "react-router-dom";
import axios from "axios";
import dashStyles from "./Dashboard.module.scss";
import { HiPlusSm } from 'react-icons/hi';
import { RiTrelloFill } from 'react-icons/ri';
import { BsStar } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';

export default function Dashboard() {
    const [modal, toggleModal] = useToggle(false);
    const [boardsList, setBoardsList] = useState([]);

    useEffect(() => {
        // If a user is not signed in (sessionStorage) redirect them to login
        const user = sessionStorage.getItem("user");
        if(!user) window.location.replace("/login");

        axios.get("/api/boards")
            .then(response => {
                setBoardsList(response.data.boardData);
            })

    }, [setBoardsList]);

    const createBoard = (boardInfo) => {
        axios.post("/api/boards", boardInfo)
            .then((response) => {
                setBoardsList([...boardsList, response.data]);
            })
    }

    return (
        <>
        <Navbar />
        <div className={dashStyles.dashboard}>
            <main className={dashStyles.dashMain}>
                <header>
                    <h1>Trellolo Boards</h1>
                    <p>Get started with a new board or continue working in an existing board.</p>
                    <button className={dashStyles.createBoardMainBtn} onClick={toggleModal}>Create Board</button>
                    <hr />
                </header>

                <section>
                    <h2><BsStar /> Starred Boards</h2>
                    <div className={dashStyles.dashboardBoards}>
                    {boardsList && boardsList.map(d => (
                        d.isStarred ?
                        <div key={d.id} style={{backgroundImage: `url(${d.bgImage})`}}>
                            <a href={`/board/${d.id}`} className={dashStyles.boardLink}>{d.name}</a>
                        </div>
                        : null
                    ))}
                    </div>
                </section>

                <section>
                    <h2><RiTrelloFill /> All Boards</h2>
                    <div className={dashStyles.dashboardBoards}>
                    {boardsList.map(d => (
                        <div key={d.id} style={{backgroundImage: `url(${d.bgImage})`}}>
                            <a href={`/board/${d.id}`} className={dashStyles.boardLink}>{d.name}</a>
                        </div>
                    ))}
                        <button onClick={toggleModal} className={dashStyles.createBoardBtn}><HiPlusSm /> Create Board</button>
                    </div>
                </section>
            </main>

            <aside className={dashStyles.sidebar}>
                <ul>
                    <div>
                        <li><Link to="/dashboard" className={dashStyles.sideLink}><RiTrelloFill className={dashStyles.icon} /> Boards</Link></li>
                        <li><button onClick={toggleModal}><HiPlusSm className={dashStyles.icon} /> Create Board</button></li>
                    </div>
                    <li><a href="/board-settings" className={dashStyles.sideLink}><IoSettingsSharp className={dashStyles.icon} /> Board Settings</a></li>
                </ul>
            </aside>

            {modal ? 
                <NewBoardModal
                    toggleModal={toggleModal}
                    createBoard={createBoard}
                />
                : null
            }
        </div>
        </>
    );
};
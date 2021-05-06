import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { ImTrello } from "react-icons/im";
import { BiLogIn } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import axios from "axios";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if(user) setIsLoggedIn(true);
        else setIsLoggedIn(false);
    }, []);

    const handleLogout = async () => {
        await axios.get("/api/logout");
        setIsLoggedIn(false);
        sessionStorage.clear();
        window.location.replace("/");
    }

    if(isLoggedIn) {
        return (
            <nav className={styles.navbar}>
                <NavLink exact to="/" className={`${styles.navLink} ${styles.brandName}`}><ImTrello /> <span className={styles.linkText}>Trellolo</span></NavLink>
                <ul>
                    <li>
                        <NavLink exact to="/dashboard" className={styles.navLink}><RiDashboardLine className={styles.icon} /> Dashboard</NavLink>
                    </li>
                    <li>
                        <button type="button" className={styles.logoutBtn} onClick={handleLogout}><FaSignOutAlt className={styles.icon} /> Log Out</button>
                    </li>
                </ul>
            </nav>
        );
    }
    else {
        return (
            <nav className={styles.navbar}>
                <NavLink exact to="/" className={`${styles.navLink} ${styles.brandName}`}><ImTrello /> <span className={styles.linkText}>Trellolo</span></NavLink>
                <ul>
                    <li>
                        <NavLink exact to="/login" activeClassName={styles.activeLink} className={styles.navLink}><BiLogIn className={styles.icon} /> Log In</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/signup" activeClassName={styles.activeLink} className={styles.navLink}><IoPersonAddOutline className={styles.icon} /> Sign Up</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
};
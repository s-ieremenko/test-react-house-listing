import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from '../Navbar/Navbar.module.css'
import logo from '../../images/img_logo_dtt@3x.png'

const Navbar = () => {
    return (
        <div className={styles.navBar}>
            <nav className={styles.navContainer}>
                <div className={styles.logoImg}>
                    <img src={logo} alt="dtt-logo" />
                </div>

                <NavLink
                    to="/houses"
                    className={({ isActive }) =>
                        isActive ? styles.linkActive : styles.link
                    }
                >
                    Houses
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? styles.linkActive : styles.link
                    }
                >
                    About
                </NavLink>
            </nav>
        </div>
    )
}

export default Navbar

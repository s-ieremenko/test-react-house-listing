import React from 'react'
import styles from '../Navbar/Navbar.module.css'
import logo from '../../images/img_logo_dtt@3x.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className={styles.navBar}>
            <nav className={styles.navContainer}>
                <div className={styles.logoImg}>
                    <img src={logo} alt="dtt-logo" />
                </div>
                <ul className={styles.navList}>
                    <li>
                        <Link to="/houses">Houses</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar

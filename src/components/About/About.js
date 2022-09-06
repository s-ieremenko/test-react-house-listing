import React from 'react'
import styles from '../HouseList/HouseList.module.css'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const About = () => {
    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <header>
                    <h1>About DTT Real Estate</h1>
                </header>
            </div>
        </div>
    )
}

export default About

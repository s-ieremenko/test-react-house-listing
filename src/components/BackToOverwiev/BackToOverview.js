import React from 'react'
import styles from './BackToOverview.module.css'
import { Link } from 'react-router-dom'

const BackToOverview = () => {
    return (
        <div>
            <p className={styles.backToArrow}>
                <Link to="/houses">Back to overview</Link>
            </p>
        </div>
    )
}

export default BackToOverview

import React from 'react'
import { Link } from 'react-router-dom'

import styles from './BackToOverview.module.css'

const BackToOverview = ({ type, id }) => {
    return (
        <div>
            <p className={styles.backToArrow}>
                {type === 'backToMainPage' ? (
                    <Link to="/houses">Back to overview</Link>
                ) : (
                    <Link to={`/houses/${id}`}>
                        Back to detailed page
                    </Link>
                )}
            </p>
        </div>
    )
}

export default BackToOverview

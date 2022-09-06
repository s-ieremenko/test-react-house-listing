import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styles from './EditButtons.module.css'
import editIcon from '../../images/ic_edit@3x.png'
import deleteIcon from '../../images/ic_delete@3x.png'

const EditButtons = ({ setIsModalOpen, id }) => {
    const handleDelete = () => {
        setIsModalOpen(true)
    }

    return (
        <div className={styles.editIconsContainer}>
            <p>
                <Link to={`/houses/update/${id}`}>
                    <img src={editIcon} alt="edit button" />
                </Link>
            </p>
            <p>
                <button
                    className={styles.editIcon}
                    onClick={handleDelete}
                >
                    <img src={deleteIcon} alt="delete button" />
                </button>
            </p>
        </div>
    )
}

export default EditButtons

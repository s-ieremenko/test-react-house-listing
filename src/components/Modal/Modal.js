import React, { useCallback, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import styles from './Modal.module.css'
import { useFetch } from '../../hooks/useFetching'
import HouseService from '../../API/Api'
import { useGlobalContext } from '../../context'

const Modal = ({ id, setIsModalOpen }) => {
    const url = 'https://api.intern.d-tt.nl/api/houses'
    const headers = {
        'X-Api-Key': process.env.REACT_APP_API_KEY,
    }
    const { fetchHouses, setHouses } = useGlobalContext()
    const [deleteHouse, isDeleteLoading, isDeleteError] = useFetch(
        async (id) => {
            return await HouseService.deleteHouse(
                id,
                url,
                headers,
                'DELETE'
            )
        }
    )
    let navigate = useNavigate()

    const handleDelete = useCallback(async () => {
        await deleteHouse(id)
        setIsModalOpen(false)
        navigate('/houses', { replace: true })
        const newHouses = await fetchHouses()
        setHouses(newHouses)
    }, [])

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <h1>Delete listing</h1>
                <p>Are you sure you want to delete listing?</p>
                <button
                    className={styles.deleteButton}
                    onClick={handleDelete}
                >
                    Yes, delete
                </button>
                <button
                    className={styles.goBackButton}
                    onClick={handleCancel}
                >
                    Go back
                </button>
            </div>
        </div>
    )
}

export default Modal

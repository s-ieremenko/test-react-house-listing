import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styles from './EditButtons.module.css'
import { useFetch } from '../../hooks/useFetching'
import HouseService from '../../API/Api'
import { useGlobalContext } from '../../context'

const EditButtons = ({ setIsModalOpen, id }) => {
    // const url = 'https://api.intern.d-tt.nl/api/houses'
    // const headers = {
    //     'X-Api-Key': process.env.REACT_APP_API_KEY,
    // }
    // const { fetchHouses, setHouses } = useGlobalContext()
    // const [deleteHouse, isDeleteLoading, isDeleteError] = useFetch(
    //     async (id) => {
    //         return await HouseService.deleteHouse(
    //             id,
    //             url,
    //             headers,
    //             'DELETE'
    //         )
    //     }
    // )
    //
    // const handleDelete = useCallback(async () => {
    //     await deleteHouse(id)
    //     const newHouses = await fetchHouses()
    //     setHouses(newHouses)
    // }, [])
    const handleDelete = () => {
        setIsModalOpen(true)
    }

    return (
        <div>
            <Link to={`/houses/update/${id}`}>Edit</Link>
            <button
                className={styles.deleteButton}
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}

export default EditButtons

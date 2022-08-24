import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetching'

const HousePage = () => {
    const { id } = useParams()

    // useEffect(() => {
    //     const newHouse = mainData.find((house) => house.id === +id)
    //     setHouse(newHouse)
    // }, [])
    return (
        <div>
            <Link to="/houses">back home</Link>
        </div>
    )
}

export default HousePage

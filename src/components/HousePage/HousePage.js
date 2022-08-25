import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../../context'

const HousePage = () => {
    const { houses } = useGlobalContext()
    const [house, setHouse] = useState()
    const { id } = useParams()

    useEffect(() => {
        const newHouse = houses.find((house) => house.id === +id)
        setHouse(newHouse)
    }, [])

    if (house) {
        return (
            <div>
                <p>{house.description}</p>
                <p>{house.image}</p>
                <p>{house.location.city}</p>
                <Link to="/houses">back home</Link>
            </div>
        )
    }
}

export default HousePage

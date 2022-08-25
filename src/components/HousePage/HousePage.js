import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../../context'
import styles from './HousePage.module.css'
import Navbar from '../Navbar/Navbar'
import House from '../House/House'

const HousePage = () => {
    const { houses } = useGlobalContext()
    const [house, setHouse] = useState()
    const { id } = useParams()

    useEffect(() => {
        const newHouse = houses.find((house) => house.id === +id)
        setHouse(newHouse)
    }, [])

    if (house) {
        const {
            constructionYear,
            createdAt,
            description,
            hasGarage,
            image,
            location: { street, city, zip },
            madeByMe,
            price,
            rooms: { bedrooms, bathrooms },
            size,
        } = house
        return (
            <>
                <Navbar />
                <div className={styles.container}>
                    {house ? (
                        <div className={styles.houseDetails}>
                            <House house={house} />
                            <p className={styles.backToArrow}>
                                <Link to="/houses">
                                    Back to overview
                                </Link>
                            </p>
                        </div>
                    ) : (
                        <div>...Loading</div>
                    )}
                </div>
            </>
        )
    }
    return <div>...Loading</div>

    // if (house) {
    //     return (
    //         <div>
    //             <p>{house.description}</p>
    //             <p>{house.image}</p>
    //             <p>{house.location.city}</p>
    //             <Link to="/houses">back home</Link>
    //         </div>
    //     )
    // }else {
    //     return <div>
    //         ...Loading
    //     </div>
    // }
}

export default HousePage

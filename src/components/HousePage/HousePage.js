import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../../context'
import styles from './HousePage.module.css'
import Navbar from '../Navbar/Navbar'
import House from '../House/House'
import BackToOverview from '../BackToOverwiev/BackToOverview'

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
        console.log(house)
        const formattedPrice = `${Number(price).toLocaleString(
            'es-ES'
        )}`
        return (
            <>
                <Navbar />
                <div className={styles.container}>
                    {house ? (
                        <div className={styles.houseDetails}>
                            <BackToOverview />
                            <input type="file" />
                            <div
                                className={
                                    styles.descriptionContainer
                                }
                            >
                                <img src={image} alt={street} />
                                <div
                                    className={
                                        styles.descriptionDetails
                                    }
                                >
                                    <p>{street}</p>
                                    <p className={styles.address}>
                                        {zip} {city}
                                    </p>
                                    <ul className={styles.facilities}>
                                        <li>{formattedPrice}</li>
                                        <li>{size} m2</li>
                                        <li>
                                            Built in{' '}
                                            {constructionYear}{' '}
                                        </li>
                                    </ul>
                                    <ul
                                        className={
                                            styles.moreFacilities
                                        }
                                    >
                                        <li>{bedrooms}</li>
                                        <li>{bathrooms} m2</li>
                                        <li>
                                            {hasGarage ? 'Yes' : 'No'}{' '}
                                        </li>
                                    </ul>
                                    <p
                                        className={
                                            styles.descriptionText
                                        }
                                    >
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>...Loading</div>
                    )}
                </div>
            </>
        )
    }
    return <div>...Loading</div>
}

export default HousePage
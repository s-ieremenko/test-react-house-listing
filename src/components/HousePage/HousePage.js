import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../../context'
import styles from './HousePage.module.css'
import Navbar from '../Navbar/Navbar'
import House from '../House/House'
import BackToOverview from '../BackToOverwiev/BackToOverview'
import EditButtons from '../EditButtons/EditButtons'
import Modal from '../Modal/Modal'

const HousePage = () => {
    const { houses } = useGlobalContext()
    const [house, setHouse] = useState()
    const { id } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const newHouse = houses.find((house) => house.id === +id)
        setHouse(newHouse)
    }, [])

    if (house) {
        const {
            constructionYear,
            description,
            hasGarage,
            image,
            location: { street, city, zip },
            madeByMe,
            price,
            rooms: { bedrooms, bathrooms },
            size,
        } = house
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
                                {madeByMe && (
                                    <EditButtons
                                        setIsModalOpen={
                                            setIsModalOpen
                                        }
                                        id={id}
                                    />
                                )}
                                {isModalOpen && (
                                    <Modal
                                        id={+id}
                                        setIsModalOpen={
                                            setIsModalOpen
                                        }
                                    />
                                )}
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

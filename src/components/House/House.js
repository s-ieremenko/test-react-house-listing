import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './House.module.css'
import NoImage from '../../images/no-image.jpg'
import EditButtons from '../EditButtons/EditButtons'
import Modal from '../Modal/Modal'

const House = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {
        house: {
            id,
            image,
            location: { street, city, zip },
            madeByMe,
            price,
            rooms: { bedrooms, bathrooms },
            size,
        },
    } = props

    const formattedPrice = `€ ${Number(price).toLocaleString(
        'es-ES'
    )}`

    return (
        <article className={styles.houseContainer}>
            <div className={styles.listingDetailsContainer}>
                <Link to={`/houses/${id}`}>
                    {image ? (
                        <img src={image} alt="house" />
                    ) : (
                        <img
                            className={styles.noImage}
                            src={NoImage}
                            alt="no-image"
                        />
                    )}
                </Link>
                <div className={styles.listingDetails}>
                    <Link to={`/houses/${id}`}>
                        <p className={styles.address}>{street}</p>
                    </Link>
                    <p className={styles.price}>{formattedPrice}</p>
                    <p className={styles.city}>
                        {zip} {city}
                    </p>
                    <ul className={styles.facilities}>
                        <li>{bedrooms}</li>
                        <li>{bathrooms}</li>
                        <li>{size} m2</li>
                    </ul>
                </div>
            </div>
            {madeByMe && (
                <EditButtons
                    setIsModalOpen={setIsModalOpen}
                    id={id}
                />
            )}
            {isModalOpen && (
                <Modal id={+id} setIsModalOpen={setIsModalOpen} />
            )}
        </article>
    )
}

export default House

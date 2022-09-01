import React, { useState } from 'react'
import styles from './House.module.css'
import { Link } from 'react-router-dom'
import NoImage from '../../images/no-image.jpg'
import EditButtons from '../EditButtons/EditButtons'
import Modal from '../Modal/Modal'

const House = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {
        house: {
            id,
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
        },
    } = props

    const formattedPrice = `€ ${Number(price).toLocaleString(
        'es-ES'
    )}`

    return (
        <article className={styles.houseContainer}>
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
            <div>
                <Link to={`/houses/${id}`}>
                    <p className={styles.address}>{street}</p>
                </Link>
                <p className={styles.price}>{formattedPrice}</p>
                <p>
                    {zip} {city}
                </p>
                <ul className={styles.facilities}>
                    <li>{bedrooms}</li>
                    <li>{bathrooms}</li>
                    <li>{size} m2</li>
                </ul>
                {madeByMe && (
                    <EditButtons
                        setIsModalOpen={setIsModalOpen}
                        id={id}
                    />
                )}
                {isModalOpen && (
                    <Modal id={+id} setIsModalOpen={setIsModalOpen} />
                )}
            </div>
        </article>
    )
}

export default House

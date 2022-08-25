import React from 'react'
import styles from './House.module.css'
import { Link } from 'react-router-dom'

const House = (props) => {
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
                <img src={image} alt="house" />
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
            </div>
        </article>
    )
}

export default House

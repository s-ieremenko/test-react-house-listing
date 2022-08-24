import React from 'react'
import styles from './House.module.css'

const House = (props) => {
    console.log(props)
    const {
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
    } = props

    const formattedPrice = `€ ${Number(price).toLocaleString(
        'es-ES'
    )}`

    return (
        <article className={styles.houseContainer}>
            <img src={image} alt="house" />
            <div>
                <p className={styles.address}>{street}</p>
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

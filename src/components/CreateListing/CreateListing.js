import React, { useState } from 'react'
import styles from './CreateListing.module.css'
import BackToOverview from '../BackToOverwiev/BackToOverview'
import Navbar from '../Navbar/Navbar'
import { useFetch } from '../../hooks/useFetching'
import HouseService from '../../API/Api'

const CreateListing = () => {
    const [listing, setListing] = useState({
        constructionYear: '',
        description: '',
        hasGarage: 'false',
        streetName: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        houseNumber: '',
        numberAddition: '',
        zip: '',
        city: '',
    })
    const [file, setFile] = useState('')
    const url = 'https://api.intern.d-tt.nl/api/houses'

    const body = JSON.stringify({
        ...listing,
        hasGarage: listing.hasGarage === 'true',
        constructionYear: listing.constructionYear.split('/')[2],
    })
    const headers = {
        'X-Api-Key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
    }

    const [createHouse, isCreateLoading, isCreateError] = useFetch(
        async () => {
            return await HouseService.createHouse(
                url,
                headers,
                body,
                'POST'
            )
        }
    )

    const {
        constructionYear,
        description,
        streetName,
        price,
        bedrooms,
        bathrooms,
        size,
        houseNumber,
        numberAddition,
        zip,
        city,
    } = listing

    // const validListing = Object.values(listing).every(
    //     (item) => !!item
    // )

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setListing({ ...listing, [name]: value })
    }
    const handleUpload = (e) => {
        e.preventDefault()
        const file = e.target.files[0]

        setFile(file)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            // let res = await fetch(
            //     'https://api.intern.d-tt.nl/api/houses',
            //     {
            //         method: 'POST',
            //         body: JSON.stringify({
            //             ...listing,
            //             hasGarage: listing.hasGarage === 'true',
            //             constructionYear:
            //                 listing.constructionYear.split('/')[2],
            //         }),
            //         headers: {
            //             'X-Api-Key': process.env.REACT_APP_API_KEY,
            //             'Content-Type': 'application/json',
            //         },
            //     }
            // )
            // let resJson = await res.json()
            const newHouse = await createHouse()

            const formData = new FormData()
            formData.append('image', file, file.name)

            await fetch(
                `https://api.intern.d-tt.nl/api/houses/${newHouse.id}/upload`,
                {
                    method: 'POST',
                    body: formData,

                    headers: {
                        'X-Api-Key': process.env.REACT_APP_API_KEY,
                    },
                }
            )
        } catch (e) {
            console.log('error')
        }
        setListing({
            constructionYear: '',
            description: '',
            hasGarage: 'false',
            streetName: '',
            price: '',
            bedrooms: '',
            bathrooms: '',
            size: '',
            houseNumber: '',
            numberAddition: '',
            zip: '',
            city: '',
        })
    }

    return (
        <div className={styles.containerFluid}>
            <Navbar />
            <div className={styles.container}>
                {/*<Navbar />*/}
                <BackToOverview />
                <form
                    className={styles.createForm}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.formControl}>
                        <label htmlFor="streetName">
                            Street name
                        </label>
                        <input
                            type="text"
                            id="streetName"
                            name="streetName"
                            value={streetName}
                            onChange={handleChange}
                        />
                        <div>
                            <label htmlFor="houseNumber">
                                House number
                            </label>
                            <input
                                aria-required
                                type="text"
                                id="houseNumber"
                                name="houseNumber"
                                value={houseNumber}
                                onChange={handleChange}
                            />
                            <label htmlFor="numberAddition">
                                Additional(optional)
                            </label>
                            <input
                                type="text"
                                id="numberAddition"
                                name="numberAddition"
                                value={numberAddition}
                                onChange={handleChange}
                            />
                        </div>
                        <label htmlFor="zip">Post code</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={zip}
                            onChange={handleChange}
                        />
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            onChange={handleChange}
                        />
                        *
                        <label htmlFor="upload">Upload picture</label>
                        <input
                            type="file"
                            onChange={handleUpload}
                            id="upload"
                            name="image"
                        />
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={price}
                            onChange={handleChange}
                        />
                        <label htmlFor="size">Size</label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            value={size}
                            onChange={handleChange}
                        />
                        <label htmlFor="hasGarage">Garage</label>
                        <select
                            name="hasGarage"
                            id="hasGarage"
                            value={listing.hasGarage}
                            onChange={handleChange}
                        >
                            <option value="true">yes</option>
                            <option value="false">no</option>
                        </select>
                        <label htmlFor="bedrooms">Bedrooms</label>
                        <input
                            type="text"
                            id="bedrooms"
                            name="bedrooms"
                            value={bedrooms}
                            onChange={handleChange}
                        />
                        <label htmlFor="bathrooms">Bathrooms</label>
                        <input
                            type="text"
                            id="bathrooms"
                            name="bathrooms"
                            value={bathrooms}
                            onChange={handleChange}
                        />
                        <label htmlFor="constructionYear">
                            Construction date
                        </label>
                        <input
                            type="text"
                            id="constructionYear"
                            name="constructionYear"
                            value={constructionYear}
                            onChange={handleChange}
                        />
                        <label htmlFor="description">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={handleChange}
                        />
                    </div>
                    <button type={styles.createButton}>create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateListing

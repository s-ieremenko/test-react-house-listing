import React, { useState } from 'react'
import styles from './CreateListing.module.css'
import BackToOverview from '../BackToOverwiev/BackToOverview'
import Navbar from '../Navbar/Navbar'
import { useFetch } from '../../hooks/useFetching'
import HouseService from '../../API/Api'
import validation from '../../utils/validation'

const initialListing = () => ({
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

const CreateListing = () => {
    const [listing, setListing] = useState(initialListing())
    const [file, setFile] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
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

    const [uploadPicture, isUploadLoading, isUploadError] = useFetch(
        async (id) => {
            await HouseService.uploadImage(
                id,
                url,
                { 'X-Api-Key': process.env.REACT_APP_API_KEY },
                body,
                'POST',
                file
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

    const { numberAddition: optional, ...rest } = listing

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
            setValidationErrors(validation(rest))
            if (!Object.keys(validationErrors).length) {
                const newHouse = await createHouse()

                await uploadPicture(newHouse.id)
            }
        } catch (e) {
            console.log('error')
        }
    }

    return (
        <div className={styles.containerFluid}>
            <Navbar />
            <div className={styles.container}>
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
                        {validationErrors.streetName && (
                            <p className={styles.error}>
                                {validationErrors.streetName}
                            </p>
                        )}
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
                            {validationErrors.houseNumber && (
                                <p className={styles.error}>
                                    {validationErrors.houseNumber}
                                </p>
                            )}
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
                        {validationErrors.zip && (
                            <p className={styles.error}>
                                {validationErrors.zip}
                            </p>
                        )}
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            onChange={handleChange}
                        />
                        {validationErrors.city && (
                            <p className={styles.error}>
                                {validationErrors.city}
                            </p>
                        )}
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
                        {validationErrors.price && (
                            <p className={styles.error}>
                                {validationErrors.price}
                            </p>
                        )}
                        <label htmlFor="size">Size</label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            value={size}
                            onChange={handleChange}
                        />
                        {validationErrors.size && (
                            <p className={styles.error}>
                                {validationErrors.size}
                            </p>
                        )}
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
                            className={
                                validationErrors.bedrooms
                                    ? styles.errorInput
                                    : styles.inputField
                            }
                            type="text"
                            id="bedrooms"
                            name="bedrooms"
                            value={bedrooms}
                            onChange={handleChange}
                        />
                        {validationErrors.bedrooms && (
                            <p className={styles.error}>
                                {validationErrors.bedrooms}
                            </p>
                        )}
                        <label htmlFor="bathrooms">Bathrooms</label>
                        <input
                            type="text"
                            id="bathrooms"
                            name="bathrooms"
                            value={bathrooms}
                            onChange={handleChange}
                        />
                        {validationErrors.bathrooms && (
                            <p className={styles.error}>
                                {validationErrors.bathrooms}
                            </p>
                        )}
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
                        {validationErrors.constructionYear && (
                            <p className={styles.error}>
                                {validationErrors.constructionYear}
                            </p>
                        )}
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
                        {validationErrors.description && (
                            <p className={styles.error}>
                                {validationErrors.description}
                            </p>
                        )}
                    </div>
                    <button
                        type={styles.createButton}
                        disabled={isCreateLoading || isUploadLoading}
                    >
                        create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateListing

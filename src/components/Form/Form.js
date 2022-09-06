import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import validation from '../../utils/validation'
import styles from './Form.module.css'

const Form = ({
    listing,
    setListing,
    handleCreate,
    handleEdit,
    type,
    setFile,
    file,
}) => {
    const [validationErrors, setValidationErrors] = useState({})
    const navigate = useNavigate()
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

    const { numberAddition: optional, image, ...rest } = listing

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        setListing({ ...listing, [name]: value })
    }

    const modifyInput = (e) => {
        if (e.target.value.length === 2)
            e.target.value = e.target.value + '/'
        else if (
            e.target.value.length === 5 &&
            parseInt(e.target.value.substr(3)) <= 12
        ) {
            e.target.value = e.target.value + '/'
        }
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
            if (!Object.keys(validation(rest)).length) {
                if (type === 'create') {
                    handleCreate()
                    navigate('/houses', { replace: true })
                } else if (type === 'edit') {
                    handleEdit()
                    navigate('/houses', { replace: true })
                } else {
                    console.log('validation error')
                }
            }
        } catch (e) {
            console.log('error')
        }
    }

    return (
        <div className={styles.formWrapper}>
            <form
                className={styles.formControl}
                onSubmit={handleSubmit}
            >
                <div className={styles.streetName}>
                    <label htmlFor="streetName">Street name*</label>
                    <input
                        className={
                            validationErrors.streetName
                                ? styles.errorInput
                                : styles.formControl
                        }
                        type="text"
                        id="streetName"
                        name="streetName"
                        value={streetName}
                        onChange={handleChange}
                        placeholder="Enter the street name"
                    />
                    {validationErrors.streetName && (
                        <p className={styles.error}>
                            {validationErrors.streetName}
                        </p>
                    )}
                </div>
                <div className={styles.houseNumberField}>
                    <div className={styles.houseNumber}>
                        <label htmlFor="houseNumber">
                            House number*
                        </label>
                        <input
                            className={
                                validationErrors.houseNumber
                                    ? styles.errorInput
                                    : styles.formControl
                            }
                            type="text"
                            id="houseNumber"
                            name="houseNumber"
                            value={houseNumber}
                            onChange={handleChange}
                            placeholder="Enter house number"
                        />
                        {validationErrors.houseNumber && (
                            <p className={styles.error}>
                                {validationErrors.houseNumber}
                            </p>
                        )}
                    </div>
                    <div className={styles.numberAddition}>
                        <label htmlFor="numberAddition">
                            Additional(optional)
                        </label>
                        <input
                            type="text"
                            id="numberAddition"
                            name="numberAddition"
                            value={numberAddition}
                            onChange={handleChange}
                            placeholder="e.g.A"
                        />
                    </div>
                </div>
                <div className={styles.zip}>
                    <label htmlFor="zip">Post code*</label>
                    <input
                        className={
                            validationErrors.zip
                                ? styles.errorInput
                                : styles.formControl
                        }
                        type="text"
                        id="zip"
                        name="zip"
                        value={zip}
                        onChange={handleChange}
                        placeholder="e.g.1000 AA"
                    />
                    {validationErrors.zip && (
                        <p className={styles.error}>
                            {validationErrors.zip}
                        </p>
                    )}
                </div>
                <div className={styles.city}>
                    <label htmlFor="city">City*</label>
                    <input
                        className={
                            validationErrors.city
                                ? styles.errorInput
                                : styles.formControl
                        }
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={handleChange}
                        placeholder="e.g. Utrecht"
                    />
                    {validationErrors.city && (
                        <p className={styles.error}>
                            {validationErrors.city}
                        </p>
                    )}
                </div>
                <div className={styles.uploadContainer}>
                    <label
                        htmlFor="upload"
                        className={styles.uploadLabel}
                    >
                        Upload picture (PNG or JPG)
                    </label>
                    <div className={styles.upload}>
                        <input
                            type="file"
                            onChange={handleUpload}
                            id="upload"
                            name="file"
                        />
                    </div>
                </div>
                <div className={styles.price}>
                    <label htmlFor="price">Price*</label>
                    <input
                        className={
                            validationErrors.price
                                ? styles.errorInput
                                : styles.formControl
                        }
                        type="text"
                        id="price"
                        name="price"
                        value={price}
                        onChange={handleChange}
                        placeholder="e.g.€150.000"
                    />
                    {validationErrors.price && (
                        <p className={styles.error}>
                            {validationErrors.price}
                        </p>
                    )}
                </div>
                <div className={styles.sizeField}>
                    <div className={styles.size}>
                        <label htmlFor="size">Size*</label>
                        <input
                            className={
                                validationErrors.size
                                    ? styles.errorInput
                                    : styles.formControl
                            }
                            type="text"
                            id="size"
                            name="size"
                            value={size}
                            onChange={handleChange}
                            placeholder="e.g.60m2"
                        />
                        {validationErrors.size && (
                            <p className={styles.error}>
                                {validationErrors.size}
                            </p>
                        )}
                    </div>
                    <div className={styles.hasGarage}>
                        <label htmlFor="hasGarage">Garage*</label>

                        <select
                            name="hasGarage"
                            id="hasGarage"
                            value={listing.hasGarage}
                            onChange={handleChange}
                        >
                            <option value="true">yes</option>
                            <option value="false">no</option>
                        </select>
                    </div>
                </div>
                <div className={styles.bedroomsField}>
                    <div className={styles.bedrooms}>
                        <label htmlFor="bedrooms">Bedrooms*</label>
                        <input
                            className={
                                validationErrors.bedrooms
                                    ? styles.errorInput
                                    : styles.formControl
                            }
                            type="text"
                            id="bedrooms"
                            name="bedrooms"
                            value={bedrooms}
                            onChange={handleChange}
                            placeholder="Enter amount"
                        />
                        {validationErrors.bedrooms && (
                            <p className={styles.error}>
                                {validationErrors.bedrooms}
                            </p>
                        )}
                    </div>
                    <div className={styles.bathrooms}>
                        <label htmlFor="bathrooms">Bathrooms*</label>
                        <input
                            className={
                                validationErrors.bathrooms
                                    ? styles.errorInput
                                    : styles.formControl
                            }
                            type="text"
                            id="bathrooms"
                            name="bathrooms"
                            value={bathrooms}
                            onChange={handleChange}
                            placeholder="Enter amount"
                        />
                        {validationErrors.bathrooms && (
                            <p className={styles.error}>
                                {validationErrors.bathrooms}
                            </p>
                        )}
                    </div>
                </div>
                <div className={styles.constructionYear}>
                    <label htmlFor="constructionYear">
                        Construction date*
                    </label>
                    <input
                        className={
                            validationErrors.constructionYear
                                ? styles.errorInput
                                : styles.formControl
                        }
                        type="text"
                        id="constructionYear"
                        name="constructionYear"
                        value={constructionYear}
                        onChange={handleChange}
                        onKeyUp={modifyInput}
                        placeholder="e.g.1990"
                    />
                    {validationErrors.constructionYear && (
                        <p className={styles.error}>
                            {validationErrors.constructionYear}
                        </p>
                    )}
                </div>
                <div className={styles.description}>
                    <label htmlFor="description">Description*</label>
                    <input
                        className={
                            validationErrors.description
                                ? styles.errorInput
                                : styles.formControl
                        }
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        placeholder="Enter description"
                    />
                    {validationErrors.description && (
                        <p className={styles.error}>
                            {validationErrors.description}
                        </p>
                    )}
                </div>
                <div className={styles.formButton}>
                    {type === 'create' ? (
                        <button className={styles.createButton}>
                            POST
                        </button>
                    ) : (
                        <button className={styles.createButton}>
                            SAVE
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Form

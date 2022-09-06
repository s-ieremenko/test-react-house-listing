import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './CreateListing.module.css'
import BackToOverview from '../BackToOverwiev/BackToOverview'
import Navbar from '../Navbar/Navbar'
import { useFetch } from '../../hooks/useFetching'
import HouseService from '../../API/Api'
import Form from '../Form/Form'
import { url } from '../../constans'

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
    const navigate = useNavigate()

    const body = JSON.stringify({
        ...listing,
        hasGarage: listing.hasGarage === 'true',
        constructionYear: new Date(
            listing.constructionYear
        ).getFullYear(),
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
                'POST',
                file
            )
        }
    )

    const handleCreate = async () => {
        const newHouse = await createHouse()
        await uploadPicture(newHouse.id)
        navigate(0)
    }

    return (
        <div className={styles.containerFluid}>
            <Navbar />
            <div className={styles.container}>
                <BackToOverview
                    type="backToMainPage"
                    id={listing.id}
                />
                <header>
                    <h1>Create new listing</h1>
                </header>

                <Form
                    handleCreate={handleCreate}
                    listing={listing}
                    setListing={setListing}
                    type="create"
                    setFile={setFile}
                    isLoading={isUploadLoading}
                />
            </div>
        </div>
    )
}

export default CreateListing

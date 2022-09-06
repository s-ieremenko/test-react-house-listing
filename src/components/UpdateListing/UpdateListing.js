import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Form from '../Form/Form'
import { useGlobalContext } from '../../context'
import { useFetch } from '../../hooks/useFetching'
import HouseService from '../../API/Api'
import styles from '../CreateListing/CreateListing.module.css'
import Navbar from '../Navbar/Navbar'
import BackToOverview from '../BackToOverwiev/BackToOverview'
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
const UpdateListing = () => {
    const [listing, setListing] = useState(initialListing())
    const [file, setFile] = useState('')
    const { id } = useParams()
    const { houses } = useGlobalContext()
    const navigate = useNavigate()
    const url = 'https://api.intern.d-tt.nl/api/houses'

    const headers = {
        'X-Api-Key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
    }

    const [editListing, isEditLoading, isEditError] = useFetch(
        async (id) => {
            const body = JSON.stringify({
                ...listing,
                hasGarage: listing.hasGarage === 'true',
                constructionYear: new Date(
                    listing.constructionYear
                ).getFullYear(),
            })
            return await HouseService.editHouse(
                id,
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

    useEffect(() => {
        const currentHouse = houses.find((house) => house.id === +id)
        const {
            location: { street },
        } = currentHouse

        const lastStreetSymbol = street.slice(-1)

        const streetName = street.split(' ')[0]
        const houseNumber = parseInt(street.split(' ')[1])

        const adaptedHouse = {
            ...currentHouse.location,
            streetName,
            houseNumber,
            ...currentHouse.rooms,
            numberAddition: !+lastStreetSymbol
                ? lastStreetSymbol
                : '',
            constructionYear: currentHouse.constructionYear,
        }
        setListing({
            ...currentHouse,
            ...adaptedHouse,
        })
    }, [])

    const handleEdit = async () => {
        await editListing(listing.id)
        await uploadPicture(listing.id)
        navigate(0)
    }

    return (
        <div className={styles.containerFluid}>
            <Navbar />
            <div className={styles.container}>
                <BackToOverview type="backToDetailedPage" id={+id} />
                <header>
                    <h1>Edit listing</h1>
                </header>

                <Form
                    handleEdit={handleEdit}
                    listing={listing}
                    setListing={setListing}
                    type="edit"
                    setFile={setFile}
                />
            </div>
        </div>
    )
}

export default UpdateListing

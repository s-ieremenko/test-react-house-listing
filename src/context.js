import React, { useContext, useEffect, useState } from 'react'
import { useFetch } from './hooks/useFetching'
import HouseService from './API/Api'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [houses, setHouses] = useState([])
    const url = `https://api.intern.d-tt.nl/api/houses`
    // const urlForCreate = 'https://api.intern.d-tt.nl/api/houses'
    const headers = {
        'X-Api-Key': process.env.REACT_APP_API_KEY,
        // 'Content-Type': 'application/json',
    }
    const [fetchHouses, isListingLoading, isError] = useFetch(
        async () => {
            const houses = await HouseService.getAll(url, headers)
            setHouses(houses)
        }
    )
    useEffect(() => {
        fetchHouses()
    }, [])

    // const [fetchHouses, isLoading, error, houses] = useFetch(
    //     url,
    //     headers
    // )

    return (
        <AppContext.Provider
            value={{
                houses,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext }

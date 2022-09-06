import React, { useContext, useEffect, useState } from 'react'
import { useFetch } from './hooks/useFetching'
import HouseService from './API/Api'
import { url } from './constans'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [houses, setHouses] = useState([])
    const headers = {
        'X-Api-Key': process.env.REACT_APP_API_KEY,
    }
    const [fetchHouses, isListingLoading, isError] = useFetch(
        async () => {
            const houses = await HouseService.getAll(url, headers)
            setHouses(houses)
            return houses
        }
    )
    useEffect(() => {
        fetchHouses()
    }, [])

    return (
        <AppContext.Provider
            value={{
                houses,
                fetchHouses,
                setHouses,
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

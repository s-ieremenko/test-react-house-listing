import React, { useContext, useEffect } from 'react'
import { useFetch } from './hooks/useFetching'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const url = `https://api.intern.d-tt.nl/api/houses`
    const headers = {
        'X-Api-Key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
    }
    const [fetchHouses, isLoading, error, houses] = useFetch(
        url,
        headers
    )

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

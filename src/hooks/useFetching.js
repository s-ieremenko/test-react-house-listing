import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url, headers) => {
    const [houses, setHouses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const getHouses = useCallback(async () => {
        try {
            const response = await fetch(url, { headers })
            const houses = await response.json()
            setHouses(houses)
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }, [url])

    useEffect(() => {
        getHouses()
    }, [getHouses])
    return [getHouses, isLoading, error, houses]
}

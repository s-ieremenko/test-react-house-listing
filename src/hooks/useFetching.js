import { useState, useEffect, useCallback } from 'react'

export const useFetch = (callback) => {
    // const [houses, setHouses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = useCallback(async () => {
        try {
            // const response = await fetch(url, { headers })
            // const houses = await response.json()
            // setHouses(houses)
            setIsLoading(true)
            return await callback()
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }, [callback])
    //
    // useEffect(() => {
    //     getHouses()
    // }, [getHouses])
    // return [getHouses, isLoading, error, houses]

    return [fetching, isLoading, error]
}

import { useState, useEffect, useCallback } from 'react'

export const useFetch = (callback) => {
    // const [houses, setHouses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = useCallback(
        async (id) => {
            try {
                setIsLoading(true)
                return await callback(id)
            } catch (e) {
                setError(e.message)
            } finally {
                setIsLoading(false)
            }
        },
        [callback]
    )
    //
    // useEffect(() => {
    //     getHouses()
    // }, [getHouses])
    // return [getHouses, isLoading, error, houses]

    return [fetching, isLoading, error]
}

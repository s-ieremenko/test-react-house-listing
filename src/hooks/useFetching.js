import { useState, useCallback } from 'react'

export const useFetch = (callback) => {
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

    return [fetching, isLoading, error]
}

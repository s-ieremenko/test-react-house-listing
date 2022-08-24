import { useMemo } from 'react'

export const useSortedList = (houses, sortField, sortType) => {
    const sortedList = useMemo(() => {
        if (sortType === 'none') {
            return houses
        }
        return [...houses].sort((a, b) => {
            return sortType === 'desc'
                ? b[sortField] - a[sortField]
                : a[sortField] - b[sortField]
        })
        // return sortedList
    }, [sortField, sortType, houses])
}

export const useHouses = (houses, sortField, sortType, query) => {
    const sortedList = useSortedList(houses, sortField, sortType)

    const sortedAndSearchedHouses = useMemo(() => {
        return sortedList.filter((house) =>
            house.location.city
                .toLowerCase()
                .includes(query.toLowerCase())
        )
    }, [query, sortedList])

    return sortedAndSearchedHouses
}

import React, { useState, useMemo } from 'react'
import styles from './HouseList.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { useFetch } from '../../hooks/useFetching'
import House from '../House/House'
import emptyHouses from '../../images/img_empty_houses@3x.png'

const HouseList = () => {
    const url = `https://api.intern.d-tt.nl/api/houses`
    const headers = {
        'X-Api-Key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
    }
    const [fetchHouses, isLoading, error, houses] = useFetch(
        url,
        headers
    )
    const [searchQuery, setSearchQuery] = useState('')
    const [sortField, setSortField] = useState('')
    const [sortType, setSortType] = useState('none')

    const sortList = (value) => {
        if (sortType === 'none') {
            return houses
        }
        const sortedList = [...houses].sort((a, b) => {
            return sortType === 'desc'
                ? b[value] - a[value]
                : a[value] - b[value]
        })

        console.log('sortedList', sortedList)
        return sortedList
    }
    const sortedHouses = useMemo(
        () => sortList(sortField),
        [houses, sortType]
    )

    const sortedAndFilteredHouses = useMemo(() => {
        if (searchQuery) {
            return sortedHouses.filter((house) => {
                console.log('loc city', house.location.street)
                return (
                    house.location.street
                        .toLowerCase()
                        .includes(searchQuery) ||
                    house.location.city
                        .toLowerCase()
                        .includes(searchQuery)
                )
            })
        } else {
            return sortedHouses
        }
    }, [searchQuery, sortedHouses])

    const handleOnClick = (value) => {
        if (sortType === 'none') {
            setSortType('asc')
        } else {
            setSortType((prevState) => {
                return prevState === 'asc' ? 'desc' : 'asc'
            })
        }
        setSortField(value)
    }

    console.log(sortedHouses)

    return (
        <main>
            <div className={styles.container}>
                <header>
                    <h2>Houses</h2>
                    <button>create new</button>
                </header>
                {/*<SearchBar />*/}
                <input
                    type="search"
                    placeholder="search for a house"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => handleOnClick('price')}>
                    price
                </button>
                <button onClick={() => handleOnClick('size')}>
                    size
                </button>
                <section>
                    {sortedAndFilteredHouses.length ? (
                        sortedAndFilteredHouses.map((house) => {
                            return <House key={house.id} {...house} />
                        })
                    ) : (
                        <div className={styles.noResults}>
                            <img
                                src={emptyHouses}
                                alt="empty houses"
                            />
                            <div className={styles.noResultsText}>
                                <p>No results found</p>
                                <p>Please try another keyword</p>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default HouseList

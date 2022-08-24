import React, { useState, useMemo, useContext } from 'react'
import styles from './HouseList.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { useFetch } from '../../hooks/useFetching'
import House from '../House/House'
import emptyHouses from '../../images/img_empty_houses@3x.png'
import { ReactComponent as DescOrder } from '../../images/sort-desc.svg'
import { ReactComponent as AscOrder } from '../../images/sort-asc.svg'

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
    const [sortField, setSortField] = useState('price')
    const [sortType, setSortType] = useState('asc')

    const sortList = (value) => {
        const sortedList = [...houses].sort((a, b) => {
            return sortType === 'desc'
                ? b[value] - a[value]
                : a[value] - b[value]
        })

        return sortedList
    }
    const sortedHouses = useMemo(() => {
        console.log('useMemo')
        return sortList(sortField)
    }, [houses, sortType, sortField])

    const sortedAndFilteredHouses = useMemo(() => {
        if (searchQuery) {
            return sortedHouses.filter((house) => {
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
        setSortType((prevState) => {
            return prevState === 'asc' ? 'desc' : 'asc'
        })
        setSortField(value)
    }

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
                <button
                    className={styles.ascOrder}
                    onClick={() => handleOnClick('price')}
                >
                    <span>price</span>{' '}
                    {sortType === 'asc' && sortField === 'price' ? (
                        <AscOrder />
                    ) : (
                        <DescOrder />
                    )}
                </button>

                <button
                    className={styles.ascOrder}
                    onClick={() => handleOnClick('size')}
                >
                    <span>size</span>{' '}
                    {sortType === 'asc' && sortField === 'size' ? (
                        <AscOrder />
                    ) : (
                        <DescOrder />
                    )}
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

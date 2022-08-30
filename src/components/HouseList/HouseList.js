import React, { useState, useMemo, useContext } from 'react'
import styles from './HouseList.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { useFetch } from '../../hooks/useFetching'
import House from '../House/House'
import emptyHouses from '../../images/img_empty_houses@3x.png'
import { ReactComponent as DescOrder } from '../../images/sort-desc.svg'
import { ReactComponent as AscOrder } from '../../images/sort-asc.svg'
import { useGlobalContext } from '../../context'
import { Link } from 'react-router-dom'

const HouseList = () => {
    // const url = `https://api.intern.d-tt.nl/api/houses`
    // const headers = {
    //     'X-Api-Key': process.env.REACT_APP_API_KEY,
    //     'Content-Type': 'application/json',
    // }
    // const [fetchHouses, isLoading, error, houses] = useFetch(
    //     url,
    //     headers
    // )
    const { houses } = useGlobalContext()
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
        return sortList(sortField)
    }, [houses, sortType, sortField])

    const sortedAndFilteredHouses = useMemo(() => {
        if (searchQuery) {
            const fields = ['city', 'street']
            return sortedHouses.filter((house) => {
                for (let i = 0; i < fields.length; i++) {
                    if (
                        house.location[fields[i]]
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                    ) {
                        return true
                    }
                }
                return false
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
    console.log(sortedAndFilteredHouses)

    return (
        <main>
            <div className={styles.container}>
                <header>
                    <h2>Houses</h2>
                    <Link to="/houses/create">Create new</Link>
                </header>
                {/*<SearchBar />*/}
                <form>
                    <input
                        type="text"
                        placeholder="search for a house"
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    />
                    <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                    >
                        &times;
                    </button>
                </form>

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
                    {searchQuery &&
                        !!sortedAndFilteredHouses.length && (
                            <p className={styles.resultsAmount}>
                                {sortedAndFilteredHouses.length}{' '}
                                results found
                            </p>
                        )}
                    {sortedAndFilteredHouses.length ? (
                        sortedAndFilteredHouses.map((house) => {
                            return (
                                <House key={house.id} house={house} />
                            )
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

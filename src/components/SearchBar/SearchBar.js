import React, { useState } from 'react'
import styles from './SearchBar.module.css'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <form className={styles.searchForm}>
            <input
                type="text"
                placeholder="search for a house"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" onClick={() => setSearchQuery('')}>
                &times;
            </button>
        </form>
    )
}

export default SearchBar

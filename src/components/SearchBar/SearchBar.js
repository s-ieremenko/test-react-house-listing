import React, { useState } from 'react'
import styles from './SearchBar.module.css'

const SearchBar = () => {
    return (
        <div className={styles.searchInput}>
            <input type="search" placeholder="search for a house" />
            <button>price</button>
            <button>size</button>
        </div>
    )
}

export default SearchBar

import React, { useState } from 'react'

import { useAsyncDebounce } from 'react-table';

import './global-filter.styles.css'

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    }) => {

    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)

    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span className='search-container'>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
        )
    };

export default GlobalFilter
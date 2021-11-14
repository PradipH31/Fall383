/* eslint-disable no-undef */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCategories } from '../../core/apiCore'
import CheckBox from '../../feature/CheckBox'

const MenuList = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [] }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(error)
            } else {
                setCategories(data)
            }
        })
    }
    useEffect(() => {
        init()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleFilters = (filters, filterBy) => {
        console.log("CATEGORY", filters, filterBy);
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters)
    }

    return (
        <div className="row">
            <div className="col-4">
                <h5>Category</h5>
                <ul>
                    <CheckBox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                </ul>
            </div>
            <div className="col-4">
                Right sidebar
            </div>
        </div>
    )
}

export default MenuList

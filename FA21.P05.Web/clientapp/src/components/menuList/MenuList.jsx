/* eslint-disable no-undef */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCategories } from '../../core/apiCore'
import CheckBox from '../../feature/CheckBox'
import { getMenuItems } from '../actions/menuitems'
import ItemCards from '../ItemCards/ItemCards'
import { BsArrowDownSquareFill } from "react-icons/bs"
import DownloadApp from '../downloadapp/Downloadapp'

const MenuList = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [] }
    })

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(6);
    const [error, setError] = useState("")
    const init = () => {
        return getCategories().then(data => {
            if (data.error) {
                setError(error)
            } else {
                setCategories(data)
                console.log(data)
            }
        })
    }
    const listItems = () => {
        return getMenuItems().then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setItems(data);
                console.log(data);
            }
        });
    }
    useEffect(() => {
        init()
        listItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleFilters = (filters, filterBy) => {
        console.log("CATEGORY", filters, filterBy);
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters)
    }

    const loadMoreButton = () => {
        return <>{
            limit < items.length ? <button className="btn btn-primary mt-2 mb-2" onClick={() => setLimit(limit + 2)}>
                Load More &nbsp; <BsArrowDownSquareFill fill="white" />
            </button> : <></>
        }</>
    }

    return (
        <div className="menu_container">
            <div className="d-none d-sm-block d-md-none">
                <DownloadApp />
            </div>
            <div className="d-sm-none d-md-block">
                <div className="row">
                    <div className="col-3">
                        <h5>Category</h5>
                        <ul>
                            <CheckBox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                        </ul>
                    </div>
                    <div className="col-8">
                        <h3 className="mb-4">All Menu </h3>
                        <div className="row">
                            {
                                items.slice(0, limit ? limit : items.length).map((item, index) => (
                                    <div key={index} className="col-4 mb-3">
                                        <ItemCards items={item} />
                                    </div>
                                ))
                            }
                        </div>
                        <hr />
                        {loadMoreButton()}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default MenuList

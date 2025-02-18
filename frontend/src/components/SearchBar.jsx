import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const { search, setSearch, showSearch, clearSearchBar, productSearch } = useContext(ShopContext)
    const location = useLocation()

    useEffect(() => {
        productSearch()
    }, [location])

    return (
        <div className={`hidden md:block`}>
            {showSearch ? (
            <div className='border-t border-b bg-gray-50 text-center'>
                <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm md:w-96 w-56' type="text" placeholder='Search' />
                    <img src={assets.search_icon} alt="search_icon" className='w-4' />
                </div>
                <img onClick={() => clearSearchBar()} src={assets.cross_icon} alt="cross_icon" className='inline w-3 cursor-pointer' />
            </div>
            ) : null}
        </div>
    )
}

export default SearchBar
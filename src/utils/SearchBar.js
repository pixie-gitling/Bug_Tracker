import { useState } from 'react'

const SearchBar = ({setSearchTerm}) => {

    const [search,setSearch] = useState()

    const handleChange = (e) => {
        setSearch(e.target.value); 
        setSearchTerm(e.target.value); 
    }
    

    return(
        <div className="search-bar">
                <div className="flex">
                    <input className='search' type="text" placeholder="Search..." value={search} onChange={handleChange}/>
                </div>
        </div>
    )
}

export default SearchBar
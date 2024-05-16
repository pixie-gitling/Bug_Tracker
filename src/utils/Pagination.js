import React from 'react';
import './Pagination.css';

const Pagination = ({ reportsPerPage, totalReports, paginate, currentPage }) => {
    const pageNumbers = [];

    // Calculate the total number of pages
    for (let i = 1; i <= Math.ceil(totalReports / reportsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pages'>
            <ul className='pagination flex'>
                {pageNumbers.map(number => (
                    <li key={number} className={`${currentPage === number ? 'current' : 'page-item'}`}>
                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
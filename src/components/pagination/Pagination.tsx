import React, { useState } from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPages = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        className={`${styles.pageBtn} ${currentPage === i ? styles.active : ''}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            pages.push(
                <button
                    key={1}
                    className={`${styles.pageBtn} ${currentPage === 1 ? styles.active : ''}`}
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
            );

            if (currentPage > 3) pages.push(<span key="start-ellipsis">...</span>);

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        key={i}
                        className={`${styles.pageBtn} ${currentPage === i ? styles.active : ''}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }

            if (currentPage < totalPages - 2) pages.push(<span key="end-ellipsis">...</span>);

            pages.push(
                <button
                    key={totalPages}
                    className={`${styles.pageBtn} ${currentPage === totalPages ? styles.active : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className={styles.paginationWrapper}>
            <div className={styles.selectWrapper}>
                <span>Showing</span>
                <select className={styles.select} value={itemsPerPage}>
                    <option value={100}>10</option>
                    <option value={100}>30</option>
                    <option value={100}>50</option>
                    <option value={100}>100</option>
                </select>
                <span>out of {totalItems}</span>
            </div>

            <div className={styles.pageControls}>
                <button
                    className={styles.arrowBtn}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {'<'}
                </button>
                {renderPages()}
                <button
                    className={styles.arrowBtn}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default Pagination;

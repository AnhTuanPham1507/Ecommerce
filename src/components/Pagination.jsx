import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    total: PropTypes.number,
    page_size: PropTypes.number,
    onChange: PropTypes.func
};

function Pagination(props) {
    const { page, total, page_size, onChange } = props
    const numPages = Math.ceil(total / page_size)

    function handlePageChange(newPage) {
        onChange(newPage)
    }

    return (
        <div className="pagination">
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end pagination-lg">
                    <li class={`page-item ${page == 1 ? 'disabled' : ''}`} onClick={() => handlePageChange(page - 1)}>
                        <a class="page-link" tabindex={page == 1 ? '-1' : '0'} aria-disabled={page == 1}>Previous</a>
                    </li>
                    {
                        [...Array(numPages)].map((e, i) => (
                            <li class={`page-item ${page == i + 1 ? 'ACTIVE' : ''}`} onClick={() => handlePageChange(i + 1)}>
                                <a class="page-link" >{i + 1}</a>
                            </li>
                        ))
                    }
                    <li class={`page-item ${page == numPages ? 'disabled' : ''}`} onClick={() => handlePageChange(page + 1)}>
                        <a class="page-link" tabindex={page == numPages ? '-1' : '0'} aria-disabled={page == numPages}>Next</a>
                    </li>

                    {

                    }
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
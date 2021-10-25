import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";

import Pagination from '../components/Pagination'
import Helmet from '../components/Helmet';
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard';
import { getFetch } from '../api/fetch';
function Search() {
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');

    const token = useSelector(state => state.value)

    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        page_size: 3,
        total_row: 3
    })
    const [filter, setFilter] = useState(1)

    useEffect(() => {
        async function getProducts() {
            try {

                const response = await getFetch(`product/?title_like=${name}&page=${filter}`, token)
                const data = await response.json();
                if (response.status !== 400 && data.count !== 0) {
                    setProducts(data.results)
                    setPagination({ ...pagination, page: filter, total: data.count })
                }
                else {
                    alert('Khong tìm thấy sản phẩm')
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [name])

    function handlePageChange(newPage) {
        setFilter(newPage)
    }

    return (
        <Helmet title="tìm kiếm">
            <div className="catalog">
                <div className="catalog__content">
                    <Grid
                        col={3}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            products.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    product={item}
                                />
                            ))
                        }

                    </Grid>
                    <Pagination
                        page_size={pagination.page_size}
                        page={pagination.page}
                        total={pagination.total_row}
                        onChange={handlePageChange}
                    />
                </div>

            </div>
        </Helmet>
    );
}

export default Search;
import React, { useEffect, useRef, useState } from 'react';

import queryString from 'query-string'

import Helmet from '../components/Helmet';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import CheckBox from '../components/CheckBox';
import Button from '../components/Button';
import Pagination from '../components/Pagination';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFetch } from '../api/fetch';

function Catalog() {

    const token = useSelector(state => state.token.value)

    const initFilter = {
        classification: [],
        brand: [],
        page: 1
    }

    const { slug } = useParams()

    const [products, setProducts] = useState([])

    const [classifications, setClassifications] = useState([])

    const [brands, setBrands] = useState([])

    const [pagination, setPagination] = useState(() => {
        return {
            page: 1,
            page_size: 6,
            total_row: 12
        }
    })

    const [filter, setFilter] = useState(initFilter)

    const filterRef = useRef(null)

    function filterSelect(type, checked, item) {
        if (checked) {
            switch (type) {
                case 'CLASSIFICATION':
                    setFilter({ ...filter, classification: [...filter.classification, item.id], page: 1 })
                    break
                case 'BRAND':
                    setFilter({ ...filter, brand: [...filter.brand, item.id], page: 1 })
                    break
                default:
                    break;
            }
        }
        else {
            switch (type) {
                case 'CLASSIFICATION':
                    const newClassification = filter.classification.filter(e => e !== item.id)
                    setFilter({ ...filter, classification: newClassification, page: 1 })
                    break
                case 'BRAND':
                    const newBrand = filter.brand.filter(e => e !== item.id)
                    setFilter({ ...filter, brand: newBrand, page: 1 })
                    break
                default:
                    break;
            }
        }
    }

    function handlePageChange(newPage) {
        setFilter({ ...filter, page: newPage })
    }

    function showHidenFilter() {
        filterRef.current.classList.toggle('active')
    }

    useEffect(() => {
        async function getClassification() {
            try {
                const response = await getFetch(`classification/?category=${slug}`, token)
                const data = await response.json();
                if (response.status !== 400) {
                    setClassifications(data)
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getClassification()
    }, [slug])

    useEffect(() => {
        async function getBrand() {
            console.log(slug)
            try {
                const response = await getFetch(`brand/?category=${slug}`, token)
                const data = await response.json();
                if (response.status !== 400) {
                    setBrands(data)
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }

        }

        getBrand()
    }, [slug])

    useEffect(() => {
        async function getProducts() {
            const qParams = queryString.stringify(filter)
            const response = await getFetch(`product/?category=${slug}&page_size=${pagination.page_size}&${qParams}`, token)
            const data = await response.json();
            if (response.status !== 400) {
                setProducts(data.results)
                setPagination({ ...pagination, page: filter.page, total_row: data.count })
            }
            else {
                alert(data.message)
            }
        }

        getProducts()
    }, [filter])

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>

                    <div className="catalog__filter__close" onClick={showHidenFilter}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                classifications.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onChange={(input) => filterSelect('CLASSIFICATION', input.checked, item)}
                                            checked={filter.classification.includes(item.id)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Thương hiệu
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                brands.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onChange={(input) => filterSelect('BRAND', input.checked, item)}
                                            checked={filter.brand.includes(item.id)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size={'sm'} onClick={(() => setFilter(initFilter))} >
                                xóa bộ lọc
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={showHidenFilter}>Mở bộ lọc</Button>
                </div>

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

export default Catalog;
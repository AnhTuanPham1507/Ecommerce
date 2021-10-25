import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Helmet from '../components/Helmet'
import Heroslider from '../components/Heroslider';
import Section, { SectionBody, SectionTitle } from '../components/Section';
import PolicyCard from '../components/PolicyCard';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination'

import data from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy';
import banner from '../assets/images/banner.png'

import { Card } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import { getFetch } from '../api/fetch';

function Home() {
    const [categories, setCategories] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [popularProducts, setPopularProducts] = useState([])

    const [cPagination, setCPagination] = useState(() => {
        return {
            page: 1,
            page_size: 6,
            total: 10
        }
    })
    const [cFilter, setCFilter] = useState(1)

    const token = useSelector(state => state.token.value)

    useLayoutEffect(() => {
        async function getCategories() {
            try {

                const response = await getFetch(`category/?page=${cFilter}&page_size=${cPagination.page_size}`, token)
                const data = await response.json();
                if (response.status !== 400) {
                    setCPagination({ page: cFilter, total: data.count, page_size: data.results.length })
                    setCategories(data.results)
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getCategories()
    }, [cFilter])

    useLayoutEffect(() => {
        async function getNewProducts() {
            try {
                const response = await getFetch(`product/?new_product=1&page_size=8`, token)
                const data = await response.json();
                if (response.status !== 400) {
                    setNewProducts(data.results)
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }

        }

        async function getPopularProducts() {
            try {
                const response = await getFetch(`product/?most_popular=1&page_size=8`, token)
                const data = await response.json();
                if (response.status !== 400) {
                    setPopularProducts(data.results)
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getNewProducts()
        getPopularProducts()
    }, [])

    function handleCateChange(newPage) {
        setCFilter(newPage)
    }

    return (
        <Helmet title="Trang chủ">
            {/* hero slider*/}
            <Heroslider data={data} control={true} />
            {/* end hero slider*/}

            {/*policy section*/}
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            policy.map((item, index) => (
                                <Link key={index} to="/policy">
                                    <PolicyCard
                                        name={item.name}
                                        description={item.description}
                                        icon={item.icon}
                                    />
                                </Link>
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/*end policy section*/}

            {/*categories section*/}
            <Section>
                <SectionTitle>
                    Danh mục sản phẩm
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={6}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            categories.map((cate) => (
                                <Link to={`/catalog/${cate.id}`}>
                                    <Card style={{ width: '20rem' }} key={cate.id}>
                                        <Card.Img variant="top" src={cate.picture} />
                                        <Card.Body>
                                            <Card.Title>{cate.name}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            ))
                        }
                    </Grid>
                    <Pagination
                        page={cPagination.page}
                        total={cPagination.total}
                        page_size={cPagination.page_size}
                        onChange={handleCateChange}
                    />
                </SectionBody>
            </Section>
            {/*end categories section*/}

            {/*end new arrival section*/}
            <Section>
                <SectionTitle>
                    Sản phẩm mới
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            newProducts.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    product={item}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/*end new arrival section*/}
            {/*banner section*/}
            <Section>
                <SectionBody>
                    <Link to="/catalog">
                        <img src={banner} alt="" />
                    </Link>
                </SectionBody>
            </Section>
            {/*end banner section*/}
            {/*end popular product section*/}
            <Section>
                <SectionTitle>
                    Sản phẩm bán chạy
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            popularProducts.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    product={item}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/*end popular product section*/}

        </Helmet>
    );
}

export default Home;
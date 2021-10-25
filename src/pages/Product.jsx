import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard';

import ProductView from '../components/ProductView';
import { useSelector } from 'react-redux';
import { getFetch } from '../api/fetch';

function Product() {
    const token = useSelector(state => state.token.value)

    const { slug } = useParams()

    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await getFetch(`product/${slug}/`, token)
                const data = await response.json();
                if (response.status !== 400) {
                    setProduct(data)
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, [slug])

    useEffect(() => {
        async function getRelatedProduct() {
            try {
                const response = await getFetch(`product/?category=${product.classification.category}&classification=${product.classification.id}`, token)
                const data = await response.json();
                if (response.status !== 400) {
                    setRelatedProducts(data.results)
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getRelatedProduct()
    }, [product])

    return (
        <Helmet title={product.name}>
            <Section>
                <SectionBody>
                    {
                        Object.getOwnPropertyNames(product).length !== 0 ? <ProductView product={product} /> : null
                    }
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                    Khám phá thêm
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            relatedProducts.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
}

export default Product;
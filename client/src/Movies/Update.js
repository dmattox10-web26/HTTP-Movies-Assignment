import React, { useState, useEffect } from 'react'
import { useFormik, Formik } from 'formik'
import * as Yup from 'yup'
import { Container, Jumbotron, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Update = props => {
    
    const [movie, updateMovie] = useState({})
    const { id } = useParams()
    useEffect(() => {
        console.log(id)
        axios.get(`/api/movies/${id}`)
        .then(res => {
            updateMovie(res.data)
            console.log(res.data)})
    }, [props])

    const formik = useFormik({
        initialValues: {
            title: '',
            director: '',
            metascore: '',
            stars: ''
        },
        validationSchema: Yup.object({
           title: Yup.string()
           .required('Required'),
           director: Yup.string()
           .required('Required'),
           metascore: Yup.string()
           .required('Required'),
           stars: Yup.string()
           .required('Required')
        }),
        onSubmit: values => {
            console.log(values)
            values.stars = values.stars.split(', ')
            console.log(values)
            axios.put(`/api/movies/${id}`, values)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            
        },
    })

    return (
        <Container>
            <div className='spacer'></div>
            <Jumbotron>
                <div className='center'>
                    <h1>Edit Film</h1>
                </div>
                <Formik initialValues={movie} enableReinitialize>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col xs='6'>
                            <FormGroup>
                                <Label for='title'>Title</Label>
                                <Input
                                    id='title'
                                    name='title'
                                    type='text'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                    classtitle={formik.touched.title && !formik.errors.title ? 'form-control is-valid' : 'form-control is-invalid'}
                                />
                                {formik.touched.title && formik.errors.title ? <div classtitle='invalid-feedback'>{formik.errors.title}</div> : null}
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label for='director'>Director</Label>
                                <Input
                                    id='director'
                                    name='director'
                                    type='text'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.director}
                                    className={formik.touched.director && !formik.errors.director ? 'form-control is-valid' : 'form-control is-invalid'}
                                />
                                {formik.touched.director && formik.errors.director ? <div className='invalid-feedback'>{formik.errors.director}</div> : null}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='6'>
                            <FormGroup>
                                <Label for='metascore'>Metascore</Label>
                                <Input
                                    id='metascore'
                                    name='metascore'
                                    type='text'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.metascore}
                                    className={formik.touched.metascore && !formik.errors.metascore ? 'form-control is-valid' : 'form-control is-invalid'}
                                />
                                {formik.touched.metascore && formik.errors.metascore ? <div className='invalid-feedback'>{formik.errors.metascore}</div> : null}
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label for='stars'>Stars</Label>
                                <Input
                                    id='stars'
                                    name='stars'
                                    type='text'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.stars}
                                    className={formik.touched.stars && !formik.errors.stars ? 'form-control is-valid' : 'form-control is-invalid'}
                                />
                                {formik.touched.stars && formik.errors.stars ? <div className='invalid-feedback'>{formik.errors.stars}</div> : null}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12'>
                            <Label for='submit'>&nbsp;</Label>
                            <Button type='submit' style={{width: '100%'}} className='btn-info'>Submit</Button>
                        </Col>
                    </Row>
                </Form>
                </Formik>
            </Jumbotron>
        </Container>
    )
}

export default Update
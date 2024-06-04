import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Container } from '@mui/material';
import LockIcons from '../components/icons/LockIcons';
import EyesOpen from '../components/icons/EyesOpen';
import EyesClose from '../components/icons/EyesClose';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signin = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const { email, password } = values;
        try {
            const response = await axios.post('http://localhost:8080/api/sign-in', { email, password });
            const dataResponse = response.data;
            if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
            if (dataResponse.success) {
                toast.success(dataResponse.message);
                localStorage.setItem('token', dataResponse.token);
                navigate('/');
            }
        } catch (error) {
            console.error('Error occurred during sign-in:', error);
            toast.error('Please enter correct credentials..');
        }
        resetForm();
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className='h-screen-center'>
                        <div className='card-from'>
                            <div className='card-header'>
                                <div className='lock-icons'>
                                    <LockIcons />
                                </div>
                            </div>

                            <Container maxWidth='xs'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            name='email'
                                            as={TextField}
                                            label='Email'
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            fullWidth
                                            size='small'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name='password'
                                            type={showPassword ? 'text' : 'password'}
                                            as={TextField}
                                            label='Password'
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            fullWidth
                                            size='small'
                                            InputProps={{
                                                endAdornment: (
                                                    <div className='icons-password' onClick={() => setShowPassword((prev) => !prev)}>
                                                        {showPassword ? <EyesOpen /> : <EyesClose />}
                                                    </div>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type='submit' variant='contained' color='primary' fullWidth>
                                            {loading ? 'Loading...' : 'Sign In'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>

                            <p className='donot-have'>
                                Don't have an account <Link to={'/sign-up'} className='link'>Sign Up ?</Link>
                            </p>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Signin;

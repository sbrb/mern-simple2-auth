import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Container } from '@mui/material';
import EyesOpen from '../components/icons/EyesOpen';
import EyesClose from '../components/icons/EyesClose';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CloudinaryContext, Image } from 'cloudinary-react';
import UserIcons from '../components/icons/UserIcons';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required.'),
        lastName: Yup.string().required('Last Name is required.'),
        userName: Yup.string()
            .matches(/^[a-zA-Z]+$/, 'Username must contain only letters')
            .min(3, 'Username must be at least 3 characters')
            .max(15, 'Username must not exceed 15 characters')
            .required('Username is required.'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required.'),
        email: Yup.string().email('Invalid email').required('Email is required.'),
        password: Yup.string().required('Password is required.'),
    });



    const handleSubmit = async (values, { resetForm }) => {
        const { firstName, lastName, userName, phone, email, password } = values;
        setLoading(true);
        try {
            let profilePicUrl = null;
            if (profilePic) {
                profilePicUrl = profilePic;
            }
            const response = await axios.post('http://localhost:8080/api/sign-up', {
                firstName,
                lastName,
                userName,
                phone,
                email,
                password,
                profilePic: profilePicUrl,
            });
            const { data } = response;
            if (data.error) {
                toast.error(data.message);
            }
            if (data.success) {
                toast.success(data.message);
                resetForm();
                setProfilePic(null);
                localStorage.setItem('token', data.token);
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };


    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'cloudinary');
                const response = await fetch('https://api.cloudinary.com/v1_1/ddvjlniy0/image/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                setProfilePic(data.secure_url);
            } catch (error) {
                console.error('Error uploading file to Cloudinary:', error);
                toast.error('Error uploading file. Please try again.');
            }
        }
    };


    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                userName: '',
                phone: '',
                email: '',
                password: '',
                profilePic: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className='h-screen-center'>
                        <div className='card-from'>
                            <div className='card-header'>
                                <div className='sign-form-lock-container'>
                                    {profilePic ? (
                                        <CloudinaryContext cloudName="ddvjlniy0">
                                            {profilePic ? (
                                                <Image publicId={profilePic} width="150" height="150" crop="fill" radius="max" className='profile-pic ' />
                                            ) : (
                                                <div className='lock-icons'>
                                                    <UserIcons />
                                                </div>
                                            )}
                                        </CloudinaryContext>

                                    ) : (
                                        <div className='lock-icons'>
                                            <UserIcons />
                                        </div>
                                    )}

                                    <label htmlFor='upload-pic-input'>
                                        <div className='upload-pic-text'>Upload Pic</div>
                                        <input
                                            type='file'
                                            id='upload-pic-input'
                                            onChange={handleUploadFile}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </div>
                            </div>
                            <br />
                            <Container maxWidth='xs'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Field
                                            name='firstName'
                                            as={TextField}
                                            label='First Name'
                                            error={touched.firstName && Boolean(errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                            fullWidth
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Field
                                            name='lastName'
                                            as={TextField}
                                            label='Last Name'
                                            error={touched.lastName && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                            fullWidth
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name='userName'
                                            as={TextField}
                                            label='Username'
                                            error={touched.userName && Boolean(errors.userName)}
                                            helperText={touched.userName && errors.userName}
                                            fullWidth
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name='phone'
                                            as={TextField}
                                            label='Phone'
                                            error={touched.phone && Boolean(errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                            fullWidth
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name='email'
                                            as={TextField}
                                            label='Email'
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            fullWidth
                                            variant='outlined'
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
                                            variant='outlined'
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
                                            {loading ? 'Loading...' : 'Sign Up'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                            <p className='donot-have'>
                                Already have an account <Link to={'/sign-in'} className='link'>Sign In ?</Link>
                            </p>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Signup;

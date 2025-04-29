import '../App.css'
import { Box } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyPassField from './forms/MyPassField'
import MyButton from './forms/MyButton'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import { useNavigate } from 'react-router-dom'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState, useEffect } from 'react'
import MyMessage from './Message'
import overlay from "/polar bear.gif"
import bg from "/bg.png"

const baseStyles = {
    container: {
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '50vh',
        order: 2,
    },
    image: {
        width: '80%',
        maxWidth: '28rem',
        objectFit: 'contain',
    },
    formContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        padding: '1rem',
        order: 1,
    },
    formWrapper: {
        width: '100%',
        maxWidth: '28rem',
    },
    form: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem 2rem',
        border: '5px solid #10BDDB',
    },
    title: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1f2937',
        marginBottom: '1.5rem',
    },
    formGroup: {
        marginBottom: '1.5rem',
        width: '100%',
    },
    link: {
        color: '#2563eb',
        fontSize: '0.875rem',
        textDecoration: 'none',
    },
    linkHover: {
        color: '#1e40af',
    },
    linkContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        textAlign: 'center',
        marginTop: '1.5rem',
    },
};

const Register = () => {
    const [styles, setStyles] = useState(baseStyles);
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        const handleResize = (e) => {
            if (e.matches) {
                setStyles(prevStyles => ({
                    ...prevStyles,
                    container: {
                        ...prevStyles.container,
                        flexDirection: 'row',
                    },
                    imageContainer: {
                        ...prevStyles.imageContainer,
                        width: '50%',
                        height: '100vh',
                        order: 1,
                    },
                    formContainer: {
                        ...prevStyles.formContainer,
                        width: '50%',
                        height: '100vh',
                        order: 2,
                    },
                    form: {
                        ...prevStyles.form,
                        padding: '2rem',
                    },
                }));
            } else {
                setStyles(baseStyles);
            }
        };

        // Initial check
        handleResize(mediaQuery);

        // Add listener for window resize
        mediaQuery.addListener(handleResize);

        // Cleanup
        return () => mediaQuery.removeListener(handleResize);
    }, []);

    const schema = yup.object({
        username: yup.string()
            .required('Name is a required field')
            .min(3, 'Username must be at least 3 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
        email: yup.string()
            .email('Please enter a valid email address')
            .required('Email is a required field'),
        password: yup.string()
            .required('Password is a required field')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
        password2: yup.string()
            .required('Password confirmation is required')
            .oneOf([yup.ref('password')], 'Passwords must match')
    });

    const {handleSubmit, control, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const submission = async (data) => {
        try {
            console.log('Submitting registration data:', data);
            
            const response = await AxiosInstance.post('register/', {
                email: data.email,
                password: data.password,
                password2: data.password2,
                username: data.username
            });

            console.log('Registration successful:', response.data);
            navigate('/');
            
        } catch (error) {
            console.error('Registration error:', error.response?.data || error);
            
            if (error.response?.data) {
                if (error.response.data.email) {
                    setErrorMessage('This email is already registered');
                } else if (error.response.data.username) {
                    setErrorMessage('This username is already taken');
                } else if (error.response.data.error) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage('Registration failed. Please try again.');
                }
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
            
            setShowMessage(true);
        }
    };

    return (
        <div style={{...styles.container, backgroundImage: `url(${bg})`}}>
            <div style={styles.imageContainer}>
                <img 
                    src={overlay} 
                    alt="Company branding" 
                    style={styles.image}
                    loading="lazy"
                />
            </div>
            
            <div style={styles.formContainer}>
                <div style={styles.formWrapper}>
                    {showMessage && (
                        <MyMessage 
                            text={errorMessage} 
                            color={'#EC5A76'}
                            style={{marginBottom: '1.5rem'}}
                        />
                    )}

                    <form onSubmit={handleSubmit(submission)} style={styles.form}>
                        <div>
                            <h1 style={styles.title}>
                                Register
                            </h1>

                            <div style={styles.formGroup}>
                                <MyTextField
                                    label="Username"
                                    name="username"
                                    control={control}
                                    required
                                    style={{width: '100%'}}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <MyTextField
                                    label="Email"
                                    name="email"
                                    control={control}
                                    required
                                    style={{width: '100%'}}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <MyPassField
                                    label="Password"
                                    name="password"
                                    control={control}
                                    required
                                    style={{width: '100%'}}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <MyPassField
                                    label="Confirm Password"
                                    name="password2"
                                    control={control}
                                    required
                                    style={{width: '100%'}}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <MyButton 
                                    type="submit"
                                    label="Create Account"
                                    fullWidth
                                    style={{padding: '0.75rem 0'}}
                                />
                            </div>

                            <div style={styles.linkContainer}>
                                <Link 
                                    to="/" 
                                    style={styles.link}
                                    onMouseOver={(e) => e.target.style.color = styles.linkHover.color}
                                    onMouseOut={(e) => e.target.style.color = styles.link.color}
                                >
                                    Already registered? Sign in here
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
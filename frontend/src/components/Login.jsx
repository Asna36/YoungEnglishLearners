// Login.jsx
import "../App.css";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MyTextField from "./forms/MyTextField";
import MyPassField from "./forms/MyPassField";
import MyButton from "./forms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";
import MyMessage from "./Message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import overlay from "/public/polar bear.gif"
import bg from "/public/bg.png"

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
  },
  spaceY6: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  spaceY2: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
};

const Login = () => {
  const [styles, setStyles] = useState(baseStyles);
  
  const schema = yup.object({
    email: yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const submission = async (data) => {
    try {
      console.log('Attempting login with data:', data);

      // Clear any existing tokens first
      localStorage.clear();

      // Login request
      const loginResponse = await AxiosInstance.post('login/', {
        email: data.email,
        password: data.password,
      });

      console.log('Login response:', loginResponse.data);
      
      if (loginResponse.data.token && loginResponse.data.user) {
        // Save token and user info in localStorage
        const { token, user } = loginResponse.data;
        localStorage.setItem('Token', token);
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('userId', user.id);
        
        console.log("Token and user info saved");
        
        // Navigate to home page
        navigate('/home');
      } else {
        setErrorMessage('Invalid response from server');
        setShowMessage(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (!error.response) {
        // Network error
        setErrorMessage('Cannot connect to server. Please try again later.');
      } else {
        setErrorMessage(error.response?.data?.error || 'Login failed. Please try again.');
      }
      setShowMessage(true);
    }
  };

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
              text={errorMessage || "Login failed. Please try again or reset your password"} 
              color={'#EC5A76'} 
              style={{marginBottom: '1.5rem'}}
            />
          )}
          
          <form 
            onSubmit={handleSubmit(submission)} 
            style={styles.form}
          >
            <Box style={styles.spaceY6}>
              <h1 style={styles.title}>
                Login
              </h1>

              <Box style={styles.spaceY2}>
                <MyTextField
                  label="Email Address"
                  name="email"
                  control={control}
                  required
                  style={{width: '100%'}}
                />
              </Box>

              <Box style={styles.spaceY2}>
                <MyPassField
                  label="Password"
                  name="password"
                  control={control}
                  required
                  style={{width: '100%'}}
                />
              </Box>

              <Box>
                <MyButton 
                  label="Sign In"
                  type="submit"
                  fullWidth
                  style={{padding: '0.75rem 0'}}
                />
              </Box>

              <Box style={styles.linkContainer}>
                <Link 
                  to="/register" 
                  style={styles.link}
                  onMouseOver={(e) => e.target.style.color = styles.linkHover.color}
                  onMouseOut={(e) => e.target.style.color = styles.link.color}
                >
                  Don't have an account? Register here
                </Link>
                <Link 
                  to="/request/password_reset" 
                  style={styles.link}
                  onMouseOver={(e) => e.target.style.color = styles.linkHover.color}
                  onMouseOut={(e) => e.target.style.color = styles.link.color}
                >
                  Forgot your password?
                </Link>
              </Box>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
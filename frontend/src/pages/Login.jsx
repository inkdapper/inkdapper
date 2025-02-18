import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Separate state for email
  const [phone, setPhone] = useState(''); // Separate state for phone number
  const [emailOrPhone, setEmailOrPhone] = useState(''); // State for email or phone
  const [verificationToken, setVerificationToken] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const getPasswordStrength = (password) => {
    if (password.length < 8) return 'Weak';
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) return 'Strong';
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)) return 'Medium';
    return 'Weak';
  };

  const onPasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentState === 'Sign Up' && !validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }
    setPasswordError('');
    try {
      if (currentState === 'Sign Up') {
        // Check if the phone number is already registered
        const phoneCheckResponse = await axios.post(backendUrl + '/api/user/check-phone', { phone });
        if (!phoneCheckResponse.data.success) {
          toast.error('Phone number is already registered. Please use another.');
          return;
        }

        const response = await axios.post(backendUrl + '/api/email/send-verification-email', { email });
        if (response.data.success) {
          toast.success(response.data.message);
          setCurrentState('Verify Email');
          localStorage.setItem('signupPassword', password); // Save password to local storage
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === 'Verify Email') {
        const response = await axios.post(backendUrl + '/api/email/verify-email', { token: verificationToken, email });
        if (response.data.success) {
          const registerResponse = await axios.post(backendUrl + '/api/user/register', { name, email, password, phone }); // Include phone in registration
          if (registerResponse.data.success) {
            setToken(registerResponse.data.token);
            localStorage.setItem('token', registerResponse.data.token);
            navigate('/');
          } else {
            toast.error(registerResponse.data.message);
          }
        } else {
          toast.error(response.data.message);
        }
      } else {
        const loginData = { emailOrPhone, password }; // Use emailOrPhone for login
        const response = await axios.post(backendUrl + '/api/user/login', loginData); // Include emailOrPhone in login
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className=''>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        {currentState === 'Sign Up' && (
          <>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
            <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Phone' required /> {/* New phone input */}
            <div className='relative w-full'>
              <input
                onChange={onPasswordChange}
                value={password}
                type={showPassword ? 'text' : 'password'}
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Password'
                required
                //onFocus={() => setIsPasswordFocused(true)}
                //onBlur={() => setIsPasswordFocused(false)}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='focus:outline-none'>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
              <div className='w-full mt-2'>
                <div className='h-2 bg-gray-300 rounded'>
                  <div
                    className={`h-full rounded ${passwordStrength === 'Strong' ? 'bg-green-500' : passwordStrength === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: passwordStrength === 'Strong' ? '100%' : passwordStrength === 'Medium' ? '66%' : '33%' }}
                  ></div>
                </div>
                <p className={`text-sm mt-1 ${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {passwordStrength} Password
                </p>
              </div>
            {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
            <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>Send Verification Email</button>
          </>
        )}
        {currentState === 'Login' && (
          <>
            <input
              onChange={(e) => setEmailOrPhone(e.target.value)}
              value={emailOrPhone}
              type="text"
              className='w-full px-3 py-2 border border-gray-800'
              placeholder='Email or Phone'
              required
            />
            <div className='relative w-full'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? 'text' : 'password'}
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Password'
                required
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='focus:outline-none'>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </>
        )}
        {currentState === 'Verify Email' && (
          <input onChange={(e) => setVerificationToken(e.target.value)} value={verificationToken} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Verification Token' required />
        )}
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer text-orange-600'>Create account</p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-orange-600'>Login Here</p>
          )}
        </div>
        {currentState !== 'Sign Up' && (
          <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : currentState === 'Verify Email' ? 'Verify Email' : ''}</button>
        )}
      </form>
    </div>
  );
};

export default Login;
import { useState, useEffect } from 'react';
import { Form } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';
import {Link} from 'react-router-dom'
// import { Form } from 'react-bootstrap';
import {useMutation} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import {LOGIN_USER} from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, {error}] = useMutation(LOGIN_USER)
  useEffect(()=>{
    if(error){
      setShowAlert(true)
    }else{
      setShowAlert(false)
    }
    }, [error])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // const response = await loginUser(userFormData);
      const {data}= await login({
        variables:{...userFormData}
      })

      
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <title>Login</title>
         <input
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          >Email</input>
        
          <input
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
            >Password</input>
                 
        <button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          color='success'>
          Submit
        </button>
      </Form>
    </>
  );
};

export default LoginForm;

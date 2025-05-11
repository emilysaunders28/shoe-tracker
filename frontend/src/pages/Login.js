import { Formik } from 'formik';
import * as yup from 'yup';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query'

const Login = (props) =>  {
    const queryClient = useQueryClient();
    const [loginError, setLoginError] = useState('')
    const [registerError, setRegisterError] = useState('')

    const [visible, setVisible] = useState(false);
    const loginSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    })

    const handleLogin = (values, { setSubmitting }) => {
        setLoginError('');
        setRegisterError('');
        fetch('/api/login/', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
            return data;
        }).then(async (data) => {
            if (data.error){
                setLoginError(data.error);
            } else {
                localStorage.setItem('token', data.token);
                await queryClient.invalidateQueries(['user']);
            }
        }
        ).catch((error) => {
            console.error('Error logging in:', error);
            setLoginError(error.message)
        }).finally(() => {
            setSubmitting(false)
        })
    }

    const [newVisible, setNewVisible] = useState(false);


    const registerSchema = yup.object().shape({
        newUsername: yup.string().required('Username is required'),
        newPassword: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    })
    const handleRegister = (values, { setSubmitting }) => {
        setLoginError('');
        setRegisterError('');
        fetch('/api/register/', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.newUsername,
                password: values.newPassword
            })
        }).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                // Error returned by server
                throw new Error(data.error || 'Login failed');
            }
            return data;
        }).then((data) => {
            console.log(data);
            if (data.error) {
                setRegisterError(data.error)
            } else {
                localStorage.setItem('token', data.token);
                queryClient.invalidateQueries(['user'])
            }
        }).catch((error) => {
            console.error('Error registering user:', error);
            setRegisterError(error.message)
        }).finally(() => {
            setSubmitting(false);
        })
    }


    return ( 
        <Container>
            <Row>
                <Col>
                    <h1>Login</h1>
                    {loginError && <div className="alert alert-danger">{loginError}</div>}
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={loginSchema}
                        onSubmit={handleLogin}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({ isSubmitting, handleSubmit, handleChange, values, touched, errors }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={values.username}
                                        onChange={handleChange}
                                        name='username'
                                        isInvalid={touched.username && errors.username}
                                    />
                                    {touched.username && errors.username && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type={visible ? "text" : "password"}
                                        placeholder='Enter password'
                                        value={values.password}
                                        onChange={handleChange}
                                        name='password'
                                        isInvalid={touched.password && errors.password}
                                    />
                                    {touched.password && errors.password && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        type="checkbox"
                                        label="Show password"
                                        checked={visible}
                                        onChange={() => setVisible(!visible)}
                                    />
                                </Form.Group>
                                <Button type="submit" disabled={isSubmitting}>
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
                <Col>
                    <h1>Create new user</h1>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                    <Formik
                        initialValues={{
                            newUsername: '',
                            newPassword: '',
                            confirmPassword: ''
                        }}
                        validationSchema={registerSchema}
                        onSubmit={handleRegister}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({ isSubmitting, handleSubmit, handleChange, values, touched, errors }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={values.newUsername}
                                        onChange={handleChange}
                                        name='newUsername'
                                        isInvalid={touched.newUsername && errors.newUsername}
                                    />
                                    {touched.newUsername && errors.newUsername && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.newUsername}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type={newVisible ? "text" : "password"}
                                        placeholder='Enter password'
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        name='newPassword'
                                        isInvalid={touched.newPassword && errors.newPassword}
                                    />
                                    {touched.newPassword && errors.newPassword && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.newPassword}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control
                                        type={newVisible ? "text" : "password"}
                                        placeholder='Confirm password'
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        name='confirmPassword'
                                        isInvalid={touched.confirmPassword && errors.confirmPassword}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        type="checkbox"
                                        label="Show password"
                                        checked={newVisible}
                                        onChange={() => setNewVisible(!newVisible)}
                                    />
                                </Form.Group>
                                <Button type="submit" disabled={isSubmitting}>
                                    Create
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
     );
}

export default Login;
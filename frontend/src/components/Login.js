import { Formik } from 'formik';
import * as yup from 'yup';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const Login = (props) =>  {
    const setUser = props.setUser;

    const [visible, setVisible] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const loginSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    })

    const handleLogin = (values, { setSubmitting }) => {
        fetch('/api/login/', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            if (data.errors){
                setLoginError(data.errors);
                setSubmitting(false);
            } else {
                setLoginError(null);
                setSubmitting(false);
                localStorage.setItem('token', data.token);
                setUser({
                    username: data.username,
                    id: data.id
                });
            }
        }
        ).catch((error) => {
            console.error('Error logging in:', error);
            setSubmitting(false);
        });
    }

    const [newVisible, setNewVisible] = useState(false);
    const [registerError, setRegisterError] = useState(null);

    const registerSchema = yup.object().shape({
        newUsername: yup.string().required('Username is required'),
        newPassword: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    })
    const handleRegister = (values, { setSubmitting }) => {
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
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            if (data.errors) {
                setRegisterError(data.errors)
                setSubmitting(false)
            } else {
                setRegisterError(null);
                setSubmitting(false);
                localStorage.setItem('token', data.token);
                setUser({
                    username: data.username,
                    id: data.id
                });
            }
        }).catch((error) => {
            console.error('Error registering user:', error);
            setSubmitting(false)
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
                    {registerError && <div className="alert alert-danger">Invalid username or password</div>}
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
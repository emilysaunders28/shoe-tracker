import { Container, Nav, Navbar, NavDropdown, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useUser } from '../hooks/useUser'
import { useState } from 'react';



const MyNav = (props) => {

    const { data: user, error, isError, isLoading } = useUser()

    const [ search, setSearch ] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {  
        e.preventDefault();
        navigate(`/search/${search}`)
    }

    const handleLogout = useLogout()


    return (
        <Navbar>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    Shoe Tracker
                </Navbar.Brand>
                {isLoading ? (
                    <Navbar.Text>Loading user...</Navbar.Text>
                ) : user.username ? (
                    <NavDropdown title={`Logged in as ${user.username}`} id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/myshoes">
                            My Shoes
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleLogout()}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                ) : (
                    <Nav>
                        <Nav.Link as={Link} to="/login">
                            Login
                        </Nav.Link>
                    </Nav>
                )}
                <Nav>
                    <Nav.Link as={Link} to="/explore">
                        Explore
                    </Nav.Link>
                </Nav>
                <Form className='d-flex'>
                    <Row>
                        <Col>
                            <Form.Control
                                type='text'
                                placeholder='Search'
                                className='mr-sm-2'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Button type='submit' onClick={handleSearch} disabled={!search}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Navbar>
    )
}

export default MyNav;
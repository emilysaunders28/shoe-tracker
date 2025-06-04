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

    const { mutate: logout, isLoading: isLoggingOut } = useLogout()


    return (
        <Navbar className='my-navbar' expand="lg">
            <Container fluid>
                {/* Left side: Brand, links, dropdown */}
                <div className="d-flex align-items-center gap-3">
                    <Navbar.Brand as={Link} to="/">
                        Shoe Tracker
                    </Navbar.Brand>

                    {isLoading ? (
                        <Navbar.Text>Loading user...</Navbar.Text>
                    ) : user?.username ? (
                        <NavDropdown
                            title={isLoggingOut ? 'Logging out...' : `Logged in as ${user.username}`}
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item as={Link} to="/myshoes">
                                My Shoes
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => logout()}>
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
                        <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
                    </Nav>
                </div>

                {/* Right side: Search bar */}
                <Form className="d-flex ms-auto align-items-center" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        className="me-2 form-control-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        className="my-button btn-sm"
                        type="submit"
                        disabled={!search}
                    >
                        Search
                    </Button>
                </Form>
            </Container>
        </Navbar>

    )
}

export default MyNav;
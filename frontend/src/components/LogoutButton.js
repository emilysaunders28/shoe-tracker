import { useState } from 'react';
import { Button } from 'react-bootstrap';

const LogoutButton = (props) => {
    const setUser = props.setUser;
    const [logoutError, setLogoutError] = useState(null);
    const token = localStorage.getItem('token');

    const handleLogout = (e) => {
        e.preventDefault();
        fetch('api/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then((data) => {
          setUser({
            username: null,
            id: null
          });
        }
        ).catch((error) => {
          setLogoutError(error);
        })
      }
    return ( 
        <Button onClick={handleLogout}>
            Logout
        </Button>
     );
}

export default LogoutButton;
import Login from './components/Login';
import Home from './components/Home';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'



function App() {
  const [shoes, setShoes] = useState(null);
  const [user, setUser] = useState({
    username: null,
    id: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const brands = ['Adidas', 'Altra', 'Archies', 'ASICS', 'Birkenstock', 'Brooks', 'Craft', 'Diadora', 'HOKA', 'Karhu', 'Mizuno', 'New Balance', 'Nike', 'NNormal', 'OluKai', 'On', 'OOFOS', 'Puma', 'rabbit', 'Reebok', 'Salomon', 'Saucony', 'Skora', 'The North Face', 'Topo Athletic', 'Under Armour', 'Veja', 'Hylo', 'Mount to Coast']


  const fetchShoes = () => {
    fetch('/api/', {
      credentials: 'include',
      method: 'GET'
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      setShoes(data);
      console.log(shoes);
      setLoading(false);
    }
    ).catch((error) => {
      setError(error);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchShoes();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    fetch('api/logout/', {
      credentials: 'include',
      method: 'POST'
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
      setError(error);
    })
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home user={user} setUser={setUser}/>} />
          <Route exact path="/login" element={
            user.username ? <Navigate to="/" /> : <Login setUser={setUser} />
          } />
          <Route exact path="/shoes" element={<div>Shoes</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import Login from './pages/Login';
import Home from './pages/Home';
import ShoeView from './pages/ShoeView';
import MyShoes from './pages/MyShoes';
import Search from './pages/Search';
import Explore from './pages/Explore';
import Add from './pages/Add'
import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './hooks/useUser'



function App() {
  const { data: user, error, isError, loading } = useUser()

  const brands = ['Adidas', 'Altra', 'Archies', 'ASICS', 'Birkenstock', 'Brooks', 'Craft', 'Diadora', 'HOKA', 'Karhu', 'Mizuno', 'New Balance', 'Nike', 'NNormal', 'OluKai', 'On', 'OOFOS', 'Puma', 'rabbit', 'Reebok', 'Salomon', 'Saucony', 'Skora', 'The North Face', 'Topo Athletic', 'Under Armour', 'Veja', 'Hylo', 'Mount to Coast']

  return (
    
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={
              user && user.username ? <Navigate to="/" /> : <Login />
            } />
            <Route path="/view/:id" element = {<ShoeView/>} />
            <Route path="/add/:id" element={<Add/>} />
            <Route exact path="/myshoes" element={
              user && user.username ? <MyShoes/> : <Navigate to="/" />
            }/>
            <Route exact path="/explore" element={<Explore/>} />
            <Route path="/search/:search" element={<Search/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

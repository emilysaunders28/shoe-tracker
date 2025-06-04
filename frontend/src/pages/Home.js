import { Container, Row, Col } from 'react-bootstrap';
import ShoeCard from '../components/ShoeCard';
import MyNav from '../components/MyNav';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../hooks/useUser';
import ShoeCarousel from '../components/ShoeCarousel';
import { Link } from 'react-router-dom';


const Home = (props) => {

    const fetchShoes = async () => {
        const res = await axios.get('/api/random/')
        return res.data
    }

    const { shoesIsLoading, shoesIsError, shoesError, data: shoes } = useQuery({
        queryKey: ['random'],
        queryFn: fetchShoes,
        staleTime: 1000 * 60 * 5,
    })
    const { data: user, userError, userIsError, userIsLoading } = useUser()
    

    if(shoesIsLoading) {
        return (
            <h3>Loading...</h3>
        )
    }

    if(shoesIsError) {
        return (
            <h3>{shoesError.message}</h3>
        )
    }

    return ( 
        <>
        <MyNav/>
        <Container>
            <Row id='home-image'>
            <Col id="welcome-text">
                <Row id="title">
                    Shoe Tracker
                </Row>
                <Row id="site-description">
                    A website for finding your next favorite running shoe. Log in to save, rate and comment on shoes!
                </Row>
            </Col>
            </Row>
            { user && user.username && <Row>
                    <Col id={'welcome-back'}>
                        <h3>Welcome back</h3>
                        <h2>{user.username}</h2>
                        <Link to='/myshoes'>
                            <div>Click here to view your saved shoes</div>
                        </Link>
                    </Col>
                </Row>}
            <Row id='popular-shoes'>
                <h2>Explore popular shoes</h2>
                <Col>
                    {shoes && <ShoeCarousel shoes={shoes}/>}
                    <div>Popular shoes for men</div>
                </Col>
                <Col>
                    {shoes && <ShoeCarousel shoes={shoes}/>}
                    <div>Popular shoes for women</div>
                </Col>
            </Row>
            <Row>
                {shoes && shoes.map((shoe) => (
                    <Col xs={4} key={shoe.id}>
                        <ShoeCard shoe={shoe}/>
                    </Col>
                ))}
            </Row>
        </Container>
        </>
     );
}

export default Home ;
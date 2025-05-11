import { Container, Row, Col } from 'react-bootstrap';
import ShoeCard from '../components/ShoeCard';
import MyNav from '../components/MyNav';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';


const Home = (props) => {

    const fetchShoes = async () => {
        const res = await axios.get('/api/ ')
        return res.data
    }

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['shoes'],
        queryFn: fetchShoes,
        staleTime: 1000 * 60 * 5,
    })

    if(isLoading) {
        return (
            <h3>Loading...</h3>
        )
    }

    if(isError) {
        return (
            <h3>{error.message}</h3>
        )
    }

    return ( 
        <>
        <MyNav/>
        <Container>
            <Row>
                {data && data.map((shoe) => (
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
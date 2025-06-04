import { useMyShoes } from '../hooks/useMyShoes'
import MyNav from '../components/MyNav'
import { Container, Row, Col } from 'react-bootstrap'
import ShoeCard from '../components/ShoeCard'

const MyShoes = (props) => {
    const { data: myShoes, isLoading, isError, error } = useMyShoes();


    return ( 
        <>
            <MyNav/>
            <Container>
                <Row>
                    <h3>My Shoes</h3>
                </Row>
                <Row>
                    {isLoading ? (
                        <div>Loading saved shoes...</div>
                    ) : isError ? (
                        <div>Error fetching shoes: {error.message}</div>
                    ) : (
                        myShoes.map((myShoe) => (
                            <Col xs={4} key={myShoe.id}>
                                <ShoeCard shoe={myShoe.shoe}/>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>
     );
}

export default MyShoes ;
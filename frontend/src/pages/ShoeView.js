import { Container, Row, Col, Image } from 'react-bootstrap';
import MyNav from '../components/MyNav';
import { useParams } from 'react-router-dom';

const ShoeView = (props) => {
    const { id } = useParams();
    

    return ( 
        <>
        {/* <MyNav/>
        <Container>
            <Row>
                <Col>
                    <h1>{shoe.name}</h1>
                    <h2>{shoe.brand}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Image src={shoe.image_src} alt={shoe.name} fluid />
                </Col>
                <Col>
                    <h3>Details</h3>
                    <h4>Price</h4>
                    <p>{shoe.price}</p>
                    <h4>Specs</h4>
                    <p>Weight: {shoe.specs.weight}</p>
                    <p>Drop: {shoe.specs.drop}</p>
                    <p>Stack height: {shoe.specs.stack}</p>
                </Col>
            </Row>
        </Container> */}
        </>
     );
}

export default ShoeView ; 
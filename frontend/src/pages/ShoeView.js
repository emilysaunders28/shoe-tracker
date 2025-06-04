import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import MyNav from '../components/MyNav';
import { useParams, Link } from 'react-router-dom';
import { useShoeById } from '../hooks/useShoebyId'
import { useMyShoes } from '../hooks/useMyShoes'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react';

const ShoeView = (props) => {
    const { id } = useParams();
    console.log(id)

    const { data: shoe, isLoading, isError, error } = useShoeById(id);
    const { data: myShoes, isLoading: myShoesLoading, isError: myShoesIsError, error: myShoesError } = useMyShoes();
    
    const matchedUserShoe = myShoes?.find(userShoe => userShoe.shoe.id.toString() === id);


    return ( 
        <>
        <MyNav/>
        <Container>
        { isLoading? ( <div>Loading shoe...</div> )
        : isError? ( <div>Error fetching shoe: {error.message}</div>)
        : (<>
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
                    <p>Available for {shoe.price} on <a href={shoe.url}>Fleet Feet</a></p>
                    <h4>Specs</h4>
                    <p>Weight: {shoe.specs.weight ? shoe.specs.weight : 'unavailable'}</p>
                    <p>Drop: {shoe.specs.drop ? shoe.specs.drop : 'unavailable'}</p>
                    <p>Stack height: {shoe.specs.stack ? shoe.specs.stack : 'unavailable'}</p>
                    <Button as={Link} to={'/add/' + shoe.id} className="mt-3">
                        {matchedUserShoe ? 'Edit Shoe' : 'Add Shoe'}
                    </Button>
                </Col>
            </Row>
            </>)}
        </Container>
        </>
     );
}

export default ShoeView ; 
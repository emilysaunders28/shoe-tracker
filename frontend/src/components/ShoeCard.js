import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ShoeCard = (props) => {
    const shoe = props.shoe;

    return ( 
        <Card as={Link} to={'/view/' + shoe.id}>
            <Card.Img variant="top" src={shoe.image_src} />
            <Card.Body>
                <Card.Title>{shoe.name}</Card.Title>
                <Card.Text>
                    {shoe.brand}
                </Card.Text>
            </Card.Body>
        </Card>
     );
}

export default ShoeCard;
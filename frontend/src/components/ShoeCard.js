import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const ShoeCard = (props) => {
    const shoe = props.shoe;
    const { data: user } = useUser();
    const isMyShoe = user?.shoes?.some(userShoe => userShoe === shoe.id);


    const navitage = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        navitage('/add/' + shoe.id);
    }

    return ( 
        <Card as={Link} to={'/view/' + shoe.id} className='my-card'>
            <Card.Img variant="top" src={shoe.image_src} />
            <Card.Body>
                <Card.Title>{shoe.name}</Card.Title>
                <Card.Text>
                    <div>
                        {shoe.brand}
                    </div>
                    <div>
                        {shoe.price}
                    </div>
                </Card.Text>
                {user.username && <Button className='btn-sm my-button' onClick={handleClick}>{isMyShoe? 'Edit' : 'Add Shoe'}</Button>}
            </Card.Body>
        </Card>
     );
}

export default ShoeCard;
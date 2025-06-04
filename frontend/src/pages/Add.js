import { useShoeById } from "../hooks/useShoebyId";
import { useMyShoes } from "../hooks/useMyShoes";
import MyNav from "../components/MyNav";
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAdd } from "../hooks/useAdd"; 


const Add = () => {
    const { id } = useParams();

    const { data: shoe, isLoading: shoeIsLoading, isError: shoeIsError, error: shoeError } = useShoeById(id);
    const { data: myShoes, isLoading: myShoesLoading, isError: myShoesIsError, error: myShoesError } = useMyShoes();

    const [rating, setRating] = useState(null);
    const [notes, setNotes] = useState('');
    const [size, setSize] = useState(null);
    const [width, setWidth]  = useState(null);
    const [favorite, setFavorite] = useState(false);
    const [wishlist, setWishlist] = useState(false);

    const matchedUserShoe = myShoes?.find(userShoe => userShoe.shoe.id.toString() === id);
    useEffect(() => {
        if (matchedUserShoe) {
            setRating(matchedUserShoe.rating);
            setNotes(matchedUserShoe.notes);
            setSize(matchedUserShoe.size);
            setWidth(matchedUserShoe.width);
            setFavorite(matchedUserShoe.favorite);
            setWishlist(matchedUserShoe.wishlist);
        }
    }, [matchedUserShoe]);




    const { mutate: addShoe, isLoading: submitting } = useAdd();

    const handleSubmit = ( data ) => {
        addShoe({
            data: {
                shoe_id: id,
                rating,
                notes,
                size,
                width,
                favorite,
                wishlist
            },
        })
    }

    return ( 
        <>
            <MyNav/>
            <Container>
                {
                    shoeIsLoading? (
                        <div>Loading...</div>
                    ) : shoeIsError? (
                        <div>Error fetching shoe data: {shoeError.message}</div>
                    ) : (
                        <>
                            <Row>
                                <Col>
                                    <Image src={shoe.image_src} fluid/>
                                    
                                </Col>
                                <Col>
                                    <h2>{shoe.name}</h2>
                                    <div>{shoe.brand}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Form>
                                    <Form.Check 
                                        label='Favorite'
                                        type='checkbox'
                                        value={favorite}
                                        onChange={(e) => setFavorite(e.target.checked)}
                                    />
                                    <Form.Check
                                        label='Wishlist'
                                        type='checkbox'
                                        value={wishlist}
                                        onChange={(e) => setWishlist(e.target.checked)}
                                    />
                                    <Form.Group>
                                        <Form.Label>
                                            Rating
                                        </Form.Label>
                                        <div>
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <Form.Check
                                                inline
                                                key={value}
                                                type="radio"
                                                label={value}
                                                name="rating"
                                                value={value}
                                                checked={rating === value}
                                                onChange={() => setRating(value)}
                                                onClick={() => {
                                                    if (rating === value) {
                                                        setRating(null)
                                                    } else {
                                                        setRating(value)
                                                    }
                                                }}
                                            />
                                        ))}
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Size</Form.Label>
                                        <Form.Select
                                            value={size || ''}
                                            onChange={(e) => setSize(e.target.value)}
                                        >
                                            <option value={null}>Select your size</option>
                                            {shoe.sizes.map((value) => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Width</Form.Label>
                                        <Form.Select
                                            value={width || ''}
                                            onChange={(e) => setWidth(e.target.value)}
                                        >
                                            <option value={null}>Select your width</option>
                                            {shoe.widths.map((value) => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Notes
                                        </Form.Label>
                                        <Form.Control 
                                            as='textarea'
                                            id='notes'
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button className="my-button" disabled={submitting} onClick={() => handleSubmit()}>Save shoe</Button>
                                </Form>
                            </Row>
                        </>
                    )
                }
            </Container>
        </>
     );
}

export default Add;
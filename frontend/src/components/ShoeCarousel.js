import { useMyShoes } from "../hooks/useMyShoes";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShoeCarousel = (props) => {
    const shoes = props.shoes;
    return ( 
        <Carousel interval={null}>
            {
                shoes.map((shoe) => (
                    <Carousel.Item key={shoe.id} as={Link} to={`/view/${shoe.id}`}>
                        <Image
                            className="d-block w-100"
                            src={shoe.image_src}
                            alt={shoe.name}
                        />
                        <Carousel.Caption>
                            <h3>{shoe.name}</h3>
                            <p>{shoe.brand}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    );
}

export default ShoeCarousel;
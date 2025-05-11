import { useParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import ShoeCard from '../components/ShoeCard';
import { Container, Row, Col } from 'react-bootstrap';
import MyNav from '../components/MyNav'


const Search = (props) => {
    const search = useParams().search;
    const { data: results, isLoading, isError, error } = useSearch(search);


    return ( 
        <>
        <MyNav/>
        <Container>
            <Row>
                <h1>Search results for {search} ({results && results.length})</h1>
            </Row>
            <Row>
                {isLoading ? (
                    <div>Loading results...</div>
                ) : isError? (
                    <div>Error retrieving results: {error.message}</div>
                ) : (
                    results.map((shoe) => (
                        <Col xs={4} key={shoe.id}>
                            <ShoeCard shoe={shoe}/>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
        </>
     );
}

export default Search ;
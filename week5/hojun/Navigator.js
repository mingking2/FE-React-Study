import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Navigator = () => {
    return (
        <>
            <br />
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Link to={'/Weathers'}>Weathers</Link>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <br />
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Link to={'/TodoLists'}>TodoLists</Link>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <br />
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Link to={'/Movies'}>Movies</Link>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <br />
        </>
    )
}

export default Navigator
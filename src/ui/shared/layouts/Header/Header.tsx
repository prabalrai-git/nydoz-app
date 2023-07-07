import Images from "../../../../constants/Images";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
    return (
        <Navbar expand='md' bg='white'>
            <Container>
                <Navbar.Brand href='#home'>
                    <img
                        className='navbar-brand-img '
                        src={Images.CompanyLogo}
                        alt='Nydoz'
                    />
                </Navbar.Brand>
                <Nav className='mx-auto'>
                    <LinkContainer to='/home'>
                        <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                    <Nav.Link href='#features'>Products</Nav.Link>

                    <LinkContainer className='btn btn-primary' to='/auth/login'>
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;

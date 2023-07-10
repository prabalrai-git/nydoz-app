import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Images from "../../../../constants/Images";
import Hamburger from "../../atoms/Hamburger";

function UserNavbar() {
    return (
        <Navbar
            expand='md'
            className='bg-white min-h-80px shadow shadow-sm fw-bolder navbar-fixed-top '>
            <Container>
                <Navbar.Brand href='#home'>
                    <div>
                        <Hamburger />
                        <img
                            className='navbar-brand-img '
                            src={Images.CompanyLogo}
                            alt='Company Logo'
                        />
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <Nav.Link href='#home'>My Workspace</Nav.Link>
                        <Nav.Link href='#link'>Link</Nav.Link>
                        <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                            <NavDropdown.Item href='#action/3.2'>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href='#action/3.3'>
                                Setting
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='#action/3.4'>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default UserNavbar;

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Users Profile</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#">Profiles</Nav.Link>
            <Nav.Link href="#">Add User</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
export default Header;

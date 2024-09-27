import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">NavBar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: "auto" }}>
            <Link
              to="/"
              style={{
                color: "black",
                textDecoration: "none",
                marginLeft: "30px",
                fontSize: "24px",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: "black",
                textDecoration: "none",
                marginLeft: "30px",
                fontSize: "24px",
              }}
            >
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

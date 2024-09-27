import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { auth, db } from "./Firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function NavHome() {
  const [userDetails, setuserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setuserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not Logged In");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("User LoggedOut Successfully");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <h1>Welcome {userDetails.fullname} </h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav style={{ marginLeft: "auto" }}>
                <Link
                  to="/logout"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontSize: "24px",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        ""
      )}
    </div>
  );
}

export default NavHome;

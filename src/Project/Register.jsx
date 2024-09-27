import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";

function Register() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [phone, setphone] = useState("");
  const [conformPassword, setconformPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fullname: fullname,
        });
      }
      console.log("User Registered Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-oLoCFCko0ZqNWIbGxBgx0SJLxlmnQtKo-wAxKwMjw4K1wlm4MWdTnSZocbQRC5NHS4&usqp=CAU)",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div style={{ paddingTop: "200px" }}>
        <Form
          style={{
            width: "40%",
            height: "500px",
            marginLeft: "30%",
            borderRadius: "2%",
            padding: "40px 100px",
            backgroundColor: "#EBF5FB ",
          }}
          onSubmit={handleRegister}
        >
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
            REGISTER
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ paddingRight: "40px" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your User Name"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Phone Number"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Conform Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Conform Password"
                  value={conformPassword}
                  onChange={(e) => setconformPassword(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button
              type="submit"
              size="lg"
              style={{
                marginTop: "30px",
                backgroundColor: "#5499C7",
              }}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;

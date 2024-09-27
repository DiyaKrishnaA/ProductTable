import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CiUser } from "react-icons/ci";
import { auth } from "./Firebase";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In successfully");
      window.location.href = "/home";
    } catch (error) {}
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
            width: "20%",
            height: "500px",
            marginLeft: "40%",
            borderRadius: "5%",
            padding: "40px",
            backgroundColor: "#EBF5FB ",
          }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <CiUser
              size="90px"
              style={{ marginLeft: "100px", marginBottom: "20px" }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              size="lg"
              type="submit"
              style={{
                marginTop: "30px",
                backgroundColor: "#5499C7",
              }}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

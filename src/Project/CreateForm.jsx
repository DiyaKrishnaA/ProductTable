import { createContext, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navbarcontext } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

function CreateForm() {
  const navigate = useNavigate();
  const { setshowNav, setshowNavHome, product, setproduct } =
    useContext(Navbarcontext);

  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [rating, setrating] = useState("");
  const [returnPolicy, setreturnPolicy] = useState("");

  const object = {
    title: title,
    category: category,
    price: price,
    rating: rating,
    returnPolicy: returnPolicy,
  };

  console.log(object);
  useEffect(() => {
    setshowNav(false);
    setshowNavHome(false);
  }, []);

  const handleTitle = (e) => {
    settitle(e.target.value);
  };
  const handlecategory = (e) => {
    setcategory(e.target.value);
  };
  const handleprice = (e) => {
    setprice(e.target.value);
  };
  const handlerating = (e) => {
    setrating(e.target.value);
  };
  const handlereturnpolicy = (e) => {
    setreturnPolicy(e.target.value);
  };

  const addproduct = (e) => {
    navigate("/home");
    const newproduct = [...product, object];
    setproduct(newproduct);
    e.preventDefault();
    toast.success("Created successfully", { position: "bottom-center" });
  };
  console.log(product);
  // console.log(product);
  // console.log(title);
  // console.log(category);
  // console.log(price);
  // console.log(rating);
  // console.log(returnPolicy);

  return (
    <div>
      <Form
        style={{
          width: "35%",
          height: "650px",
          marginLeft: "35%",
          marginTop: "10%",
          borderRadius: "2%",
          padding: "40px",
          backgroundColor: "#EBF5FB ",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Create Form</h1>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={handlecategory}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={handleprice}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter rating"
            value={rating}
            onChange={handlerating}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Return Policyss</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter return policy"
            value={returnPolicy}
            onChange={handlereturnpolicy}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button
            size="lg"
            type="submit"
            style={{
              marginTop: "30px",
            }}
            onClick={addproduct}
          >
            Create Product
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default CreateForm;

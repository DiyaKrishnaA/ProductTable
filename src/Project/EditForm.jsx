import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navbarcontext } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function EditForm() {
  const navigate = useNavigate();

  const {
    setshowNav,
    setshowNavHome,
    productid,
    setproductid,
    product,
    setproduct,
  } = useContext(Navbarcontext);

  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [rating, setrating] = useState("");
  const [returnPolicy, setreturnPolicy] = useState("");

  console.log(product);

  // const object = {
  //   title: title,
  //   category: category,
  //   price: price,
  //   rating: rating,
  //   returnPolicy: returnPolicy,
  // };
  // console.log(object);

  useEffect(() => {
    setshowNav(false);
    setshowNavHome(false);

    const formProduct = product.find((item) => item.id === productid);
    if (formProduct) {
      settitle(formProduct.title);
      setcategory(formProduct.category);
      setprice(formProduct.price);
      setrating(formProduct.rating);
      setreturnPolicy(formProduct.returnPolicy);
    }
    console.log(formProduct);
  }, []);

  // const filterById = (productid) => {
  //   return product.filter((productitem) => productitem.id === productid);
  // };
  // const filteredId = filterById(productid);
  // console.log(filteredId);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = product.map((productitem) =>
      productitem.id === productid
        ? { ...productitem, title, category, price, rating, returnPolicy }
        : productitem
    );

    setproduct(newProduct);

    setTimeout(() => {
      navigate("/home");
    }, 3000);
    toast.success("Edited successfully");
  };

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
        onSubmit={handleSubmit}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>Edit Form</h1>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Enter title"
              defaultValue={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Enter category"
              defaultValue={category}
              onChange={(e) => setcategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>price</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Enter price"
              defaultValue={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Enter rating"
              defaultValue={rating}
              onChange={(e) => setrating(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Return Policyss</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Enter return policy"
              defaultValue={returnPolicy}
              onChange={(e) => setreturnPolicy(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              size="lg"
              type="submit"
              style={{
                marginTop: "30px",
              }}
              // onClick={addproduct}
            >
              Edit Product
            </Button>
          </div>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default EditForm;

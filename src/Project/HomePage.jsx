import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Navbarcontext } from "../App";
import { Button, Modal, Table } from "react-bootstrap";
import { IoEyeSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Rating, Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function HomePage() {
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState(null);
  const [show, setShow] = useState(false);
  const [ShowDelete, setShowDelete] = useState(false);
  const [search, setsearch] = useState("");

  const {
    setshowNav,
    setshowNavHome,
    product,
    setproduct,
    productid,
    setproductid,
  } = useContext(Navbarcontext);

  const routetoForm = (e) => {
    e.preventDefault();
    navigate("/createform");
  };

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
    setshowNav(false);
    setshowNavHome(true);
  }, []);

  console.log(product);

  const filterById = (productid) => {
    return product.filter((productitem) => productitem.id === productid);
  };
  const filteredId = filterById(productid);
  console.log(filteredId);

  const getitemid = (id) => {
    setproductid(id);
    console.log(id);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setShowDelete(false);
  };

  const getdeleteitemid = (id) => {
    setproductid(id);
    console.log(id);
    setShowDelete(true);
  };

  const handleDelete = () => {
    setproduct(product.filter((productitem) => productitem.id !== productid));
    toast.success(`${filteredId[0]?.title} deleted successfully`, {
      position: "top-center",
    });
  };
		const handleSearch = (e) => {
		  setsearch(e.target.value);
		};

		const filteredProduct = product.filter((item) =>
		  item.title.toLowerCase().includes(search.toLowerCase())
		);
		console.log(search);
		console.log(filteredProduct);

  return (
    <div>
      {userDetails ? (
        <>
          <ToastContainer />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <input
                type="search"
                placeholder="search..."
                onChange={handleSearch}
              />
            </div>
            <div>
              <Button style={{ marginLeft: "10px" }}>Search</Button>
            </div>
          </div>
          {/* {filteredProduct ? ( */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Return Policy </th>
              </tr>
            </thead>{" "}
            {filteredProduct.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.rating}</td>
                    <td>{item.returnPolicy}</td>
                    <td>
                      <IoEyeSharp
                        size="23px"
                        color="green"
                        style={{ marginRight: "20px" }}
                        onClick={() => getitemid(item.id)}
                      />
                      {filteredId.map((i, index) => {
                        return (
                          <Modal
                            key={index}
                            show={show}
                            onHide={handleClose}
                            animation={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>{i.title}</Modal.Title>
                            </Modal.Header>
                            <img src={i.images[0]} alt="" height="400px" />
                            <Modal.Body>Category: {i.category}</Modal.Body>
                            <Modal.Body>Price: {i.price}</Modal.Body>
                            <Modal.Body>
                              Rating:
                              <Stack spacing={1}>
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={i.rating}
                                  precision={0.5}
                                  readOnly
                                />
                              </Stack>
                            </Modal.Body>
                            <Modal.Body>
                              Return Policy: {i.returnPolicy}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleClose}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        );
                      })}

                      <Link to="/editform">
                        <MdEdit
                          size="23px"
                          color="blue"
                          style={{ marginRight: "15px" }}
                          onClick={() => getitemid(item.id)}
                        />
                      </Link>
                      <RiDeleteBin5Fill
                        size="23px"
                        color="red"
                        style={{ marginLeft: "10px" }}
                        onClick={() => getdeleteitemid(item.id)}
                      />

                      {filteredId.map((i, index) => {
                        return (
                          <Modal
                            key={index}
                            show={ShowDelete}
                            onHide={handleClose}
                            animation={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete the product{" "}
                              <b>{i.title}</b>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Cancel
                              </Button>
                              <Button variant="primary" onClick={handleDelete}>
                                Delete
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        );
                      })}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <div
            style={{
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "20px",
            }}
          >
            <Button
              size="lg"
              type="submit"
              style={{ backgroundColor: "blue" }}
              onClick={routetoForm}
            >
              Create Product
            </Button>
          </div>
          {/* ) : (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Return Policy </th>
                  </tr>
                </thead>
                {product.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.rating}</td>
                        <td>{item.returnPolicy}</td>
                        <td>
                          <IoEyeSharp
                            size="23px"
                            color="green"
                            style={{ marginRight: "20px" }}
                            onClick={() => getitemid(item.id)}
                          />
                          {filteredId.map((i, index) => {
                            return (
                              <Modal
                                key={index}
                                show={show}
                                onHide={handleClose}
                                animation={false}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>{i.title}</Modal.Title>
                                </Modal.Header>
                                <img src={i.images[0]} alt="" height="400px" />
                                <Modal.Body>Category: {i.category}</Modal.Body>
                                <Modal.Body>Price: {i.price}</Modal.Body>
                                <Modal.Body>
                                  Rating:
                                  <Stack spacing={1}>
                                    <Rating
                                      name="half-rating-read"
                                      defaultValue={i.rating}
                                      precision={0.5}
                                      readOnly
                                    />
                                  </Stack>
                                </Modal.Body>
                                <Modal.Body>
                                  Return Policy: {i.returnPolicy}
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={handleClose}
                                  >
                                    Save Changes
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            );
                          })}

                          <Link to="/editform">
                            <MdEdit
                              size="23px"
                              color="blue"
                              style={{ marginRight: "15px" }}
                              onClick={() => getitemid(item.id)}
                            />
                          </Link>
                          <RiDeleteBin5Fill
                            size="23px"
                            color="red"
                            style={{ marginLeft: "10px" }}
                            onClick={() => getdeleteitemid(item.id)}
                          />

                          {filteredId.map((i, index) => {
                            return (
                              <Modal
                                key={index}
                                show={ShowDelete}
                                onHide={handleClose}
                                animation={false}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Delete</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Are you sure you want to delete the product{" "}
                                  <b>{i.title}</b>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={handleDelete}
                                  >
                                    Delete
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            );
                          })}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
              <div
                style={{
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "20px",
                }}
              >
                <Button
                  size="lg"
                  type="submit"
                  style={{ backgroundColor: "blue" }}
                  onClick={routetoForm}
                >
                  Create Product
                </Button>
              </div> */}
          {/* </div> */}
        </>
      ) : (
        <Spinner
          animation="border"
          variant="primary"
          style={{ marginLeft: "50%", marginTop: "25%" }}
        />
      )}
      {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Return Policy </th>
              </tr>
            </thead>
            {product.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.rating}</td>
                    <td>{item.returnPolicy}</td>
                    <td>
                      <IoEyeSharp
                        size="23px"
                        color="green"
                        style={{ marginRight: "20px" }}
                        onClick={() => getitemid(item.id)}
                      />
                      {filteredId.map((i, index) => {
                        return (
                          <Modal
                            key={index}
                            show={show}
                            onHide={handleClose}
                            animation={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>{i.title}</Modal.Title>
                            </Modal.Header>
                            <img src={i.images[0]} alt="" height="400px" />
                            <Modal.Body>Category: {i.category}</Modal.Body>
                            <Modal.Body>Price: {i.price}</Modal.Body>
                            <Modal.Body>
                              Rating:
                              <Stack spacing={1}>
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={i.rating}
                                  precision={0.5}
                                  readOnly
                                />
                              </Stack>
                            </Modal.Body>
                            <Modal.Body>
                              Return Policy: {i.returnPolicy}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleClose}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        );
                      })}

                      <Link to="/editform">
                        <MdEdit
                          size="23px"
                          color="blue"
                          style={{ marginRight: "15px" }}
                          onClick={() => getitemid(item.id)}
                        />
                      </Link>
                      <RiDeleteBin5Fill
                        size="23px"
                        color="red"
                        style={{ marginLeft: "10px" }}
                        onClick={() => getdeleteitemid(item.id)}
                      />

                      {filteredId.map((i, index) => {
                        return (
                          <Modal
                            key={index}
                            show={ShowDelete}
                            onHide={handleClose}
                            animation={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete the product{" "}
                              <b>{i.title}</b>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Cancel
                              </Button>
                              <Button variant="primary" onClick={handleDelete}>
                                Delete
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        );
                      })}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <div
            style={{
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "20px",
            }}
          >
            <Button
              size="lg"
              type="submit"
              style={{ backgroundColor: "blue" }}
              onClick={routetoForm}
            >
              Create Product
            </Button>
          </div>
        </>
      ) : (
        <Spinner
          animation="border"
          variant="primary"
          style={{ marginLeft: "50%", marginTop: "25%" }}
        />
      )} */}
      {/* {filteredProduct ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Return Policy </th>
            </tr>
          </thead>{" "}
          {filteredProduct.map((item) => {
            return (
              <tbody>
                <tr>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.rating}</td>
                  <td>{item.returnPolicy}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default HomePage;

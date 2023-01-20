import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./View.css";
import { Link } from "react-router-dom";

const View = () => {
  const [id, setID] = useState(0);
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [discountpercentage, setDiscountPercentage] = useState();
  const [images, setImages] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [stock, setStock] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [title, setTitle] = useState();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (item_id) => {
    setShow(true);

    axios.get(`https://dummyjson.com/products/${item_id}`).then((res) => {
      setID(res.data.id);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setDiscountPercentage(res.data.discountPercentage);
      setRating(res.data.rating);
      setStock(res.data.stock);
    });
  };

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      setData(response.data.products);
    });
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= data.length / 5 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const showData = (data) => {
    if (data.length > 0) {
      return data.slice(page * 5 - 5, page * 5).map((item, index) => {
        const item_id = item.id;
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.discountPercentage}</td>
            <td>{item.rating}</td>
            <td>{item.stock}</td>
            <td>
              {" "}
              <Link
                variant="primary"
                onClick={() => {
                  handleShow(item_id);
                }}
              >
                Edit
              </Link>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td>No Data Available</td>
        </tr>
      );
    }
  };

  return (
    <div className="main-table">
      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" value={id} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" value={price} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="text" value={discountpercentage} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="text" value={rating} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="text" value={stock} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showData(data)}</tbody>
      </Table>
      {data.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>

          {[...Array(data.length / 5)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < data.length / 5 ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
};

export default View;

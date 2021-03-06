import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addProductdata } from "../../actions/productActions";

import classnames from "classnames";

function AddProduct(props) {
  
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");

  const [ProductCategory, setProductCategory] = useState("");

  const [ProductQuantity, setProductQuantity] = useState("");

  const [productErrors, setProductError] = useState("");

  useEffect(() => {
    setProductError({ ...productErrors, errors });
  }, [errors]);

  const onNameChange = (event) => {
    setProductName(event.currentTarget.value);
  };
  const onPriceChange = (event) => {
    setProductPrice(event.currentTarget.value);
  };
  const onQuantityChange = (event) => {
    setProductQuantity(event.currentTarget.value);
  };
  const onCategoryChange = (event) => {
    setProductCategory(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const productData = {
      productOwner: props.auth.user.id,
      productOwnerId: props.auth.user.id,
      productName: ProductName,
      category: ProductCategory,
      qty: ProductQuantity,
      price: ProductPrice,
    };
    console.log(productData);

    dispatch(addProductdata(productData, props.history));
    console.log(errors);
  };

  return (
    <div className="container">
      <Row>
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="productName">
              <Form.Label hidden={errors.productName ? true : false}>
                Product Name
              </Form.Label>
              <Form.Control
                onChange={onNameChange}
                value={ProductName}
                type="text"
                placeholder="Product Name"
                isInvalid={!!errors.productName}
              />
              <Form.Control.Feedback className="red-text" type="invalid">
                {errors.productName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="categoryName">
              <Form.Label hidden={errors.category ? true : false}>
                Product Category
              </Form.Label>
              <Form.Control
                onChange={onCategoryChange}
                value={ProductCategory}
                type="text"
                placeholder="Product Category"
                isInvalid={!!errors.category}
              />
              <Form.Control.Feedback className="red-text" type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label hidden={errors.price ? true : false}>
                Product Price
              </Form.Label>
              <Form.Control
                onChange={onPriceChange}
                value={ProductPrice}
                type="number"
                placeholder="Product Price"
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback className="red-text" type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="availableQuantity">
              <Form.Label hidden={errors.qty ? true : false}>
                Available Quantity
              </Form.Label>
              <Form.Control
                onChange={onQuantityChange}
                value={ProductQuantity}
                type="number"
                placeholder="Available Quantity"
                isInvalid={!!errors.qty}
              />
              <Form.Control.Feedback className="red-text" type="invalid">
                {errors.qty}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col>2</Col>
        <Col>3</Col>
      </Row>
    </div>
  );
}

export default AddProduct;

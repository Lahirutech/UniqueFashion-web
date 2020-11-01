import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";

function ViewMyProducts(props) {
  const userId = props.auth.user.id;
  console.log(userId);

  const [Myproductdata, setmydata] = useState([]);

  // gett all my product list
  useEffect(() => {
    Axios.get(`/api/admin/get_my_products/${userId}`).then((productdataset) => {
      console.log(productdataset);
      setmydata(productdataset.data.products);
    });
  }, []);

  console.log(Myproductdata);

  const productCards = Myproductdata.map((product, index) => {
    console.log(product);
    return (
      <Col lg={6} md={8} xs={24}>
        <Card style={{ width: "18rem" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body key={product._id}>
            <Card.Title>{product._id}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  const MyShopItems = ({ Myproductdata }) => {
    console.log(Myproductdata);
    const itemset = Myproductdata.map((product, index) => (
      <Col>
        <Card style={{ width: "18rem" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body key={product._id}>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Text>
              <p>
                {" "}
                <b>Qty</b> {product.qty}
              </p>
              <p>
                <b>Category</b> {product.category}
              </p>
              <p>
                {" "}
                <b>Price</b> {product.price}
              </p>
            </Card.Text>
            <Button href={`/editProduct/${product._id}`} variant="primary">Edit Product</Button>
            <Button variant="primary">Delete Product</Button>
          </Card.Body>
        </Card>
      </Col>
    ));
    return itemset;
  };

  const ProductItems = () => <div>{productCards} </div>;

  return (
    <div>
      <Row>
        {Myproductdata ? (
          <MyShopItems Myproductdata={Myproductdata} />
        ) : (
          <p>Loading</p>
        )}
      </Row>
    </div>
  );
}

export default ViewMyProducts;

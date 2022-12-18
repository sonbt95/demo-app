import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./Product";
import { Col, Container, Row, Card, Button, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/action";
export default function Categories() {
  const [product, setProduct] = useState(Product);
  const filterResult = (item) => {
    const result = Product.filter((e) => {
      return e.category === item;
    });
    setProduct(result);
  };
  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
  };
  const filterResult1 = (item) => {
    const result = Product.filter((e) => {
      return e.system === item;
    });
    setProduct(result);
  };
  return (
    <Container fluid className="my-3 s">
      <CardGroup>
        <Card className="main m-2 rounded bg-dark text-light ">
          <Card.Text
            className="my-3 text fw-semibold"
            onClick={() => filterResult("Phone")}
          >
            <i class="bi bi-phone mx-3"></i>Điện thoại
          </Card.Text>
          <Card.Text>
            <div
              class="pretty p-icon p-curve p-tada ms-5"
              onClick={() => filterResult1("Apple")}
            >
              <input type="radio" name="radio66" />
              <div class="state p-black-o">
                <i class="icon bi bi-check"></i>
                <label>Apple</label>
              </div>
            </div>
          </Card.Text>
          <Card.Text>
            <div
              class="pretty p-icon p-curve p-tada ms-5"
              onClick={() => filterResult1("Android")}
            >
              <input type="radio" name="radio66" />
              <div class="state p-success-o">
                <i class="icon bi bi-check"></i>
                <label>Android</label>
              </div>
            </div>
          </Card.Text>

          <Card.Text
            className="my-3 text fw-semibold"
            onClick={() => filterResult("Laptop")}
          >
            <i class="bi bi-laptop mx-3"></i>Máy tính
          </Card.Text>
          <Card.Text>
            <div
              class="pretty p-icon p-curve p-tada ms-2"
              onClick={() => filterResult1("Gaming")}
            >
              <input type="radio" name="radio66" />
              <div class="state p-primary-o">
                <i class="icon bi bi-check"></i>
                <label>Laptop Gaming</label>
              </div>
            </div>
          </Card.Text>
          <Card.Text>
            <div
              class="pretty p-icon p-curve p-tada ms-2"
              onClick={() => filterResult1("Macbook")}
            >
              <input type="radio" name="radio66" />
              <div class="state p-danger-o">
                <i class="icon bi bi-check"></i>
                <label>Macbook</label>
              </div>
            </div>
          </Card.Text>

          <Card.Text
            className="my-3 text fw-semibold"
            onClick={() => filterResult("Tablet")}
          >
            <i class="bi bi-tablet-fill mx-3"></i>Tablet
          </Card.Text>
        </Card>
        <Card style={{ border: "none", height: "100%" }}>
          <Row xxl={4} xl={4} lg={3} md={2} xs={1}>
            {product.map((e) => (
              <Col className="my-2">
                <Card
                  style={{
                    width: "15rem",
                    height: "100%",
                    textAlign: "center",
                    objectFit: "cover",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`/img/${e.image}`}
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                  <Card.Img
                    variant="top"
                    src={`/img/${e.special}`}
                    style={{ width: "40px", height: "40px", marginLeft: "3px" }}
                  />
                  <Card.Body>
                    <Card.Title className="fs-6 ">{e.title}</Card.Title>
                    <Card.Text>
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ "font-size": "12px" }}
                      >
                        <p className="rounded-pill  text-dark bg-opacity-25  mx-2">
                          {e.camera1}
                        </p>
                        <p className="rounded-pill  text-dark bg-opacity-25">
                          {e.camera2}
                        </p>
                      </div>
                    </Card.Text>
                    <Card.Text className="fs-5 fst-normal fw-semibold">
                      {parseFloat(e.price).toFixed(3)}.000{" "}
                      <sup className="text-success fw-semibold text-decoration-underline">
                        đ
                      </sup>
                    </Card.Text>
                    <div className=" d-flex justify-content-between align-items-center">
                      <Button
                        variant="outline-dark"
                        className="fw-semibold mx-2"
                        onClick={() => send(e)}
                      >
                        Giỏ hàng
                      </Button>
                      <Link
                        to={`/procduct/${e.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outline-danger"
                          className="fw-semibold mx-2"
                        >
                          Chi tiết
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </CardGroup>
    </Container>
  );
}

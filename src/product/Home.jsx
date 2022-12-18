import React, { useState } from "react";
import Product from "./Product";
import logo1 from "../logo1.png";
import logo2 from "../logo2.png";
import logo3 from "../logo3.png";
import {
  Col,
  Container,
  Row,
  Card,
  CardGroup,
  Carousel,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/action";
export default function Home() {
  const [product, setProduct] = useState(Product);
  const filterResult = (item) => {
    const result = Product.filter((e) => {
      return e.system === item;
    });
    setProduct(result);
  };
  const prices = () => {
    const s = Product.filter((a) => {
      return a.price < 5;
    });
    setProduct(s);
  };
  const pricel = () => {
    const l = Product.filter((a) => {
      return a.price > 5 && a.price < 15;
    });
    setProduct(l);
  };
  const priceS = () => {
    const t = Product.filter((a) => {
      return a.price > 20;
    });
    setProduct(t);
  };
  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
  };
  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-center align-item-center">
        <Carousel style={{ width: "100%", marginRight: "20px" }}>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src={logo1}
              alt="First slide"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src={logo2}
              alt="Second slide"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={logo3}
              alt="Third slide"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="d-flex justify-content-center align-items-center my-3">
        <div
          class="pretty p-icon p-curve p-tada ms-5"
          onClick={() => filterResult("Apple")}
        >
          <input type="radio" name="radio66" />
          <div class="state p-black-o">
            <i class="icon bi bi-check"></i>
            <label>Apple</label>
          </div>
        </div>
        <div
          class="pretty p-icon p-curve p-tada"
          onClick={() => filterResult("Android")}
        >
          <input type="radio" name="radio66" />
          <div class="state p-success-o">
            <i class="icon bi bi-check"></i>
            <label>Android</label>
          </div>
        </div>
        <div
          class="pretty p-icon p-curve p-tada"
          onClick={() => filterResult("Gaming")}
        >
          <input type="radio" name="radio66" />
          <div class="state p-primary-o">
            <i class="icon bi bi-check"></i>
            <label>Laptop Gaming</label>
          </div>
        </div>
        <div
          class="pretty p-icon p-curve p-tada"
          onClick={() => filterResult("Macbook")}
        >
          <input type="radio" name="radio66" />
          <div class="state p-danger-o">
            <i class="icon bi bi-check"></i>
            <label>Macbook</label>
          </div>
        </div>
        <div class="pretty p-icon p-curve p-tada" onClick={() => prices()}>
          <input type="radio" name="radio66" />
          <div class="state p-success-o">
            <i class="icon bi bi-check"></i>
            <label>Giá từ 2-5 triệu</label>
          </div>
        </div>
        <div class="pretty p-icon p-curve p-tada" onClick={() => pricel()}>
          <input type="radio" name="radio66" />
          <div class="state p-success-o">
            <i class="icon bi bi-check"></i>
            <label>Giá từ 5 triệu trở lên</label>
          </div>
        </div>
        <div class="pretty p-icon p-curve p-tada" onClick={() => priceS()}>
          <input type="radio" name="radio66" />
          <div class="state p-danger-o">
            <i class="icon bi bi-check"></i>
            <label className="text-danger">VIP</label>
          </div>
        </div>
        <div
          class="pretty p-icon p-curve p-tada"
          onClick={() => setProduct(Product)}
        >
          <input type="radio" name="radio66" />
          <div class="state p-primary-o">
            <i class="icon bi bi-check"></i>
            <label>Tất cả</label>
          </div>
        </div>
      </div>
      <CardGroup>
        <Card style={{ border: "none" }}>
          <Row xxl={4} xl={4} lg={3} md={2} xs={1}>
            {product.map((e) => (
              <Col className="my-2 ">
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
                      <sup className=" text-success fw-semibold text-decoration-underline">
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

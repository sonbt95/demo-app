import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "../components/Detail.css";
import { ADD, DLT, REMOVE } from "../redux/action";
import Comments from "./Comment";
import Product from "./Product";
const Detail = () => {
  const { id } = useParams();
  const showLeft = () => {
    const pop_song = document.getElementsByClassName("music")[0];
    pop_song.scrollLeft -= 300;
  };
  const showRight = () => {
    const pop_song = document.getElementsByClassName("music")[0];
    pop_song.scrollLeft += 300;
  };
  const [show, setShow] = useState(false);

  const [product, setData] = useState([]);

  const history = useNavigate();

  const dispatch = useDispatch();

  const getdata = useSelector((state) => state.shopReducer.carts);

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  const send = (e) => {
    dispatch(ADD(e));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  useEffect(() => {
    compare();
  }, [id]);
  return (
    <Container fluid className="my-5">
      <Alert
        show={show}
        variant="info"
        className="position-absolute top-0 start-50 mt-5"
      >
        <Alert.Heading></Alert.Heading>
        <p className="m-2 text-center">Cảm ơn bạn đã yêu thích sản phẩm này</p>
        <Button
          onClick={() => setShow(false)}
          variant=""
          className="position-absolute top-0 end-0 fs-4 fw-bolder"
        >
          <i class="bi bi-x"></i>
        </Button>
      </Alert>
      <Card className="mb-3" style={{ border: "none" }}>
        <Row className="d-col-flex justify-content-center align-items-center">
          <Col md={3}>
            <Card.Img
              variant="top"
              src={`/img/${Product[id - 1].image}`}
              className="img-thumbnail"
              style={{ border: "none", maxWidth: "500px" }}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="fs-4 fw-semibold text-dark">
                {Product[id - 1].title}
              </Card.Title>
              <Card.Text>{Product[id - 1].description}</Card.Text>
              <Card.Text>
                <p>
                  {" "}
                  <strong>Giá</strong> :{" "}
                  <span className=" fs-6 fw-semibold text-danger">
                    {" "}
                    {parseFloat(Product[id - 1].price).toFixed(3)}.000
                  </span>{" "}
                  <sup className="text-success fw-semibold text-decoration-underline">
                    đ
                  </sup>
                </p>
              </Card.Text>
              <Card.Text className="d-flex ">
                <p className="fw-bolder">Màn hình: </p>
                <p className="mx-2 fw-semibold text-danger border border-danger rounded-pill px-1">
                  {Product[id - 1].camera1}
                </p>
                <p className="me-2 fw-semibold text-danger border border-danger rounded-pill px-1">
                  {Product[id - 1].camera2}
                </p>
              </Card.Text>
              <Card.Text className="d-flex ">
                <p className="fw-bolder">Dung lượng: </p>
                <p className="mx-2 fw-semibold text-success border border-success rounded-pill px-1">
                  {Product[id - 1].capacity1}
                </p>
                <p className="me-2 fw-semibold text-success border border-success rounded-pill px-1">
                  {Product[id - 1].capacity2}
                </p>
                <p className="me-2 fw-semibold text-success border border-success rounded-pill px-1">
                  {Product[id - 1].capacity3}
                </p>
                <p className="me-2 fw-semibold text-success border border-success rounded-pill px-1">
                  {Product[id - 1].capacity4}
                </p>
              </Card.Text>
              <Card.Text className="d-flex ">
                <p className="fw-bolder">Đánh giá: </p>
                <p className="ms-2 fw-semibold text-success">
                  {parseFloat(Product[id - 1].rating).toFixed(1)}
                </p>
                <i class="bi bi-star-fill text-warning"></i>
              </Card.Text>
              <Card.Text className="d-flex ">
                <p className="fw-bolder">Lượt người yêu thích: </p>
                <p className="ms-2 fw-semibold text-success">
                  {Product[id - 1].evaluate}
                </p>
              </Card.Text>
              <Card.Text className="d-flex ">
                <p className="fw-bolder">Hệ Điều hành: </p>
                <p className="ms-2 fw-semibold text-danger">
                  {Product[id - 1].system}
                </p>
              </Card.Text>
              <Card.Text className="d-flex">
                <Button
                  variant="outline-danger"
                  className="fw-semibold mx-2"
                  onClick={() => send(Product[id - 1])}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Card.Img
                  variant="top"
                  src={`/img/${Product[id - 1].special}`}
                  style={{ width: "50px", transform: "rotate(25deg)" }}
                />
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <main>
        <div className="h4">
          <h4>Sản phẩm liên quan</h4>
          <div className="btn_s">
            <i className="bi bi-arrow-left-short" onClick={showLeft}></i>
            <i className="bi bi-arrow-right-short" onClick={showRight}></i>
          </div>
        </div>
        <div className="music">
          {Product.map((e) => (
            <div className="pop_song">
              <li className="songItem">
                <div className="img_play">
                  <img src={`/img/${e.image}`} alt="" />
                  <div className="sci">
                    <i
                      className="bi bi-heart"
                      onClick={() => setShow(true)}
                    ></i>
                    <i
                      className="bi bi-basket-fill"
                      onClick={() => send(e)}
                    ></i>
                    <Link to={`/procduct/${e.id}`}>
                      <i className="bi bi-three-dots"></i>
                    </Link>
                  </div>
                </div>
                <h5 className="text-center fs-6">
                  {e.title}
                  <div className="subtitle text-danger fs-6">
                    {parseFloat(e.price).toFixed(3)}.000{" "}
                    <sup className="text-success fw-semibold text-decoration-underline">
                      đ
                    </sup>
                  </div>
                </h5>
              </li>
            </div>
          ))}
        </div>
      </main>
      <div className="mt-3">
        <Comments></Comments>
      </div>
    </Container>
  );
};

export default Detail;

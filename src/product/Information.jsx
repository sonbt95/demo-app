import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  NavLink,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import c1 from "../c1.png";
import c2 from "../c2.png";

export function Information() {
  const [price, setPrice] = useState(0);

  const [show, setShow] = useState(false);
  const total = () => {
    let price = 0;
    getdata.map((e, k) => {
      price = e.price * e.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);
  const getdata = useSelector((state) => state.shopReducer.carts);
  console.log(getdata);
  return (
    <Container className="signup">
      <Alert
        show={show}
        variant="danger"
        className="position-absolute top-0 end-0"
      >
        <Alert.Heading></Alert.Heading>
        <p className="m-2 text-center">
          Đơn hàng của bạn đang được xác minh.Chờ trong giây lát.
        </p>
        <Button
          onClick={() => setShow(false)}
          variant=""
          className="position-absolute top-0 end-0 fs-4 fw-bolder"
        >
          <i class="bi bi-x"></i>
        </Button>
      </Alert>
      <Form>
        <h2 className="fs-5 fw-semibold text-danger mb-4">
          Đăng ký thông tin khách hàng
        </h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Địa chỉ Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Họ và tền</Form.Label>
          <Form.Control type="text" placeholder="Họ và tên" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control type="text" placeholder="Địa chỉ nhận hàng" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Số diện thoại</Form.Label>
          <Form.Control type="number" placeholder="VD: (+84)" />
        </Form.Group>

        <Form.Group>
          <div class="pretty p-icon p-round p-plain p-smooth my-4">
            <input type="radio" name="plain" />
            <div class="state p-danger-o">
              <i class="icon bi bi-bank"></i>
              <label>
                <img src={c1} style={{ width: "30px", objectFit: "cover" }} />
              </label>
            </div>
          </div>

          <div class="pretty p-icon p-round p-plain p-smooth">
            <input type="radio" name="plain" />
            <div class="state p-info-o">
              <i class="icon bi bi-bank"></i>
              <label>
                <img src={c2} style={{ width: "30px", objectFit: "cover" }} />
              </label>
            </div>
          </div>

          <div class="pretty p-icon p-round p-plain p-smooth mb-3">
            <input type="radio" name="plain" />
            <div class="state p-success-o">
              <i class="icon bi bi-bank"></i>
              <label>Nhận hàng rồi thanh toán </label>
            </div>
          </div>
        </Form.Group>
        <Form.Group className="my-3">
          <div class="pretty p-icon p-round p-pulse">
            <input type="checkbox" />
            <div class="state p-info">
              <i class="icon bi bi-check2"></i>
              <label className="text-danger">
                Bằng cách đặt hàng, bạn đồng ý với Điều khoản sử dụng của chúng
                tôi
              </label>
            </div>
          </div>
        </Form.Group>
        <Button variant="primary" onClick={() => setShow(true)}>
          Đặt hàng
        </Button>
      </Form>
      <div>
        {getdata.length ? (
          <div
            className="card_details border border-info ms-2"
            style={{ width: "24rem", padding: 10 }}
          >
            <h2 className="fw-normal text-center ">Tổng giá trị đơn hàng</h2>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getdata.map((e) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <NavLink to={`/cart/${e.id}`}>
                            <img
                              src={`/img/${e.image}`}
                              style={{ width: "5rem", height: "5rem" }}
                            />
                          </NavLink>
                        </td>
                        <td>
                          <p>{e.title}</p>
                          <p>
                            Giá :{" "}
                            <span className="text-danger fs-6 fw-semibold">
                              {" "}
                              {parseFloat(e.price).toFixed(3)}.000{" "}
                              <span className="text-success fw-semibold ">
                                VND
                              </span>
                            </span>
                          </p>

                          <p>
                            Màn hình :{" "}
                            <span className="text-warning fw-bolder">
                              {e.camera1}
                            </span>{" "}
                            <span className="text-info fw-bolder">
                              {e.camera2}
                            </span>
                          </p>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <p className="mt-5 fw-semibold d-flex justify-content-center">
              Tổng :
              <span className="text-danger mx-2">
                {parseFloat(price).toFixed(3)}.000{" "}
                <span className="text-dark fw-semibold">VND</span>
              </span>
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Container>
  );
}

import { Link, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Categories from "../product/Categories";
import Detail from "../product/Detail";
import { NavLink, Offcanvas, Table, Button, Form, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ADD, DLT, REMOVE } from "../redux/action";
import Home from "../product/Home";
import { Information } from "../product/Information";
import Product from "../product/Product";
import Footer from "../product/Footer";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = Product.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const [price, setPrice] = useState(0);

  const getdata = useSelector((state) => state.shopReducer.carts);
  console.log(getdata);
  const dispatch = useDispatch();

  const dlt = (id) => {
    dispatch(DLT(id));
  };
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  const send = (e) => {
    dispatch(ADD(e));
  };
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
  return (
    <div>
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Container fluid>
          <Link to={"/"} className="text-decoration-none">
            <Navbar.Brand className="text-danger  fs-4 a">
              Smart <span className="text-light fw-normal">Store</span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to={"/"} className="text-decoration-none fw-semibold f">
                  Trang chủ
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to={"/categories"}
                  className="text-decoration-none fw-semibold f"
                >
                  Sản Phẩm
                </Link>
              </Nav.Link>
              <Nav.Link></Nav.Link>
            </Nav>
            <Nav className="search">
              <Form className="d-flex searchInputs">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="me-2 w-100"
                  aria-label="Search"
                  value={wordEntered}
                  onChange={handleFilter}
                />
                <div>
                  {filteredData.length === 0 ? (
                    <Button variant="outline-danger">
                      <i class="bi bi-search"></i>
                    </Button>
                  ) : (
                    <Button variant="outline-info">
                      <i class="bi bi-x" onClick={clearInput}></i>
                    </Button>
                  )}
                </div>
              </Form>
              {filteredData.length != 0 && (
                <div className="dataResult">
                  {filteredData.slice(0, 15).map((value, key) => {
                    return (
                      <Link className="dataItem" to={`/procduct/${value.id}`}>
                        <p>{value.title} </p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Nav>
            <Nav>
              <Button variant="" onClick={handleShow}>
                <button type="button" className="btn position-relative m-0">
                  <i className="bi bi-cart-fill text-light fs-3"></i>
                  <span className="position-absolute bg-danger top-0 mt-3 start-75 translate-middle badge rounded-pill">
                    {getdata.length}
                  </span>
                </button>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Giỏ Hàng</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
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
                                {parseFloat(e.price).toFixed(3)}.000
                              </span>{" "}
                              <span className="text-dark fw-semibold ">
                                VND
                              </span>
                            </p>
                            <div
                              className="mt-5 d-flex justify-content-between align-items-center bg-white text-dark fw-semibold"
                              style={{
                                width: 70,
                                cursor: "pointer",
                                background: "#ddd",
                                color: "#111",
                              }}
                            >
                              <span
                                style={{ fontSize: 24 }}
                                onClick={
                                  e.qnty <= 1
                                    ? () => dlt(e.id)
                                    : () => remove(e)
                                }
                              >
                                -
                              </span>
                              <span style={{ fontSize: 22 }}>{e.qnty}</span>
                              <span
                                style={{ fontSize: 24 }}
                                onClick={() => send(e)}
                              >
                                +
                              </span>
                            </div>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e.id)}
                            >
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>

                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
              <p className="mt-5 fw-semibold d-flex justify-content-center text-danger">
                Thanh Toán :
                <span className="text-dark mx-1">
                  {" "}
                  {parseFloat(price).toFixed(3)}.000{" "}
                  <span className="text-dark fw-semibold">VND</span>
                </span>{" "}
              </p>
              <Link
                to={"/signup"}
                className="d-flex justify-content-center text-decoration-none links"
              >
                <Button variant="outline-danger">Mua hàng</Button>
              </Link>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <p style={{ fontSize: 22 }}>Giỏ hàng đang trống</p>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/procduct/:id" element={<Detail></Detail>}></Route>
        <Route path="/categories" element={<Categories></Categories>}></Route>
        <Route path="/signup" element={<Information></Information>}></Route>
      </Routes>
      <p className="position-absolute w-100 text-center fs-5 fst-italic fw-semibold">
        {/* &copy; copyright by SonBui */}
        <Footer />
      </p>
    </div>
  );
}

export default App;

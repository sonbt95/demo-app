import React, { useState } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function Comments() {
  const [comment, setComment] = useState("");
  const [send, setSend] = useState([]);
  const handleClick = (e) => {
    setComment(e.target.value);
  };
  const clickHandle = () => {
    setSend((send) => [...send, comment]);
  };
  return (
    <>
      <h2>Đánh giá sản phẩm</h2>
      <div className="d-flex flex-column">
        {send.map((text) => (
          <div
            class="p-2 bg-dark bg-opacity-10 border border border-start-0 rounded-end mb-3"
            style={{ width: "70%" }}
          >
            {text}
          </div>
        ))}
      </div>
      <Form.Control
        as="textarea"
        value={comment}
        onChange={handleClick}
        placeholder="Phần đánh giá sản phẩm"
        style={{ height: "100px", width: "70%", marginBottom: "20px" }}
      />
      <Button variant="outline-danger" onClick={clickHandle}>
        Gửi phản hồi
      </Button>
    </>
  );
}

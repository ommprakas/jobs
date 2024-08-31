import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormRecruiter from "./form";
import { useNavigate } from "react-router-dom";
import { getCompaniesAsync } from "../../redux";
export function RecruiterCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Recruiter
      </Button>

      <Modal className="cusCard" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="createRecruiterHeaderWrapper">
          <Modal.Title className="createRecruiterHeaderTitle">
            Create new recruiter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="createRecruiterBody">
          <FormRecruiter navigate={navigate} dispatch={dispatch} handleClose={handleClose} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

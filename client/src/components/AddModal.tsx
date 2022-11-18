import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
} from "reactstrap";
import styled from "styled-components";
import { useTableStore } from "../zustand/store";


interface Rowinfo {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

function AddModal({
  editable,
  modal,
  setModal,
  rowInfo,
}: {
  editable: boolean;
  modal: boolean;
  setModal: (value: boolean) => void;
  rowInfo:Rowinfo
}) {

  // user form
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhoneNumber] = useState<string>("");
  const [id, setUserID] = useState<number>(0)

useEffect(() =>{
setName(rowInfo.name)
setEmail(rowInfo.email)
setCity(rowInfo.address.city)
setStreet(rowInfo.address.street)
setPhoneNumber(rowInfo.phone)
setGender(rowInfo.gender)
setUserID(rowInfo.id)
},[editable])



  // get add event
  const addUsertoTable = useTableStore((state) => state.addUsertoTable);
  const editUsertoTable = useTableStore((state) => state.editUsertoTable);

  // add user to the table handler
  const addRowHandler = () => {
    addUsertoTable(name, email, city, street, gender, phone);
    setModal(!modal);
  };

  const EditRowHandler = () =>{
    editUsertoTable(id,name, email, city, street, gender, phone);
    setModal(!modal);
  }

  return (
    <Container>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          {!editable ? "Add a user to the table" : "Edit a user Info"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="Name">Name</Label>
                  <Input
                    value={name}
                    onChange={(e) =>  setName(e.target.value)}
                    id="Name"
                    name="name"
                    placeholder="user name"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="Eamil"
                    name="email"
                    placeholder="user email"
                    type="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">City</Label>
                  <Input
                  value={city}
                    onChange={(e) => setCity(e.target.value)}
                    id="exampleCity"
                    placeholder="tbilisi"
                    name="city"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="Street">Street</Label>
                  <Input
                  value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="dolidze N19"
                    id="Street"
                    name="Street"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="PhoneNumber">Phone Number</Label>
              <Input
              value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                id="PhoneNumber"
                name="phoneNumber"
                placeholder="+1 (000) 123-4567"
              />
            </FormGroup>
            <Label>Gender</Label>
            <Input
              onChange={(e) => setGender(e.target.value)}
              className="mb-3"
              type="select"
              defaultValue="coose a gender"
            >
              <option disabled>choose a gender</option>
              <option>male</option>
              <option>female</option>
            </Input>
            {editable ? (
              <Button
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                 EditRowHandler();
                }}
              >
                Edit
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  addRowHandler();
                }}
              >
                Add
              </Button>
            )}
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default AddModal;

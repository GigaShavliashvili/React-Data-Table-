import React, { useState } from "react";
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
/* {edit, rowInfo,}:{edit:boolean, rowInfo:Row} */
function AddModal() {
  // user form

  const row = useTableStore((state: any) => state.rowData);
  console.log(row);

  const [name, setName] = useState<string>(row.name);
  const [email, setEmail] = useState<string>(row.email);
  const [city, setCity] = useState<string>(row.address.city);
  const [street, setStreet] = useState<string>(row.address.street);
  const [gender, setGender] = useState<string>(row.gender);
  const [phoneNumber, setPhoneNumber] = useState<string>(row.phone);

console.log(name);


  // modal toggle state
const [modal, setModal] = useState<boolean>(false)

  const toggle = () => setModal(!modal);

  // get add event
  const addUsertoTabl = useTableStore((state: any) => state.addUsertoTable);

  
  // add user to the table handler
  const addHandler = () => {
    addUsertoTabl(name, email, city, street, gender, phoneNumber);
    setModal(!modal);
  };

  return (
    <Container>
        <Button color="primary" onClick={toggle}>
          Add User
        </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a user to the table</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="Name">Name</Label>
                  <Input
                  value={row.name}
                    onChange={(e) => setName(e.target.value)}
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
              value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                id="PhoneNumber"
                name="phoneNumber"
                placeholder="+1 (000) 123-4567"
              />
            </FormGroup>
            <Label>Gender</Label>
            <Input
            value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mb-3"
              type="select"
              defaultValue="coose a gender"
            >
              <option disabled>choose a gender</option>
              <option>male</option>
              <option>female</option>
            </Input>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                addHandler();
              }}
            >
              Add
            </Button>{" "}
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

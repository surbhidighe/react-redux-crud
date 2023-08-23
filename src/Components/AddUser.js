import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addUser } from "../Redux/actions/userActions";
import ModalComponent from "./UI/ModalComponent";
import { connect } from "react-redux";

const initialUserData = {
  name: "",
  email: "",
  designation: "",
  isActive: false,
};

const AddUser = ({ addUser }) => {
  const [newUser, setnewUser] = useState(initialUserData);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        designation: newUser.designation,
        isActive: newUser.isActive,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addUser(data);
        setShowAddModal(false);
        setnewUser(initialUserData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleAdd}>
        Add user
      </Button>

      {showAddModal && (
        <ModalComponent
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          confirmAction={confirmAdd}
          title="Add new user"
          content={
            <NewUserFormComponent newUser={newUser} setnewUser={setnewUser} />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
        />
      )}
    </>
  );
};

const NewUserFormComponent = ({ newUser, setnewUser }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={newUser.name}
            onChange={(e) => setnewUser({ ...newUser, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            value={newUser.email}
            onChange={(e) => setnewUser({ ...newUser, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            placeholder="designation"
            name="designation"
            value={newUser.designation}
            onChange={(e) =>
              setnewUser({
                ...newUser,
                designation: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Status"
            name="isActive"
            value={newUser.isActive}
            onChange={(e) =>
              setnewUser({
                ...newUser,
                isActive: e.target.value,
              })
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(addUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

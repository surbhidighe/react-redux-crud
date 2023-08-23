import React, { useEffect, useState } from "react";
import {
  deleteUser,
  fetchAllUsers,
  updateUser,
} from "../Redux/actions/userActions";
import { connect } from "react-redux";
import { Col, Container, Row, Table, Form, Button } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ModalComponent from "./UI/ModalComponent";
import AddUser from "./AddUser";

const UserList = ({ userData, fetchAllUsers, deleteUser, updateUser }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  // on clicking delete icon
  const handleDelete = (userInfo) => {
    setShowDeleteModal(true);
    setSelectedUser(userInfo);
  };

  // on clicking edit icon
  const handleEdit = (userInfo) => {
    setShowEditModal(true);
    setSelectedUser(userInfo);
  };

  // fetch all user list
  const getAllUsers = () => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => fetchAllUsers(data))
      .catch((error) => console.log(error));
  };

  // clicking confirm delete on modal
  const confirmDelete = () => {
    fetch(`http://localhost:3001/users/${selectedUser.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok === true) {
          deleteUser(selectedUser.id);
        }
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  // clicking confirm update on modal
  const confirmUpdate = () => {
    fetch(`http://localhost:3001/users/${selectedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        designation: selectedUser.designation,
        isActive: selectedUser.isActive === "true" ? true : false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateUser(selectedUser.id, data);
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  // function to validate emil address
  const validateEmail = (email) => {
    const emailRegex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <>
      <Container>
        <Row className="py-5 mt-5">
          <AddUser />
        </Row>
        <Row>
          <Col>
            <Table hover responsive="sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userData.map((ele) => (
                  <tr key={ele.id}>
                    <td>{ele.id}</td>
                    <td className="fw-bold">{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.designation}</td>
                    <td
                      className={`fw-bold ${
                        ele.isActive ? "text-success" : "text-danger"
                      }`}
                    >
                      {ele.isActive ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <Row>
                        <Col>
                          <AiFillEdit
                            onClick={() => handleEdit(ele)}
                            color="dodgerblue"
                            role="button"
                          />
                        </Col>
                        <Col>
                          <AiFillDelete
                            onClick={() => handleDelete(ele)}
                            color="red"
                            role="button"
                          />
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>


      
      {showDeleteModal && (
        <ModalComponent
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          confirmAction={confirmDelete}
          title="Delete User"
          content="Are you sure you want to delete this user ?"
          confirmButtonText="Confirm"
          cancelButtonText="Cancel"
        />
      )}

      {showEditModal && (
        <ModalComponent
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          confirmAction={confirmUpdate}
          title="Edit User"
          content={
            <FormComponent
              selecteduser={selectedUser}
              setselecteduser={setSelectedUser}
            />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={
            selectedUser.name === "" ||
            selectedUser.email === "" ||
            !validateEmail(selectedUser.email)
          }
        />
      )}
    </>
  );
};

const FormComponent = ({ selecteduser, setselecteduser }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="name@example.com"
            value={selecteduser.id}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={selecteduser.name}
            onChange={(e) =>
              setselecteduser({ ...selecteduser, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            value={selecteduser.email}
            onChange={(e) =>
              setselecteduser({ ...selecteduser, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            as="select"
            name="designation"
            value={selecteduser.designation}
            onChange={(e) =>
              setselecteduser({
                ...selecteduser,
                designation: e.target.value,
              })
            }
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="Sr. Software Engineer">Sr. Software Engineer</option>
            <option value="Tech Lead">Tech Lead</option>
            <option value="Product Manager">Product Manager</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="isActive"
            value={selecteduser.isActive.toString()} // Convert boolean to string
            onChange={(e) =>
              setselecteduser({
                ...selecteduser,
                isActive: e.target.value,
              })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Form.Control>
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
    fetchAllUsers: (data) => dispatch(fetchAllUsers(data)),
    deleteUser: (id) => dispatch(deleteUser(id)),
    updateUser: (id, data) => dispatch(updateUser(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

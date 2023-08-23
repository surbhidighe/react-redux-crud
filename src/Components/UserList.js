import React, { useEffect, useState } from "react";
import {
  deleteUser,
  fetchAllUsers,
  updateUser
} from "../Redux/actions/userActions";
import { connect } from "react-redux";
import { Col, Container, Row, Table, Form } from "react-bootstrap";
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

  const handleDelete = (userInfo) => {
    setShowDeleteModal(true);
    setSelectedUser(userInfo);
  };

  const handleEdit = (userInfo) => {
    setShowEditModal(true);
    setSelectedUser(userInfo);
  };

  const getAllUsers = () => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => fetchAllUsers(data))
      .catch((error) => console.log(error));
  };

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
        isActive: selectedUser.isActive,
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



  return (
    <>
      <Container>
        <Row>
          <Col lg="10">All Users : {userData.length}</Col>
          <Col>
            <AddUser/>
          </Col>
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
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.designation}</td>
                    <td>{ele.isActive ? "Active" : "Inactive"}</td>
                    <td>
                      <Row>
                        <Col>
                          <AiFillEdit onClick={() => handleEdit(ele)} />
                        </Col>
                        <Col>
                          <AiFillDelete onClick={() => handleDelete(ele)} />
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
                type="text"
                placeholder="designation"
                name="designation"
                value={selecteduser.designation}
                onChange={(e) =>
                  setselecteduser({
                    ...selecteduser,
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
                value={selecteduser.isActive}
                onChange={(e) =>
                  setselecteduser({
                    ...selecteduser,
                    isActive: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </div>
      );
    }

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

import React, { useEffect } from "react";
import { deleteUser, fetchAllUsers } from "../Redux/actions/userActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

const UserList = ({ userData, fetchAllUsers, deleteUser }) => {
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => fetchAllUsers(data))
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.ok===true){
          deleteUser(id)
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  return (
    <Container>
      <Row>
        <Col lg="10">All Users : {userData.length}</Col>
        <Col>
          <Button variant="primary">Add user</Button>
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
                        <Link to={`/user-details/${ele.id}`}>
                          <AiFillEye />
                        </Link>
                      </Col>
                      <Col>
                        <AiFillEdit />
                      </Col>
                      <Col>
                        <AiFillDelete onClick={() => handleDelete(ele.id)} />
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
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: (userData) => dispatch(fetchAllUsers(userData)),
    deleteUser: (id) => dispatch(deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

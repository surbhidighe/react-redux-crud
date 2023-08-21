// components/ProductDetails.js
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSelectedUser } from "../Redux/actions/userActions";
import { useParams } from "react-router-dom";

const UserDetails = ({ getSelectedUser, selectedUserDetails }) => {
  const { id } = useParams();

  useEffect(() => {
    getSelectedUserDetails();
  }, []);

  const getSelectedUserDetails = () => {
    if (id) {
      fetch(`http://localhost:3001/users/${id}`)
        .then((response) => response.json())
        .then((data) => getSelectedUser(data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  };

  return (
    <div>
      {selectedUserDetails ? (
        <div>
          <h4>{selectedUserDetails.id}</h4>
          <p>{selectedUserDetails.name}</p>
          <p>{selectedUserDetails.designation}</p>
          <p>{selectedUserDetails.isActive}</p>
        </div>
      ) : (
        <p>No details found</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedUserDetails: state.user.selectedUserDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSelectedUser: (selectedUserDetails) =>
      dispatch(getSelectedUser(selectedUserDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

import React, { useEffect } from "react";
import { fetchAllUsers } from "../Redux/actions/userActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const UserList = ({userData, fetchAllUsers}) => {
  useEffect(() => {
    getAllUsers();
  }, []);


  const getAllUsers = () => {
    fetch("http://localhost:3001/users")
      .then(response => response.json())
      .then(data => fetchAllUsers(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
    <ul>
    {userData.map((ele)=>(
      <div>

        <li key={ele.id}>{ele.name}</li>
        <Link to={`/user-details/${ele.id}`}>View details</Link>
      </div>
    ))}
    </ul>
    </>
  )
};


const mapStateToProps = (state) =>{
  return{
    userData: state.user.userData
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    fetchAllUsers: (userData) => dispatch(fetchAllUsers(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

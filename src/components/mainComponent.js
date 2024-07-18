import React, { useEffect, useState } from "react";
import InputHandler from "./commonInput";
import SimpleTable from "./simpleTable";

function MainComponent(props) {
  const [edit, setEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const { getUsers, userState, addUser, updateUser, deleteUser } = props;

  const handleSubmit = ({ name, email, id }) => {
    if(id==""){
      addUser({ name, email });
    }else{
      updateUser({"name":name, "email":email, "id":id});
      setEdit(false);
    }
  };

  const handleEdit = (flag, data) => {
    setEdit(flag);
    setSelectedUser(data);
  };

  const handleDelete = (data) => {
    deleteUser(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div id="main-container-wrapper">
      <InputHandler onSubmit={handleSubmit} editMode={edit} selectedUserData={selectedUser} dataSource={userState.users}/>
      <SimpleTable dataSource={userState.users} editMode={handleEdit} deleteUser={handleDelete} />
    </div>
  );
}

export default MainComponent;

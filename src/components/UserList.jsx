import React, { useContext } from "react";
import { UserContext } from "../UserProvider";

function UserList() {
  const { users, confirmDelete } = useContext(UserContext);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => confirmDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

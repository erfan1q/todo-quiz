import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../UserProvider";

function UserForm () {
  const { handleSubmitForm } = useContext(UserContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    handleSubmitForm(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input type="text" {...register("name", { required: true })} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email", { required: true })} />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;

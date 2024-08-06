import React, { createContext, useState, useEffect } from "react";
import { useMutation, useQuery, QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [userIdCounter, setUserIdCounter] = useState(1);

  const { data, error, isLoading } = useQuery("getUsers", async () => {
    const res = await axios.get("http://localhost:3000/user");
    return res.data;
  }, {
    onError: (error) => {
      console.error("Error fetching users:", error);
    }
  });

  const postUsers = useMutation({
    mutationFn: async (newUser) => {
      const res = await axios.post("http://localhost:3000/user", newUser);
      return res.data;
    },
    onSuccess: (newUser) => {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    },
    onError: (error) => {
      console.error("Error adding user:", error);
    }
  });

  const deleteUser = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:3000/user/${id}`);
      return id;
    },
    onSuccess: (id) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    }
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  function handleSubmitForm(values) {
    const newValues = { ...values, id: userIdCounter };
    setUserIdCounter(userIdCounter + 1);
    postUsers.mutate(newValues);
  }

  function confirmDelete(id) {
    deleteUser.mutate(id);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <UserContext.Provider
      value={{
        users,
        handleSubmitForm,
        confirmDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

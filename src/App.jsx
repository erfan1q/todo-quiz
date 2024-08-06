import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./UserProvider";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <UserForm />
        <UserList />
      </UserProvider>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

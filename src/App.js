import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #333;
  color: #fff;
  padding: 10px;
`;

const Brand = styled.div`
  font-size: 18px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
`;

const Loader = styled.div`
  display: ${({ isLoading }) => (isLoading ? "block" : "none")};
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://reqres.in/api/users?page=1");
      setUsers(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <Brand>Your Brand Name</Brand>
        <Button onClick={fetchUsers}>Get Users</Button>
      </Navbar>
      <Loader isLoading={isLoading} />
      <Container>
        {users.map((user) => (
          <Card key={user.id}>
            <img src={user.avatar} alt="User Avatar" />
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p>Email: {user.email}</p>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default App;

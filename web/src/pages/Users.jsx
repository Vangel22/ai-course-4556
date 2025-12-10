import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:10000/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setUsers(res.data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {users.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

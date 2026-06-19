import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users`);

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    document.title = "ARM - Users";
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Email</th>

              <th className="text-left p-4">Registered</th>

              <th className="text-left p-4">Last Login</th>

              <th className="text-left p-4">Last Logout</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "Never Logged In"}
                </td>

                <td className="p-4">
                  {user.lastLogout
                    ? new Date(user.lastLogout).toLocaleString()
                    : "Never Logged Out"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

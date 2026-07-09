import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { FaTrash } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    const currentUser = JSON.parse(localStorage.getItem("crmUser"));

    if (!currentUser) {
      alert("Please login again.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      fetchUsers();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this user?",
  //   );

  //   if (!confirmDelete) return;

  //   try {
  //     const currentUser = JSON.parse(localStorage.getItem("crmUser"));

  //     await axios.delete(`${API_URL}/api/users/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${currentUser.token}`,
  //       },
  //     });

  //     fetchUsers();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

              <th className="text-left p-4">Actions</th>
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

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white p-2 ms-2 rounded-lg hover:bg-red-600"
                    title="Delete"
                  >
                    <FaTrash size={18} />
                  </button>
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

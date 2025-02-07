"use client"; // Add this line to mark it as a client component

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter for redirection
import styles from './Admin.module.css';

// Define User and Dish interfaces
interface User {
  _id: string; // MongoDB ObjectId as a string
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Added phone number field
  role: string; // Add role field to the User interface
}

interface Dish {
  _id: string; // MongoDB ObjectId as a string
  name: string;
  userId: string; // Reference to the user who created the dish
}

// Define the API response types
interface FetchUsersResponse {
  users: User[];
}

interface FetchDishesResponse {
  dishes: Dish[];
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'dishes'>('users');
  const router = useRouter(); // Initialize router for redirection

  const fetchData = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await axios.get<FetchUsersResponse>('/api/admin'); // Adjust the API path as needed
      setUsers(response.data.users);
      const dishesResponse = await axios.get<FetchDishesResponse>('/api/dish'); // Fetch dishes
      setDishes(dishesResponse.data.dishes);
    } catch (err: any) {
      console.error("Fetch error:", err); // Log the error for debugging
      setError(err.response?.data?.error || 'Error fetching data'); // Show detailed error if available
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('role')?.toLowerCase();

    console.log("Stored Role:", userRole); // Debugging log

    if (!username || userRole !== 'admin') {
        router.push('/login');
    } else {
        fetchData(); // Fetch only if role is admin
    }
}, [router]);


  const handleDeleteUser = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?"); // Confirmation dialog
    if (!confirmDelete) return;

    // Optimistically remove the user from state
    setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));

    try {
      const response = await axios.delete(`/api/admin?id=${id}`);
      if (response.status !== 200) {
        setError('Failed to delete user.'); // Show error if not successful
      }
    } catch (err: any) {
      console.error("Delete error:", err); // Log the error for debugging
      setError(err.response?.data?.error || 'Error deleting user'); // Show error message
      // Re-fetch users to restore optimistic update
      fetchData();
    }
  };

  const handleDeleteDish = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this dish?"); // Confirmation dialog
    if (!confirmDelete) return;

    // Optimistically remove the dish from state
    setDishes((prevDishes) => prevDishes.filter(dish => dish._id !== id));

    try {
      const response = await axios.delete(`/api/dish/${id}`); // Adjust the API path for deleting dish
      if (response.status !== 200) {
        setError('Failed to delete dish.'); // Show error if not successful
      }
    } catch (err) {
      console.error("Delete error:", err); // Log the error for debugging
      setError('Error deleting dish');
      // Re-fetch dishes to restore optimistic update
      fetchData();
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Overview</h1>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Details
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'dishes' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('dishes')}
        >
          Dishes
        </button>
      </div>

      {activeTab === 'users' ? (
        <div>
          <h2 className={styles.subtitle}>User Details</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                {/* <th>Phone Number</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className={styles.tableRow}>
                    <td>{user._id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user._id)} className={styles.deleteButton}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.noData}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2 className={styles.subtitle}>Dishes</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>ID</th>
                <th>Name</th>
                <th>User ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.length > 0 ? (
                dishes.map((dish) => (
                  <tr key={dish._id} className={styles.tableRow}>
                    <td>{dish._id}</td>
                    <td>{dish.name}</td>
                    <td>{dish.userId}</td>
                    <td>
                      <button onClick={() => handleDeleteDish(dish._id)} className={styles.deleteButton}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noData}>
                    No dishes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;

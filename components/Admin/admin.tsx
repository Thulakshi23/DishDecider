import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Admin.module.css';

interface User {
  _id: string; // MongoDB ObjectId as a string
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Added phone number field
}

interface Dish {
  _id: string; // MongoDB ObjectId as a string
  name: string;
  userId: string; // Reference to the user who created the dish
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'dishes'>('users');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin'); // Adjust the API path as needed
        setUsers(response.data.users);
        setDishes(response.data.dishes);
      } catch (err) {
        setError('Error fetching data');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?"); // Confirmation dialog
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/admin?id=${id}`);

      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== id)); // Remove user from state
      } else {
        setError('Failed to delete user.'); // Show error if not successful
      }
    } catch (err: any) {
      console.error("Delete error:", err); // Log the error for debugging
      setError(err.response?.data?.error || 'Error deleting user'); // Show error message
    }
  };

  const handleDeleteDish = async (id: string) => {
    try {
      await axios.delete(`/api/dish/${id}`); // Adjust the API path for deleting dish
      setDishes(dishes.filter(dish => dish._id !== id));
    } catch (err) {
      setError('Error deleting dish');
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
                <th>Phone Number</th>
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

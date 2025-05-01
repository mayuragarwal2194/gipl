import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/newsletter");
      const data = await response.json();
      setSubscribers(data);
      setLoading(false);
    } catch (error) {
      Swal.fire("Error!", "Failed to fetch subscribers", "error");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/newsletter/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete subscriber.");
          }

          // Remove only if API call is successful
          setSubscribers(subscribers.filter(sub => sub._id !== id));
          Swal.fire("Deleted!", "Subscriber has been removed.", "success");

        } catch (error) {
          Swal.fire("Error!", "Failed to delete subscriber. Please try again.", "error");
        }
      }
    });
  };


  return (
    <div className="admin-container">
      <h2>Newsletter Subscribers</h2>
      {loading ? <p>Loading...</p> : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Email</th>
              <th>Subscribed Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length > 0 ? (
              subscribers.map(sub => (
                <tr key={sub._id}>
                  <td>{sub.email}</td>
                  <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDelete(sub._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3">No subscribers yet</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Subscribers;
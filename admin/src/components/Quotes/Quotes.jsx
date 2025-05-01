import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllQuotes, deleteQuote } from "../../services/api"; // Import API functions

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const data = await getAllQuotes();
      setQuotes(data);
    } catch (error) {
      Swal.fire("Error!", error.message || "Failed to fetch quotes", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteQuote(id);
          setQuotes(quotes.filter((quote) => quote._id !== id)); // Update UI
          Swal.fire("Deleted!", "Quote request has been removed.", "success");
        } catch (error) {
          Swal.fire("Error!", error.message || "Failed to delete quote request", "error");
        }
      }
    });
  };

  return (
    <div className="admin-container">
      <h2>Quote Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Requested On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <tr key={quote._id}>
                  <td>{quote.name}</td>
                  <td>{quote.email}</td>
                  <td>{quote.phone}</td>
                  <td>{quote.message}</td>
                  <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(quote._id)}>
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No quote requests yet</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Quotes;
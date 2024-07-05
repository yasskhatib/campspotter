import { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import { Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner2 from "@/components/common/LoadingSpinner2"; // Ensure the path is correct
import axiosInstance from '@/components/axiosInstance'; // Ensure the path is correct

export default function DbBooking() {
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const itemsPerPage = 4;
  const campgrpEmail = localStorage.getItem("campgrpEmail");

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/blogs?email=${campgrpEmail}`);
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBookingData(sortedData);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchData();
  }, [campgrpEmail]);


  const handleDelete = async () => {
    try {
      await axiosInstance.put(`/api/blogs/${selectedBlog}/cancel`);
      setBookingData(bookingData.map(blog => blog._id === selectedBlog ? { ...blog, status: "Cancelled" } : blog));
      toast.dark("Article was cancelled");
    } catch (error) {
      console.error("Error updating status", error);
      toast.error("Error cancelling the article");
    } finally {
      setShowDialog(false);
      setSelectedBlog(null);
    }
  };


  const openDialog = (id) => {
    setSelectedBlog(id);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedBlog(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:mb-20 mt-10">
      <div className="text-28 fw-600 mb-3">
        <h4>Blog Articles</h4>
      </div>
      {loading ? (
        <div className="spinner-section">
          <LoadingSpinner2 />
        </div>
      ) : (
        <div className="tabs__content js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflowAuto">
              <table className="tableTest mb-30">
                <thead className="bg-light-1 rounded-12">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Creator</th>
                    <th>Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((elm, i) => (
                    <tr key={i} className={elm.status === "approved" ? "clickable" : ""}>
                      <td>{indexOfFirstItem + i + 1}</td>
                      <td className="min-w-300">
                        <div className="d-flex items-center">
                          <img className="iconblog" src={elm.coverImage} alt="image" />
                          <div className="ml-20">
                            <span
                              onClick={() => elm.status === "approved" && window.open(`${window.location.origin}/article/${elm._id}`, "_blank")}
                              style={{ cursor: elm.status === "approved" ? "pointer" : "default" }}
                            >
                              {elm.title.length > 60 ? `${elm.title.slice(0, 60)}...` : elm.title}
                            </span>

                          </div>
                        </div>
                      </td>
                      <td>{elm.type}</td>
                      <td>{new Date(elm.date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</td>
                      <td>{elm.creatorName || "Anonyme"}</td>
                      <td>
                        <div
                          className={`circle ${elm.status === "approved"
                            ? "text-purple-1"
                            : elm.status === "pending"
                              ? "text-yellow-1"
                              : "text-red-2"
                            } `}
                        >
                          {elm.status}
                        </div>
                      </td>
                      <td>
                        {elm.status === "approved" ? (
                          <div className="d-flex items-center">
                            <button onClick={(e) => { e.stopPropagation(); openDialog(elm._id); }} className="button -dark-1 size-35 bg-light-1 rounded-full flex-center ml-10">
                              <i className="icon-delete text-14"></i>
                            </button>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalItems={bookingData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />

            <div className="text-14 text-center mt-20">
              Showing results {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, bookingData.length)} of {bookingData.length}
            </div>
          </div>
        </div>
      )}

      <Dialog
        aria-labelledby="custom-dialog-heading"
        className={`custom-dialog-overlay ${showDialog ? 'fade-in' : 'fade-out'}`}
        open={showDialog}
        onClose={closeDialog}
      >
        <div className="custom-dialog-content">
          <DialogHeading className='canceltitle' id="custom-dialog-heading">Cancel Blog</DialogHeading>
          <p>
            Are you sure you want to cancel this blog <br />
            article permanently?
          </p>

          <div className="custom-button-container">
            <button className="custom-btn custom-btn-danger" onClick={handleDelete}>
              Yes
            </button>
            <DialogDismiss as="button" className="custom-btn custom-btn-secondary" onClick={closeDialog}>
              No
            </DialogDismiss>
          </div>
        </div>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

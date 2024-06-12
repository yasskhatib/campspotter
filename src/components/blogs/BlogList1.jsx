import { useEffect, useState } from "react";
import axios from 'axios';
import Pagination from "../common/Pagination";
import { Link } from "react-router-dom";

// Consider moving this to a separate constants file if used across multiple components.
export const continents = [
  "All Blogs",
  "Camping",
  "Tour",
  "News",
];

function BlogList1() {
  const [blogs, setBlogs] = useState([]);
  const [currentActiveTab, setCurrentActiveTab] = useState("All Blogs");
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/blogs')
      .then(response => {
        setBlogs(response.data);
        setTotalItems(response.data.length);
      })
      .catch(error => console.error('Failed to fetch blogs:', error));
  }, []);

  useEffect(() => {
    if (currentActiveTab === "All Blogs") {
      setFilteredItems(blogs);
    } else {
      setFilteredItems(blogs.filter(blog => blog.type === currentActiveTab));
    }
    setCurrentPage(1);
  }, [currentActiveTab, blogs]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getImageUrl = (imagePath) => {
    return `http://localhost:5000/${imagePath}`;
  };

  return (
    <section className="layout-pt-md layout-pb-xl">
      <div className="container">
        <div className="tabs -pills-3 pt-30 js-tabs">
          <div className="tabs__controls row x-gap-10 y-gap-10 justify-center js-tabs-controls">
            {continents.map((continent, i) => (
              <div key={i} className="col-auto">
                <button
                  className={`tabs__button fw-500 rounded-200 ${currentActiveTab === continent ? "is-tab-el-active" : ""}`}
                  onClick={() => setCurrentActiveTab(continent)}
                >
                  {continent}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="row y-gap-30" style={{ marginTop: '30px' }}>
          {currentItems.map((blog, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <Link to={`../article/${blog._id}`} className="blogCard -type-1">
                <div className="blogCard__image ratio ratio-41:30">
                  <img src={getImageUrl(blog.coverImage)} alt="Blog Cover" className="img-ratio rounded-12" />
                  {blog.type && <div className="blogCard__badge">{blog.type}</div>}
                </div>
                <div className="blogCard__content mt-30">
                  <div className="blogCard__info text-14">
                    <div className="lh-13">{new Date(blog.date).toLocaleDateString()}</div>
                    <div className="blogCard__line"></div>
                    <div className="lh-13">By {blog.creatorName || "Anonymous"}</div>
                  </div>
                  <h3 className="blogCard__title text-18 fw-500 mt-10">{blog.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <br></br><br></br>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
        <div className="text-14 text-center mt-20">
          Showing results {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
        </div>
      </div>
    </section>
  );
}

export default BlogList1;

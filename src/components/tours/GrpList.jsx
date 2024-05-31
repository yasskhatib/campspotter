import Pagination from "../common/Pagination";
import ToggleSidebar from "./ToggleSidebar";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default function GrpList() {
  const [setDdActives] = useState(false);
  const [settourTypeActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [campGroups, setCampGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const dropDownContainer = useRef();
  const dropDownContainer2 = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActives(false);
      }
      if (
        dropDownContainer2.current &&
        !dropDownContainer2.current.contains(event.target)
      ) {
        settourTypeActive(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setDdActives, settourTypeActive]);

  useEffect(() => {
    const fetchCampGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allCampGroups');
        setCampGroups(response.data);
      } catch (error) {
        console.error('Error fetching camp groups:', error);
      }
    };

    fetchCampGroups();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCampGroups = campGroups.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <section className="layout-pb-xl">
        <div className="container">
          

          <div className="row y-gap-30 pt-30">
            {currentCampGroups.map((group, index) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <Link
                  to={`/group/${group._id}`}
                  className="tourCard -type-1 py-10 px-10 border-1 rounded-12 -hover-shadow"
                >
                  <div className="tourCard__header">
                    <div className="tourCard__image ratio ratio-28:20">
                      <img
                        src={`http://localhost:5000/uploads/${group.picture}`}
                        alt={group.name}
                        className="img-ratio rounded-12"
                      />
                      {/* Add status label if necessary */}
                    </div>
                  </div>

                  <div className="tourCard__content px-10 pt-10">
                    <div className="tourCard__location d-flex items-center text-13 text-light-2">
                      <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                      {group.governorate}
                    </div>

                    <h3 className="tourCard__title text-16 fw-500 mt-5">
                      <span>{group.name}</span>
                    </h3>

                    <div className="tourCard__rating d-flex items-center text-13 mt-5">
                      {/* Add rating component if necessary */}
                    </div>

                    <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                      <div className="d-flex items-center">
                        <i className="icon-clock text-16 mr-5"></i>
                        {dayjs(group.creationDate).format('YYYY')}
                      </div>

                      <div>
                        <span className="text-16 fw-500">{group.telephone}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {campGroups.length > ITEMS_PER_PAGE && (
            <div className="d-flex justify-center flex-column mt-60">
              <Pagination
                currentPage={currentPage}
                totalItems={campGroups.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />

              <div className="text-14 text-center mt-20">
                Showing results {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, campGroups.length)} of {campGroups.length}
              </div>
            </div>
          )}
        </div>
      </section>
      <ToggleSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </>
  );
}

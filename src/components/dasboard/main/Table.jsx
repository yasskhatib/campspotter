import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDownload, FaPrint } from 'react-icons/fa';
import QRCode from 'qrcode';
import Pagination from '../../common/Pagination';
import './Table.css'; // Make sure to create and import this CSS file for custom styles
import Select from 'react-dropdown-select';

export default function Table() {
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState('');
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const campgrpEmail = localStorage.getItem('campgrpEmail');
    if (!campgrpEmail) {
      console.error('Camp group email not found in localStorage');
      return;
    }

    // Fetch camps
    const fetchCamps = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/camps?campgrpEmail=${encodeURIComponent(campgrpEmail)}`);
        setCamps(response.data);
        if (response.data.length > 0) {
          setSelectedCamp(response.data[0]._id);
        }
      } catch (error) {
        console.error('Failed to fetch camps:', error);
      }
    };

    fetchCamps();
  }, []);

  useEffect(() => {
    if (selectedCamp) {
      // Fetch reservations for the selected camp
      const fetchReservations = async () => {
        try {
          const reservationResponse = await axios.get(`http://localhost:5000/api/fetch-reservations?campId=${selectedCamp}`);
          const reservationsWithUserInfo = await Promise.all(
            reservationResponse.data.map(async (reservation) => {
              try {
                const userResponse = await axios.get(`http://localhost:5000/api/user-info?email=${encodeURIComponent(reservation.email)}`);
                return { ...reservation, phone: userResponse.data.telephone, governorate: userResponse.data.governorate };
              } catch (error) {
                console.error('Failed to fetch user info for reservation:', reservation.email, error);
                return reservation;
              }
            })
          );
          // Sort reservations by date (newest first)
          const sortedReservations = reservationsWithUserInfo.sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));
          setReservations(sortedReservations);
        } catch (error) {
          console.error('Failed to fetch reservations:', error);
        }
      };

      fetchReservations();
    }
  }, [selectedCamp]);

  const handleCampChange = (selected) => {
    setSelectedCamp(selected[0].value);
    setCurrentPage(1); // Reset to the first page when camp changes
  };

  const handleRowClick = async (reservation) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user-info?email=${encodeURIComponent(reservation.email)}`);
      const userData = response.data;
      toast.info(
        <div>
          <p style={{ width: '300px', color: 'white' }}>Full Name: {userData.fullName}</p>
          <p style={{ width: '300px', color: 'white' }}>Email: {userData.email}</p>
          <p style={{ width: '300px', color: 'white' }}>Governorate: {userData.governorate}</p>
          <p style={{ width: '300px', color: 'white' }}>Telephone: {userData.telephone}</p>
          <hr></hr>
          <p style={{ width: '300px', color: 'white' }}>Comment: {reservation.comments}</p>
        </div>,
        {
          position: "bottom-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
          closeButton: true,  // Add the close button
        }
      );
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  const formatSelectedExtras = (extras) => {
    const formattedExtras = [];
    if (extras.materialRent) {
      formattedExtras.push("M");
    }
    if (extras.autoBaggageTransfer) {
      formattedExtras.push("T");
    }
    if (formattedExtras == "") {
      formattedExtras.push("");
    }

    return formattedExtras.join("+");
  };

  const generatePDF = async () => {
    const selectedCampData = camps.find(camp => camp._id === selectedCamp);
    const campTitle = selectedCampData?.title || 'Selected Camp';
    const campDate = selectedCampData?.date ? new Date(selectedCampData.date).toLocaleDateString() : 'Date not available';
    const campLink = `http://localhost:5173/camp/${selectedCamp}`; // Generate the camp's direct link
    const qrCodeDataUrl = await QRCode.toDataURL(campLink); // Generate QR code

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const docTitle = `${campTitle}`;

    // Load the logo image
    const logoPath = '/img/general/campspotter.png';

    const img = new Image();
    img.src = logoPath;

    return new Promise((resolve) => {
      img.onload = function () {
        // Add the logo image to the PDF
        doc.addImage(img, 'PNG', 14, 12, 50, 10);

        // Set font for the title
        doc.setFont('times', 'bold');
        doc.setFontSize(16);

        const textWidth = doc.getStringUnitWidth(docTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textX = (pageWidth - textWidth) / 2;
        doc.text(docTitle, textX, 35);

        // Set font for the date
        doc.setFont('times', 'light');
        doc.setFontSize(12);
        const dateWidth = doc.getStringUnitWidth(campDate) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const dateX = (pageWidth - dateWidth) / 2;
        doc.text(campDate, dateX, 42);

        // Add the QR code image to the PDF
        doc.addImage(qrCodeDataUrl, 'PNG', pageWidth - 33, 5, 22, 22);

        // Set font for the table rows
        doc.autoTable({
          head: [['#', 'Name', 'Phone', 'Governorate', 'Extras', 'Price', 'Confirmation']],
          body: reservations.map((r, index) => [
            index + 1,
            r.name,
            r.phone,
            r.governorate,
            formatSelectedExtras(r.selectedExtras),
            r.totalPrice,
            ' ' // Unicode for an empty checkbox
          ]),
          startY: 50,
          margin: { top: 22 },
          styles: { fontSize: 10, font: 'helvetica', fontStyle: 'light' }, // Set font size, font family, and font style
          headStyles: { fillColor: [50, 168, 82] }, // Dark header color
          bodyStyles: { fillColor: [250, 250, 250] }, // Light grey body
        });

        resolve(doc);
      };
    });
  };

  const downloadPDF = async () => {
    const doc = await generatePDF();
    const selectedCampData = camps.find(camp => camp._id === selectedCamp);
    const campTitle = selectedCampData?.title || 'Selected Camp';
    doc.save(`Reservation - ${campTitle}.pdf`);
  };

  const printPDF = async () => {
    const doc = await generatePDF();
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservations.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getCampLabel = (camp) => {
    const today = new Date();
    const campDate = new Date(camp.date);
    let status = camp.status === 'Canceled' ? ' - Canceled' : campDate < today ? ' - Expired' : '';
    return `${camp.title}${status}`;
  };

  return (
    <div className="col-xl-12 col-lg-12 col-md-6">
      <div className="rounded-12 bg-white shadow-2 px-30 py-30 h-full">
        <div className="col-lg-12">
          <div className="text-28 fw-600 mb-3">
            <h4>Reservations</h4>
          </div>
          <div className="mb-3">
            <Select
              options={camps.map(camp => ({ label: getCampLabel(camp), value: camp._id }))}
              onChange={handleCampChange}
              values={camps.filter(camp => camp._id === selectedCamp).map(camp => ({ label: getCampLabel(camp), value: camp._id }))}
            />
          </div>
          <div className="mb-3">
            <b>Number of Reservations:</b> {reservations.length}
          </div>

          <div className="table-responsive">
            <table className="table-4 w-1/1">
              <thead style={{ color: 'white', backgroundColor: '#eb662b' }}>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Extras</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((reservation, index) => (
                  <tr key={index} onClick={() => handleRowClick(reservation)} style={{ cursor: 'pointer' }}>
                    <td data-label="#"> {indexOfFirstItem + index + 1}</td>
                    <td data-label="Name">{reservation.name}</td>
                    <td data-label="Email">{reservation.email}</td>
                    <td data-label="Phone">{reservation.phone}</td>
                    <td data-label="Date">{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                    <td data-label="Extras">{formatSelectedExtras(reservation.selectedExtras)}</td>
                    <td data-label="Price" style={{ fontWeight: 'bold' }}>{reservation.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={reservations.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />

          <div className="text-14 text-center mt-20">
            Showing results {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, reservations.length)} of {reservations.length}
          </div>

          {reservations.length > 0 && (
            <div className="text-right mt-3">
              <span className="download-box" onClick={downloadPDF} style={{ cursor: 'pointer', marginRight: '10px' }}>
                <FaDownload /> Download as PDF
              </span>
              <span className="download-box" onClick={printPDF} style={{ cursor: 'pointer' }}>
                <FaPrint /> Print Document
              </span>
            </div>
          )}
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Flip}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Sidebargrp";
import Header from "./Header";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddTour() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    emplacement: "",
    date: "",
    duration: "",
    groupSize: "",
    ages: "",
    googleMapUrl: "",
    locationMaterials: "no",
    description: "",
    highlights: "",
    campgrpEmail: localStorage.getItem('campgrpEmail') || "",
    campPictureCover: null,
    prix: "",
    inclusion: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/addCamp', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        toast.success('Camp added successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Reset form data
        setFormData({
          title: "",
          emplacement: "",
          date: "",
          duration: "",
          groupSize: "",
          ages: "",
          googleMapUrl: "",
          locationMaterials: "no",
          description: "",
          highlights: "",
          campgrpEmail: localStorage.getItem('campgrpEmail') || "",
          campPictureCover: null,
          prix: "",
          inclusion: ""
        });
      } else {
        toast.error('Failed to add camp', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Error: ' + error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div
        className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30">Add New Camp</h1>
            <p>Enter your camping information in the form below:</p>

            <br /><br />
            <form onSubmit={handleSubmit} className="contactForm border-1 rounded-12 px-60 py-30 md:px-25 md:py-30 row y-gap-30 " style={{ backgroundColor: 'white' }}>
              <div className="form-group col-md-6">
                <label>Camp Title</label>
                <input placeholder="Camping Oued Ezzin - guided and full activities" type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Emplacement</label>
                <input placeholder="Ain Drahem, Jendouba" type="text" name="emplacement" value={formData.emplacement} onChange={handleChange} className="form-control" required />
              </div>

              <div className="form-group col-md-6">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Duration (days)</label>
                <input placeholder="ex. 3" type="number" name="duration" value={formData.duration} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Group Size</label>
                <input placeholder="ex. 25" type="number" name="groupSize" value={formData.groupSize} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Ages</label>
                <input placeholder="18-30" type="text" name="ages" value={formData.ages} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Google Map URL</label>
                <input placeholder="Location on Google Map" type="url" name="googleMapUrl" value={formData.googleMapUrl} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Price (TND)</label>
                <input placeholder="ex. 75" type="number" name="prix" value={formData.prix} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Camp Overview</label>
                <textarea name="highlights" value={formData.highlights} onChange={handleChange} className="form-control" required></textarea>
              </div>
              <div className="form-group">
                <label>Planning</label>
                <ReactQuill theme="snow" value={formData.description} onChange={handleDescriptionChange} className="form-control" required />
              </div>

              <div className="form-group col-md-6">
                <label>Camp Picture Cover</label>
                <input type="file" name="campPictureCover" onChange={handleChange} className="form-control" required />
              </div>

              <div className="form-group col-md-6">
                <label>Inclusion</label>
                <input name="inclusion" value={formData.inclusion} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Location Materials</label>
                <div className="form-switch d-flex items-center">
                  <div className="switch">
                    <input type="checkbox" name="locationMaterials" checked={formData.locationMaterials === 'yes'} onChange={() => setFormData({ ...formData, locationMaterials: formData.locationMaterials === 'yes' ? 'no' : 'yes' })} />
                    <span className="switch__slider"></span>
                  </div>
                  <div className="text-13 lh-1 text-dark-1 ml-10">Yes</div>
                </div>
              </div>
              <button type="submit" className="button -md -light-2 bg-green-2 text-white col-12 mt-30">Add Camping</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

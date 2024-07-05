import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Sidebargrp";
import Header from "./Header";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '@/components/axiosInstance'; // Ensure the path is correct
import PropTypes from "prop-types";


const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'video', 'clean', 'image']
    ],
    handlers: {
      'image': function () {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = async () => {
          const file = input.files[0];
          if (file.size < 800 * 1024) { // less than 800 KB
            const reader = new FileReader();
            reader.onload = (e) => {
              this.quill.insertEmbed(this.quill.getSelection().index, 'image', e.target.result);
            };
            reader.readAsDataURL(file);
          } else {
            toast.error("Please use images smaller than 800 KB.");
          }
        };
        input.click();
      }
    }
  }
};

export default function AddBlog({ onLogout }) {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    creatorName: "",
    articleText: "",
    coverImage: null,
    tags: "",
    status: "pending" // Default status
  });

  useEffect(() => {
    const campgrpEmail = localStorage.getItem('campgrpEmail');
    setFormData(formData => ({ ...formData, campgrpEmail }));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 2000 * 1024) { // 2 MB limit
      setFormData({ ...formData, coverImage: file });
    } else {
      toast.error("Please upload an image cover smaller than 2 MB.");
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArticleTextChange = (value) => {
    setFormData({ ...formData, articleText: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.articleText || !formData.coverImage || !formData.campgrpEmail) {
      toast.error("All required fields must be filled, and an image must be uploaded.");
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'coverImage' && formData[key]) {
        data.append(key, formData[key], formData[key].name);
      } else {
        data.append(key, formData[key]);
      }
    });

    // Log the form data for debugging
    for (let pair of data.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axiosInstance.post('/api/blogs', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        toast.success('Blog added successfully');
        // Reset form after successful submission
        setFormData({
          title: "",
          description: "",
          type: "",
          creatorName: "",
          articleText: "",
          coverImage: null,
          tags: "",
          campgrpEmail: localStorage.getItem('campgrpEmail'), // Reset to the value from localStorage
          status: "pending" // Reset status to default
        });
      } else {
        toast.error('Failed to add blog');
      }
    } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.error : error.message}`);
    }
  };


  return (
    <>
      <div className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}>
        <Sidebar setSideBarOpen={setSideBarOpen} onLogout={onLogout} />
        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />
          <div className="dashboard__content_content">
            <h1 className="text-30">Add New Blog</h1>
            <p>Enter your blog information in the form below:</p>
            <form onSubmit={handleSubmit} className="topmg contactForm border-1 rounded-12 px-60 py-30 md:px-25 md:py-30 row y-gap-30" style={{ backgroundColor: 'white' }}>
              <div className="form-group col-md-6">
                <label>Blog Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="form-control" required>
                  <option value="">Select Type</option>
                  <option value="Camping">Camping</option>
                  <option value="Tour">Tour</option>
                  <option value="News">News</option>
                </select>
              </div>
              <div className="form-group col-md-12">
                <label>Short Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-12" style={{ paddingBottom: '50px' }}>
                <label>Article Text</label>
                <ReactQuill theme="snow" value={formData.articleText} onChange={handleArticleTextChange} modules={modules} formats={[
                  'bold', 'italic', 'underline', 'strike',
                  'header',
                  'list', 'bullet',
                  'blockquote', 'code-block',
                  'script', 'indent',
                  'direction',
                  'size',
                  'color', 'background',
                  'align',
                  'link', 'video', 'image'
                ]} style={{ height: '500px' }} required />
              </div>
              <div className="form-group col-md-12 ">
                <label>Blog Cover Image</label>
                <button type="button" className="button -md -light-2 bg-red-2 text-white" onClick={triggerFileInput}>Upload Image</button>
                <input type="file" id="fileInput" style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
                {formData.coverImage && <p>{formData.coverImage.name}</p>}
              </div>
              <div className="form-group col-md-6">
                <label>Tags (comma-separated)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="form-control" />
              </div>
              <div className="form-group col-md-6">
                <label>Creator Name (optional)</label>
                <input type="text" name="creatorName" value={formData.creatorName} onChange={handleChange} className="form-control" />
              </div>
              <button type="submit" className="button -md -light-2 bg-green-2 text-white col-12 mt-30">Add Blog</button>
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
AddBlog.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

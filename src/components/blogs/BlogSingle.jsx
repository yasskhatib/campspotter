import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentBox from "./CommentBox";
import LoadingSpinner from "@/components/common/LoadingSpinner2"; // Ensure the path is correct
import axiosInstance from '../../axiosInstance'; // Import the Axios instance

export default function BlogSingle({ setBlogTitle }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [showMessage, setShowMessage] = useState(false); // New state to manage the visibility of the message
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  useEffect(() => {
    if (!id) return;

    axiosInstance.get(`/api/blogs/${id}`)
      .then(response => {
        if (response.data.status === "approved") {
          setBlogTitle(response.data.title);  // Update the page title
          const updatedContent = modifyContent(response.data.articleText);
          setBlog({ ...response.data, articleText: updatedContent });
        } else {
          setShowMessage(true); // Show the not approved message
            navigate('/404');
        }
      })
      .catch(error => {
        toast.info("Article not approved");
        setShowMessage(true); // Show the not approved message
        setTimeout(() => {
          navigate('/blog');
        }, 2000);
      });
  }, [id, setBlogTitle, navigate]);

  // Function to modify iframe sizes, style blockquotes and pre tags
  const modifyContent = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Adjust iframe dimensions
    const iframes = doc.querySelectorAll("iframe");
    iframes.forEach(iframe => {
      iframe.style.width = "100%";
      // Default to desktop view
      iframe.style.height = "calc(50vw / 16 * 9)";
      iframe.className = "rounded-8";

      // Check if the device width is less than or equal to 768px (common breakpoint for tablets and mobile devices)
      if (window.innerWidth <= 768) {
        iframe.style.height = "calc(100vw / 16 * 9)";
      }
      // Optionally, update dimensions on resize
      window.addEventListener('resize', () => {
        iframes.forEach(iframe => {
          if (window.innerWidth <= 768) {
            iframe.style.height = "calc(100vw / 16 * 9)";
          } else {
            iframe.style.height = "calc(50vw / 16 * 9)";
          }
        });
      });
    });

    // Style blockquotes
    const blockquotes = doc.querySelectorAll("blockquote");
    blockquotes.forEach(blockquote => {
      const blockquoteContent = blockquote.innerHTML;
      blockquote.outerHTML = generateStyledBlockquote(blockquoteContent);
    });

    // Style pre tags like blockquotes
    const pres = doc.querySelectorAll("pre");
    pres.forEach(pre => {
      const preContent = pre.textContent;
      pre.outerHTML = generateStyledPre(preContent);
    });

    // Add classes to ul tags
    const uls = doc.querySelectorAll("ul");
    uls.forEach(ul => {
      ul.className = "ulList2 mt-20"; // Adds class to each <ul> element
    });

    const paragraphs = doc.querySelectorAll("p");
    paragraphs.forEach(p => {
      p.className = "mt-10";
    });

    // Modify consecutive images within p tags
    doc.querySelectorAll("p").forEach(p => {
      const imgs = p.querySelectorAll("img");
      if (imgs.length >= 2) {
        let newHTML = '<div class="row y-gap-20 pt-20">';
        imgs.forEach((img, index) => {
          if (index % 2 === 0 && index > 0) { // Start a new row after every two images
            newHTML += '</div><div class="row">';
          }
          newHTML += `<div class="col-md-6"><img src="${img.src}" alt="image${index + 1}" class="rounded-8"></div>`;
        });
        newHTML += '</div>'; // Close the last opened row div
        p.outerHTML = newHTML;
      }
    });

    // Add classes to em tags
    // const ems = doc.querySelectorAll("em");
   //  ems.forEach(em => {
    //   em.style.display = "flex";
     //  em.style.border = "dashed 0.5px black";
     //  em.style.borderRadius = "8px";
    //   em.style.padding = "10px";
    //   em.style.lineHeight = "25px";
     //  em.style.marginTop = "15px";
   //  });

    // Modify img tags
    const imgs = doc.querySelectorAll("img");
    imgs.forEach(img => {
      const imgLink = img.src;
      const imgAlt = img.alt;
      img.outerHTML = `<div class=" img-zoom col-md-12"><img src="${imgLink}" alt="${imgAlt}" class="rounded-8"></div><br></br>`;
    });

    return doc.body.innerHTML; // Return the modified HTML as a string
  };

  // Generate styled blockquote HTML
  const generateStyledBlockquote = (content) => `
    <div class="blockquote bg-accent-1-05 rounded-12 px-30 py-30 mt-20">
      <div class="blockquote__icon">
        <svg width="37" height="25" viewBox="0 0 37 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.50417 24.1C4.50417 24.1 2.8375 23.3333 1.50417 21.8C0.237499 20.2 -0.229167 17.9667 0.104167 15.1C0.570834 10.7 2.17083 7.1 4.90417 4.3C7.70417 1.43333 11.1708 0 15.3042 0C16.6375 0 17.6042 0.099998 18.2042 0.299995L17.4042 4.3C16.6708 4.16667 15.6375 4.1 14.3042 4.1C13.0375 4.1 11.8375 4.4 10.7042 5C9.6375 5.6 8.80417 6.4 8.20417 7.4C6.9375 8.86667 6.1375 10.5333 5.80417 12.4C6.80417 11.4 8.1375 10.9 9.80417 10.9C11.4708 10.9 12.8042 11.4 13.8042 12.4C14.8042 13.4 15.2042 14.7667 15.0042 16.5C14.8042 18.6333 13.8708 20.4333 12.2042 21.9C10.6042 23.3667 8.70417 24.1 6.50417 24.1ZM24.9042 24.1C22.9042 24.1 21.2375 23.3333 19.9042 21.8C18.6375 20.2 18.1708 17.9667 18.5042 15.1C18.9708 10.7 20.5708 7.1 23.3042 4.3C26.1042 1.43333 29.5708 0 33.7042 0C35.0375 0 36.0042 0.099998 36.6042 0.299995L35.8042 4.3C35.0708 4.16667 34.0375 4.1 32.7042 4.1C31.4375 4.1 30.2375 4.4 29.1042 5C28.0375 5.6 27.2042 6.4 26.6042 7.4C25.3375 8.86667 24.5375 10.5333 24.2042 12.4C25.2042 11.4 26.5375 10.9 28.2042 10.9C29.8708 10.9 31.2042 11.4 32.2042 12.4C33.2042 13.4 33.6042 14.7667 33.4042 16.5C33.2042 18.6333 32.2708 20.4333 30.6042 21.9C29.0042 23.3667 27.1042 24.1 24.9042 24.1Z" fill="#EB662B"></path>
        </svg>
      </div>
      <div class="blockquote__text">“${content}“</div>
    </div>
  `;

  // Generate styled pre HTML
  const generateStyledPre = (content) => `
    <div class="blockquote bg-darkk rounded-12 px-30 py-30 mt-20">
      <div class="blockquote__text">${content}</div>
    </div>
  `;

  if (!blog) {
    return <LoadingSpinner />;
  }

  // Helper function to render tags
  const renderTags = (tags) => {
    if (Array.isArray(tags)) {
      const delimiterRegex = /[\s,*_/-]+/; // Regex for multiple delimiters
      const slicedTags = tags[0].split(delimiterRegex).slice(0, 4); // Limit to the first 4 tags
      return (
        <div className="d-flex x-gap-10">
          {slicedTags.map((tag, index) => (
            <div key={index}>
              <button className="button -accent-1 border-1 text-14 px-15 py-10 rounded-200">
                {tag.trim()}
              </button>
            </div>
          ))}
        </div>
      );
    } else {
      return <p></p>;
    }
  };

  return (
    <>
      <ToastContainer theme="dark" /> {/* Set the theme to dark */}
      {showMessage && (
        <div className="not-approved-message">
          Article Not Approved, page will be redirected back
        </div>
      )}

      <section className="hero -type-1 -min-2">
        <div className="hero__bg">
          <img src={blog.coverImage} alt="Cover" />
          <img className="shapesvg" src="/img/hero/1/shape.svg" alt="image" style={{ height: 'auto' }} />
          <div className="gradient-overlay"></div>
        </div>
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-12">
              <div className="hero__content">
                <h1 className="htt" style={{ fontFamily: 'Merienda, cursive' }}>{blog.title}</h1>
                <p className="hero__text">
                  {blog.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>







      <section className="layout-pt-md layout-pb-xl">
      
        <div className="container">
          <div className="row y-gap-30 justify-center">
            <div className="col-lg-8">
              
              <div className="mt-20" dangerouslySetInnerHTML={{ __html: blog.articleText }} />

              <div className="row y-gap-15 justify-between items-center pt-20">
                <div className="col-auto">
                  {/* Example of social media icons layout */}
                  <div className="d-flex x-gap-10">
                    <div>
                      <a href="#" className="button -accent-1 size-40 flex-center bg-accent-1-05 rounded-full">
                        <i className="icon-facebook text-14"></i>
                      </a>
                    </div>
                    <div>
                      <a href="#" className="button -accent-1 size-40 flex-center bg-accent-1-05 rounded-full">
                        <i className="icon-twitter text-14"></i>
                      </a>
                    </div>
                    <div>
                      <a href="#" className="button -accent-1 size-40 flex-center bg-accent-1-05 rounded-full">
                        <i className="icon-instagram text-14"></i>
                      </a>
                    </div>
                    {/* More social icons... */}
                  </div>
                </div>
                <div className="col-auto">
                  {/* Tag rendering */}
                  {renderTags(blog.tags)}
                </div>
              </div>

              <div className="line mt-60 mb-60"></div>

              <div className="row y-gap-20">
                <div className="col-auto">
                  <img src="/img/blogSingle/3.png" alt="image" />
                </div>
                <div className="col">
                  <div className="text-18 fw-500">{blog.creatorName || "Anonymous"}</div>
                  <div className="lh-15">On {new Date(blog.date).toLocaleDateString()}</div>
                  <div className="mt-20">
                    Likes: {blog.likesCount} Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies risus, vel rutrum erat commodo ut. Praesent finibus congue euismod. Nullam scelerisque massa vel augue placerat, a tempor sem egestas. Curabitur placerat finibus lacus.
                  </div>
                </div>
              </div>

              <div className="line mt-60 mb-60"></div>

              <CommentBox />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

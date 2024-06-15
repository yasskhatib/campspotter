import { useEffect, useState, useRef } from 'react';
import './searchbar.css'; // Import your custom CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function Hero1() {
  const [placeholder, setPlaceholder] = useState('');
  const placeholders = useRef([
    'Where are you going?',
    'Join campspotter now',
    'Search for camping in Tunisia',
    'You can join as a group of camping',
    'Search and pick your first camp now..'
  ]);
  const placeholderIndex = useRef(0);
  const charIndex = useRef(0);
  const currentPlaceholder = useRef('');
  const isDeleting = useRef(false);

  const images = [
    '/img/hero/1/bg1.jpg',
    '/img/hero/1/bg2.jpg',
    '/img/hero/1/bg3.jpg',
    '/img/hero/1/bg4.jpg',
    '/img/hero/1/bg5.jpg',
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 6 seconds (4 seconds visible, 2 seconds transition)

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const updatePlaceholder = () => {
      if (isDeleting.current) {
        if (charIndex.current > 0) {
          currentPlaceholder.current = placeholders.current[placeholderIndex.current].substring(0, charIndex.current - 1);
          charIndex.current--;
          setPlaceholder(currentPlaceholder.current);
        } else {
          isDeleting.current = false;
          placeholderIndex.current = (placeholderIndex.current + 1) % placeholders.current.length;
        }
      } else {
        if (charIndex.current < placeholders.current[placeholderIndex.current].length) {
          currentPlaceholder.current = placeholders.current[placeholderIndex.current].substring(0, charIndex.current + 1);
          charIndex.current++;
          setPlaceholder(currentPlaceholder.current);
        } else {
          setTimeout(() => { isDeleting.current = true; }, 1000); // Delay before starting to delete text
        }
      }
      setTimeout(updatePlaceholder, isDeleting.current ? 100 : 150); // Adjust timing for smoother typing
    };

    updatePlaceholder();
  }, []);

  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const searchQuery = e.target.elements.searchInput.value.trim(); // Get the search query from the input field
    if (searchQuery) {
      // Redirect to the camps page with the search query
      navigate(`/camps?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="hero -type-1" style={{ backgroundColor: 'white', position: 'relative' }}>
      <div className="hero__bg">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="background"
            className={`bg-image ${activeIndex === index ? 'active' : ''} ${activeIndex === (index + 1) % images.length ? 'next' : ''}`}
          />
        ))}
        <img src="/img/hero/1/shape.svg" alt="image" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, margin: 'auto', zIndex: 1 }} />

      </div>


      <div className="container">
        <div className="row justify-center searchh" style={{ marginTop: '-35px' }}>
          <div className="col-xl-8 col-lg-10">
            <div className="hero__content" style={{ textAlign: 'center' }}>
              <h1 data-aos="fade-up" className="hero__title">
                campspotter
              </h1>


              <p
                data-aos="fade-up"
                className="hero__text"
              >
                Discover joy in every journey, whether it&apos;s a nearby getaway or a distant adventure,<br />
                and find happiness anytime, anywhere.
              </p>

              {/* Search bar added below */}
              <form className="search-bar" data-aos="fade-up" data-aos-delay="200" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="search-input"
                  placeholder={placeholder}
                  name="searchInput" // Add name attribute to the input field
                />
                <button type="submit" className="search-button"> {/* Change button type to submit */}
                  <svg className="search-icon" viewBox="0 0 24 24">
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                  </svg>
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

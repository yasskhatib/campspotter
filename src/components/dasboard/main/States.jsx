import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner2 from "@/components/common/LoadingSpinner2"; // Ensure the path is correct

export default function States() {
  const [reviews, setReviews] = useState({ score: 0, count: 0 });
  const [reservations, setReservations] = useState({ total: 0, month: 0 });
  const [camps, setCamps] = useState({ total: 0, recent: 0 });
  const [revenue, setRevenue] = useState({ total: 0, month: 0 });
  const [loading, setLoading] = useState(true); // Add loading state

  const campgrpEmail = localStorage.getItem('campgrpEmail');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewRes, reservationsRes, campsRes, revenueRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/reviews/stats`, { params: { email: campgrpEmail } }),
          axios.get(`http://localhost:5000/api/reservations/stats`, { params: { email: campgrpEmail } }),
          axios.get(`http://localhost:5000/api/camps/stats`, { params: { email: campgrpEmail } }),
          axios.get(`http://localhost:5000/api/revenue/stats`, { params: { email: campgrpEmail } })
        ]);
        setReviews({ score: reviewRes.data.averageScore, count: reviewRes.data.totalReviews });
        setReservations({ total: reservationsRes.data.total, month: reservationsRes.data.thisMonth });
        setCamps({ total: campsRes.data.total, recent: campsRes.data.recent });
        setRevenue({ total: revenueRes.data.total, month: revenueRes.data.thisMonth });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchData();
  }, [campgrpEmail]); // Dependency array ensures useEffect runs when campgrpEmail changes

  return (
    <div className="row y-gap-30 pt-30 md:pt-30">
      {loading ? (
        <div className="spinner-section">
          <LoadingSpinner2 />
        </div>
      ) : (
        <>
          <div className="col-xl-3 col-sm-6">
            <div className="rounded-12 bg-white shadow-2 px-30 py-30 h-full">
              <div className="row y-gap-20 items-center justify-between">
                <div className="col-auto">
                  <div>Ratings</div>
                  <div className="text-30 fw-700">{reviews.score}</div>
                  <div><span className="text-accent-1">{reviews.count}</span> Reviews</div>
                </div>
                <div className="col-auto">
                  <div className="size-80 flex-center bg-accent-1-05 rounded-full">
                    <i className="text-30 icon-heart text-accent-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6">
            <div className="rounded-12 bg-white shadow-2 px-30 py-30 h-full">
              <div className="row y-gap-20 items-center justify-between">
                <div className="col-auto">
                  <div>Reservations</div>
                  <div className="text-30 fw-700">{reservations.total}</div>
                  <div><span className="text-accent-1">{reservations.month}</span> /Month</div>
                </div>
                <div className="col-auto">
                  <div className="size-80 flex-center bg-accent-1-05 rounded-full">
                    <i className="text-30 icon-booking text-accent-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6">
            <div className="rounded-12 bg-white shadow-2 px-30 py-30 h-full">
              <div className="row y-gap-20 items-center justify-between">
                <div className="col-auto">
                  <div>Campings</div>
                  <div className="text-30 fw-700">{camps.total}</div>
                  <div><span className="text-accent-1">{camps.recent}</span> /Month</div>
                </div>
                <div className="col-auto">
                  <div className="size-80 flex-center bg-accent-1-05 rounded-full">
                    <i className="text-30 icon-wallet text-accent-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6">
            <div className="rounded-12 bg-white shadow-2 px-30 py-30 h-full">
              <div className="row y-gap-20 items-center justify-between">
                <div className="col-auto">
                  <div>Revenues</div>
                  <div className="text-30 fw-700">{revenue.total}</div>
                  <div><span className="text-accent-1">{revenue.month}</span> /Month</div>
                </div>
                <div className="col-auto">
                  <div className="size-80 flex-center bg-accent-1-05 rounded-full">
                    <i className="text-30 icon-payment text-accent-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

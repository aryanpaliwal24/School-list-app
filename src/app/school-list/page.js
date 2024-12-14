'use client';

import { useEffect, useState } from 'react';
import '@/styles/school.css';

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/school');
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) return <p>Loading schools...</p>;

  return (
    <div>
      <div className="school-grid">
        {schools.length > 0 ? (
          schools.map((school) => (
            <div key={school.id} className="school-card">
              <img
                src={`/images/${school.image}`}  
                alt={school.name}
                className="school-image"
              />
              <h3>{school.name}</h3>
              <p>{school.address}</p>
              <p>{school.city}, {school.state}</p>
              <p>{school.contact}</p>
              <p>{school.email_id}</p>
            </div>
          ))
        ) : (
          <p>No schools available</p>
        )}
      </div>
    </div>
  );
}

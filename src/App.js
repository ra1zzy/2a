import React, { useState, useEffect } from "react";
import Loading from "./Loading"; 
import Tours from "./Tours"; 

const url = "https://course-api.com/react-tours-project";

function App() {
  
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true); 
    try {
      const response = await fetch(url); 
      const tours = await response.json(); 
      setTours(tours); 
      setLoading(false); 
    } catch (error) {
      setLoading(false); 
      console.error(error); 
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    const remainingTours = tours.filter((tour) => tour.id !== id); 
    setTours(remainingTours); 
  };

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className="btn" onClick={fetchTours}> {/* Кнопка для перезагрузки туров */}
            Refresh
          </button>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;

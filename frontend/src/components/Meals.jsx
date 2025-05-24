import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttps.js";
import Error from "./Error.jsx";
import { useState } from "react";
import logoos from "../assets/spoon-and-fork.png";
import ProductDetailsModal from "./ProductDetailsModal.jsx";

const requestConfig = {};

export default function Meals() {
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search input
  const [selectedMeal, setSelectedMeal] = useState(null); // State for modal data

  const {
    data: loadMeals,
    isLoading,
    error,
  } = useHttp(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/meals`, requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title={"NOT FOUND!"} message={"An error occurred!"} />;
  }

  // Filter meals based on the search query
  const filteredMeals = loadMeals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleShowDetails = (meal) => {
    setSelectedMeal(meal);
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div>
      <div className="searchable-list flex">
      <img src={logoos} className="logosize" alt="logo" />
      <h2 className="meanu-text center">Our Menu</h2>
        <input
          type="text"
          placeholder="Search Food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchable-list"
        />
      </div>
      <ul id="meals" className="meals-section">
        {filteredMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} onShowDetails={handleShowDetails}/>
        ))}
      </ul>
      {selectedMeal && (
        <ProductDetailsModal meal={selectedMeal} onClose={handleCloseModal}/>
      ) }
    </div>
  );
}

// ***///


// export default function OurMenue() {
//   return (
//     <div className="logosize flex">
       
//     </div>
//   );
// }

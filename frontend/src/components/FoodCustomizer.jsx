import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FoodCustomizer = ({ foodItem, onCustomize }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [previewScale, setPreviewScale] = useState(1);
  const [is3DView, setIs3DView] = useState(false);

  const customizationOptions = {
    size: ['Small', 'Medium', 'Large'],
    toppings: ['Extra Cheese', 'Mushrooms', 'Onions', 'Peppers', 'Olives'],
    sauce: ['Tomato', 'BBQ', 'Garlic', 'Spicy'],
    crust: ['Thin', 'Regular', 'Thick', 'Stuffed'],
  };

  const handleOptionSelect = (category, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: option
    }));
  };

  const handle3DView = () => {
    setIs3DView(!is3DView);
  };

  return (
    <div className="food-customizer">
      <div className="customizer-header">
        <h2>Customize Your {foodItem.name}</h2>
        <button 
          className="view-toggle"
          onClick={handle3DView}
          aria-label={is3DView ? "Switch to 2D view" : "Switch to 3D view"}
        >
          {is3DView ? "2D View" : "3D View"}
        </button>
      </div>

      <div className="customizer-content">
        <div className="food-preview">
          <AnimatePresence>
            {is3DView ? (
              <motion.div
                key="3d"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 90 }}
                className="preview-3d"
              >
                <img 
                  src={foodItem.image3D} 
                  alt={`3D view of ${foodItem.name}`}
                  style={{ transform: `scale(${previewScale})` }}
                />
                <div className="preview-controls">
                  <button onClick={() => setPreviewScale(prev => Math.min(prev + 0.1, 2))}>
                    Zoom In
                  </button>
                  <button onClick={() => setPreviewScale(prev => Math.max(prev - 0.1, 0.5))}>
                    Zoom Out
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="2d"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="preview-2d"
              >
                <img src={foodItem.image} alt={foodItem.name} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="customization-options">
          {Object.entries(customizationOptions).map(([category, options]) => (
            <div key={category} className="option-group">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <div className="option-buttons">
                {options.map(option => (
                  <button
                    key={option}
                    className={`option-button ${
                      selectedOptions[category] === option ? 'selected' : ''
                    }`}
                    onClick={() => handleOptionSelect(category, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="customizer-footer">
        <button 
          className="save-customization"
          onClick={() => onCustomize(selectedOptions)}
        >
          Save Customization
        </button>
      </div>
    </div>
  );
};

export default FoodCustomizer; 
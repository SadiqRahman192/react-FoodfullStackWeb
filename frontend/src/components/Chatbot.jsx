import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you with your food order today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showFeedback, setShowFeedback] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false); // State for thinking indicator
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State for theme toggle
  const messagesEndRef = useRef(null);
  
  // Sample FAQs for matching
  const faqs = [
    { question: 'What are your vegan options?', answer: 'We offer a variety of vegan dishes, including our Veggie Delight Pizza and Tofu Stir-Fry. Check the menu for more!' },
    { question: 'How long is delivery?', answer: 'Delivery typically takes 30-45 minutes, depending on your location.' },
    { question: 'Can I customize my order?', answer: 'Yes, you can customize most items directly in the app!' },
    { question: 'Hi', answer: 'Hello! How can I assist you with your food order today?' },
    { question: 'Hello', answer: 'Hi there! How can I help you with your meal today?' },
    { question: 'Assalamu Alaikum', answer: 'Wa Alaikum Salam! How can I assist you with your food order?' },
    { question: 'How are you?', answer: 'I’m doing great, thanks for asking! How can I help you with your order?' },
    { question: 'Who are you?', answer: 'I’m FoodBot, your friendly assistant for this food app. I’m here to help with orders and questions!' },
    { question: 'What’s on the menu?', answer: 'Our menu includes pizzas, stir-fries, salads, and more. Check the app for the full list!' },
    { question: 'Do you have gluten-free options?', answer: 'Yes, we offer gluten-free pizzas and breads. See the menu for details!' },
    { question: 'What’s the minimum order amount?', answer: 'The minimum order is $10. Check your cart for the total!' },
    { question: 'Can I cancel my order?', answer: 'Yes, you can cancel within 10 minutes of placing the order. Contact support via the app!' },
    { question: 'Do you offer discounts?', answer: 'Yes, check the app for current promotions and discounts!' },
    { question: 'What payment methods do you accept?', answer: 'We accept credit cards, debit cards, and mobile payments like Google Pay.' },
    { question: 'Is there a delivery fee?', answer: 'Yes, a $2 delivery fee applies for orders under $20.' },
    { question: 'Can I schedule a delivery?', answer: 'Yes, you can schedule deliveries up to 7 days in advance in the app!' },
    { question: 'What if my order is wrong?', answer: 'Please contact support within 30 minutes, and we’ll fix it for you!' },
    { question: 'Do you deliver to my area?', answer: 'Enter your address in the app to check delivery availability!' },
    { question: 'What are your operating hours?', answer: 'We’re open from 10 AM to 10 PM daily. Check the app for exact times!' },
    { question: 'Can I order for someone else?', answer: 'Yes, just enter their delivery address during checkout!' },
    { question: 'Do you have spicy options?', answer: 'Yes, try our Spicy Chicken Pizza or Hot Tofu Stir-Fry!' },
    { question: 'How can I track my order?', answer: 'Use the tracking feature in the app after placing your order!' },
    { question: 'What’s the contact number?', answer: 'Call us at 1-800-FOOD-APP for support!' },
    { question: 'Do you offer catering?', answer: 'Yes, contact us via the app for catering options!' },
    { question: 'Can I reorder a past order?', answer: 'Yes, check your order history in the app to reorder!' },
    { question: 'What is the price of Mac & Cheese?', answer: 'The price of Mac & Cheese is $8.99.' },
    { question: 'What is the price of Margherita Pizza?', answer: 'The price of Margherita Pizza is $12.99.' },
    { question: 'What is the price of Caesar Salad?', answer: 'The price of Caesar Salad is $7.99.' },
    { question: 'What is the price of Spaghetti Carbonara?', answer: 'The price of Spaghetti Carbonara is $10.99.' },
    { question: 'What is the price of Veggie Burger?', answer: 'The price of Veggie Burger is $9.99.' },
    { question: 'What is the price of Grilled Chicken Sandwich?', answer: 'The price of Grilled Chicken Sandwich is $10.99.' },
    { question: 'What is the price of Steak Frites?', answer: 'The price of Steak Frites is $17.99.' },
    { question: 'What is the price of Sushi Roll Platter?', answer: 'The price of Sushi Roll Platter is $15.99.' },
    { question: 'What is the price of Chicken Curry?', answer: 'The price of Chicken Curry is $13.99.' },
    { question: 'What is the price of Vegan Buddha Bowl?', answer: 'The price of Vegan Buddha Bowl is $11.99.' },
    { question: 'What is the price of Seafood Paella?', answer: 'The price of Seafood Paella is $19.99.' },
    { question: 'What is the price of Pancake Stack?', answer: 'The price of Pancake Stack is $8.99.' },
    { question: 'What is the price of Miso Ramen?', answer: 'The price of Miso Ramen is $12.99.' },
    { question: 'What is the price of Beef Tacos?', answer: 'The price of Beef Tacos is $9.99.' },
    { question: 'What is the price of Chocolate Brownie?', answer: 'The price of Chocolate Brownie is $5.99.' },
    { question: 'What is the price of Lobster Bisque?', answer: 'The price of Lobster Bisque is $14.99.' },
    { question: 'What is the price of Mushroom Risotto?', answer: 'The price of Mushroom Risotto is $13.99.' },
    { question: 'What is the price of Eggplant Parmesan?', answer: 'The price of Eggplant Parmesan is $11.99.' }
  ];


  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch suggestions based on input
  useEffect(() => {
    if (input.trim()) {
      const matchedFaqs = faqs
        .filter(faq => faq.question.toLowerCase().includes(input.toLowerCase()))
        .map(faq => faq.question);
      setSuggestions(matchedFaqs.slice(0, 3));
    } else {
      setSuggestions(faqs.map(faq => faq.question).slice(0, 3));
    }
  }, [input]);

  // Handle sending a message
  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { text, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setSuggestions([]);
    setIsThinking(true); // Start thinking

    try {
      // Send message to backend
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await response.json();

      // Simulate thinking delay (2 seconds)
      setTimeout(() => {
        setMessages([...newMessages, { text: data.reply, sender: 'bot' }]);
        setIsThinking(false); // Stop thinking after response
        setShowFeedback(data.messageId); // Show feedback
      }, 2000); // 2000ms = 2 seconds delay
    } catch (error) {
      setTimeout(() => {
        setMessages([...newMessages, { text: 'Sorry, something went wrong. Try again!', sender: 'bot' }]);
        setIsThinking(false); // Stop thinking on error
      }, 2000); // 2 seconds delay on error
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    sendMessage(suggestion);
  };

  // Handle feedback submission
  const submitFeedback = async (messageId, isHelpful) => {
    try {
      await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, isHelpful })
      });
      setShowFeedback(null); // Hide feedback buttons
    } catch (error) {
      console.error('Feedback submission failed:', error);
    }
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      {/* Sticky Chat Icon */}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        💬
      </div>

      {/* Chatbot Container - Conditionally Rendered */}
      {isChatbotOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            FoodBot
            <button className="chatbot-close" onClick={toggleChatbot}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <span>{msg.text}</span>
                {msg.sender === 'bot' && showFeedback === index && (
                  <div className="feedback">
                    <span>Was this helpful?</span>
                    <button onClick={() => submitFeedback(index, true)}>👍</button>
                    <button onClick={() => submitFeedback(index, false)}>👎</button>
                  </div>
                )}
              </div>
            ))}
            {isThinking && (
              <div className="message bot">
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-suggestions">
            {suggestions.map((suggestion, index) => (
              <button key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;



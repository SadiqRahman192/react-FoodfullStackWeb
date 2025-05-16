import express from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'node:fs/promises';
import 'dotenv/config';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Sample FAQs for chatbot
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


// Store feedback (in-memory for simplicity)
const feedbackStore = [];

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const messageId = Date.now(); // Simple ID for feedback

  // Check for FAQ match
  const matchedFaq = faqs.find(faq => 
    faq.question.toLowerCase().includes(message.toLowerCase())
  );

  if (matchedFaq) {
    return res.json({ reply: matchedFaq.answer, messageId });
  }

  try {
    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful chatbot for a food app. Provide concise and relevant answers about food orders, menus, and delivery.' },
          { role: 'user', content: message }
        ],
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    res.json({ reply, messageId });
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Sorry, I couldn’t process that. Try again!' });
  }
});

// Feedback endpoint
app.post('/api/feedback', (req, res) => {
  const { messageId, isHelpful } = req.body;
  feedbackStore.push({ messageId, isHelpful, timestamp: new Date() });
  console.log('Feedback received:', { messageId, isHelpful });
  res.json({ success: true });
});

// Food app routes
app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: 'Error reading meals data.' });
  }
});

app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

app.get('/meals/:id', async (req, res) => {
  try {
    const mealId = req.params.id;
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    const mealsData = JSON.parse(meals);
    const meal = mealsData.find((meal) => meal.id === mealId);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching meal details.' });
  }
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  if (
    !orderData.customer.email ||
    !orderData.customer.email.includes('@') ||
    !orderData.customer.name ||
    orderData.customer.name.trim() === '' ||
    !orderData.customer.street ||
    orderData.customer.street.trim() === '' ||
    !orderData.customer['postal-code'] ||
    orderData.customer['postal-code'].trim() === '' ||
    !orderData.customer.city ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message: 'Missing data: Email, name, street, postal code, or city is missing.',
    });
  }

  try {
    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing order.' });
  }
});

// Handle OPTIONS requests and 404
app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

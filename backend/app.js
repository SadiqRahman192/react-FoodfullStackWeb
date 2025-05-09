import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
  // res.json("HELLO! SADIQ")
});

app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})

app.get('/meals/:id', async (req, res) => {
  try {
    const mealId = req.params.id; // Get meal ID from request params
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    const mealsData = JSON.parse(meals);
    const meal = mealsData.find((meal) => meal.id === mealId);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    res.json(meal); // Send the found meal details as response
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching meal details.' });
  }
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);


///BY CHATGPT BACKEND FILE

// import fs from 'node:fs/promises';

// import bodyParser from 'body-parser';
// import express from 'express';

// const app = express();

// app.use(bodyParser.json());
// app.use(express.static('public'));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// // Fetch all meals
// app.get('/meals', async (req, res) => {
//   const meals = await fs.readFile('./data/available-meals.json', 'utf8');
//   res.json(JSON.parse(meals));
// });

// // Fetch details of a specific meal
// app.get('/meals/:id', async (req, res) => {
//   try {
//     const mealId = req.params.id; // Get meal ID from request params
//     const meals = await fs.readFile('./data/available-meals.json', 'utf8');
//     const mealsData = JSON.parse(meals);
//     const meal = mealsData.find((meal) => meal.id === mealId);

//     if (!meal) {
//       return res.status(404).json({ message: 'Meal not found.' });
//     }

//     res.json(meal); // Send the found meal details as response
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred while fetching meal details.' });
//   }
// });

// // Handle new orders
// app.post('/orders', async (req, res) => {
//   const orderData = req.body.order;

//   if (orderData === null || orderData.items === null || orderData.items.length === 0) {
//     return res.status(400).json({ message: 'Missing data.' });
//   }

//   if (
//     orderData.customer.email === null ||
//     !orderData.customer.email.includes('@') ||
//     orderData.customer.name === null ||
//     orderData.customer.name.trim() === '' ||
//     orderData.customer.street === null ||
//     orderData.customer.street.trim() === '' ||
//     orderData.customer['postal-code'] === null ||
//     orderData.customer['postal-code'].trim() === '' ||
//     orderData.customer.city === null ||
//     orderData.customer.city.trim() === ''
//   ) {
//     return res.status(400).json({
//       message:
//         'Missing data: Email, name, street, postal code or city is missing.',
//     });
//   }

//   const newOrder = {
//     ...orderData,
//     id: (Math.random() * 1000).toString(),
//   };
//   const orders = await fs.readFile('./data/orders.json', 'utf8');
//   const allOrders = JSON.parse(orders);
//   allOrders.push(newOrder);
//   await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
//   res.status(201).json({ message: 'Order created!' });
// });

// app.use((req, res) => {
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   res.status(404).json({ message: 'Not found' });
// });

// app.listen(3000, () => console.log('Server is running on port 3000'));

// import express from 'express';
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();
// const router = express.Router();

// router.post('/', async (req, res) => {
//   const userMessage = req.body.message;

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: userMessage }],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     const botReply = response.data.choices[0].message.content;
//     res.json({ reply: botReply });

//   } catch (error) {
//     console.error('OpenAI Error:', error.message);
//     res.status(500).json({ reply: "Sorry, something went wrong." });
//   }
// });

// export default router;

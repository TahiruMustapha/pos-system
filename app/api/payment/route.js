import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { reference } = req.body;
  
      if (!reference) {
        return res.status(400).json({ error: 'Reference is required' });
      }
  
      try {
        const PAYSTACK_TEST_SECRETE_KEY = process.env.PAYSTACK_TEST_SECRETE_KEY;
  
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: {
            Authorization: `Bearer ${PAYSTACK_TEST_SECRETE_KEY}`,
            'Content-Type': 'application/json',
          },
        });
  
        const { status, data } = response.data;
  
        if (status === 'success') {
          // Handle successful verification
          return res.status(200).json(data);
        } else {
          // Handle failed verification
          return res.status(400).json({ error: 'Transaction verification failed', data });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
const { default: axios } = require("axios");

const initializePayment = async (email, amount) => {
    try {
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount,
          callback_url: `${window.location.origin}/success`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRETE_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { authorization_url } = response.data.data;
      window.location.href = authorization_url; // Redirect to Paystack payment page
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };
  export default initializePayment;
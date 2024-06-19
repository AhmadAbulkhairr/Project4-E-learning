import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ courses }) => {
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [error, setError] = useState("")
  const stripe = useStripe();
  const elements = useElements();

  console.log(stripe,elements);
  useEffect(() => {
    if (courses && courses.length > 0) {
      const amount = courses.reduce((acc, course) => acc + (course.price || 0), 0);
      setTotalAmount(amount);
    }
  }, [courses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/create-payment-intent', {
        amount: totalAmount,
        currency: 'usd', 
        credentials,
      });

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: credentials.name,
            email: credentials.email,
            phone: credentials.phone,
            address: {
              line1: credentials.address,
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message)
        console.error('Payment failed:', result.error.message);
      } else {
        console.log('Payment succeeded:', result.paymentIntent);
      }
    } catch (error) {
      setError(error)

      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
           {error && <p color="error">{error}</p>}

      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={credentials.phone}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={credentials.address}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      {courses && courses.length > 0 && (
        <div>
          <h3>Total Amount: ${Number(totalAmount).toFixed(2)}</h3>
        </div>
      )}
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;

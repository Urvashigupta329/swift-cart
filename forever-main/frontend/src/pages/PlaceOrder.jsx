import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('checkout_delivery_info');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      phone: ''
    };
  });

  // Save entered delivery info to sessionStorage as the user types
  useEffect(() => {
    try {
      sessionStorage.setItem('checkout_delivery_info', JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // 1. Client-side authentication check: Prevent raw backend unauthorized error
    if (!token) {
      toast.info('Please sign in or create an account to complete your order.');
      navigate('/login', { state: { from: '/place-order' } });
      return;
    }

    try {
      setSubmitting(true);
      const orderItems = [];

      Object.keys(cartItems).forEach((itemId) => {
        Object.keys(cartItems[itemId]).forEach((size) => {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === itemId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        });
      });

      // 2. Empty cart check
      if (orderItems.length === 0) {
        toast.error('Your cart is empty. Please add items before placing an order.');
        navigate('/collection');
        return;
      }

      const totalAmount = getCartAmount() + delivery_fee;
      const paymentMethodName = method === 'cod' ? 'COD' : method === 'stripe' ? 'Stripe' : 'Razorpay';

      const orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount,
        paymentMethod: paymentMethodName
      };

      let response;
      const headers = { token };

      switch (method) {
        case 'cod':
          response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers });
          break;
        case 'stripe':
          try {
            response = await axios.post(`${backendUrl}/api/order/stripe`, orderData, { headers });
          } catch {
            response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers });
          }
          break;
        case 'razorpay':
          try {
            response = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers });
          } catch {
            response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers });
          }
          break;
        default:
          response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers });
          break;
      }

      if (response && response.data && response.data.success) {
        sessionStorage.removeItem('checkout_delivery_info');
        setCartItems({});
        toast.success(response.data.message || 'Order placed successfully!');
        navigate('/orders');
      } else {
        const errorMsg = response?.data?.message || 'Could not place order';
        if (errorMsg.includes('Not Authorized') || errorMsg.includes('signature') || errorMsg.includes('expired')) {
          toast.error('Session expired. Please sign in again.');
          navigate('/login', { state: { from: '/place-order' } });
        } else {
          toast.error(errorMsg);
        }
      }
    } catch (error) {
      console.error('Order placement error:', error);
      const msg = error.response?.data?.message || error.message || 'Failed to place order';
      if (msg.includes('Not Authorized') || msg.includes('signature') || msg.includes('expired')) {
        toast.error('Session expired. Please sign in again.');
        navigate('/login', { state: { from: '/place-order' } });
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row justify-between gap-8 pt-5 sm:pt-12 min-h-[80vh] border-t border-gray-200">
      {/* Left Side: Delivery Information */}
      <div className="flex flex-col gap-4 w-full lg:max-w-[500px]">
        <div className="text-xl sm:text-2xl my-2">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        {/* Authentication notice if user is checking out without token */}
        {!token && (
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-amber-900 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex-shrink-0 font-bold text-xs">
                i
              </span>
              <span>Signing in is required to complete your order.</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/login', { state: { from: '/place-order' } })}
              className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0"
            >
              Sign In
            </button>
          </div>
        )}

        <div className="flex gap-3">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-700 mb-1">First name</label>
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded-lg py-2 px-3.5 w-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              type="text"
              placeholder="First name"
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-700 mb-1">Last name</label>
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded-lg py-2 px-3.5 w-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              type="text"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email address</label>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded-lg py-2 px-3.5 w-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
            type="email"
            placeholder="Email address"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Street address</label>
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded-lg py-2 px-3.5 w-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
            type="text"
            placeholder="Street address or locality"
          />
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded-lg py-2 px-3.5 w-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              type="text"
              placeholder="City"
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded-lg py-2 px-3.5 w-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              type="text"
              placeholder="State"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-700 mb-1">Zipcode</label>
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded-lg py-2 px-3.5 w-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              type="text"
              placeholder="Zipcode / PIN code"
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded-lg py-2 px-3.5 w-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              type="text"
              placeholder="Country"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone number</label>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded-lg py-2 px-3.5 w-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
            type="tel"
            placeholder="Phone number"
          />
        </div>
      </div>

      {/* Right Side: Cart Summary & Payment Method */}
      <div className="flex-1 lg:max-w-[460px] flex flex-col gap-8">
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <CartTotal />
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <p className="text-xs text-gray-500 mb-4">Select your preferred payment option:</p>

          <div className="flex flex-col gap-3">
            {/* Stripe option */}
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                method === 'stripe'
                  ? 'border-black ring-1 ring-black bg-gray-50/70 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    method === 'stripe' ? 'border-black bg-black' : 'border-gray-300'
                  }`}
                >
                  {method === 'stripe' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span className="text-sm font-medium text-gray-800">Credit / Debit Card</span>
              </div>
              <img className="h-5 object-contain" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Razorpay option */}
            <div
              onClick={() => setMethod('razorpay')}
              className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                method === 'razorpay'
                  ? 'border-black ring-1 ring-black bg-gray-50/70 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    method === 'razorpay' ? 'border-black bg-black' : 'border-gray-300'
                  }`}
                >
                  {method === 'razorpay' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span className="text-sm font-medium text-gray-800">UPI / NetBanking / Cards</span>
              </div>
              <img className="h-5 object-contain" src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            {/* Cash on Delivery option */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                method === 'cod'
                  ? 'border-black ring-1 ring-black bg-gray-50/70 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    method === 'cod' ? 'border-black bg-black' : 'border-gray-300'
                  }`}
                >
                  {method === 'cod' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span className="text-sm font-medium text-gray-800">Cash on Delivery</span>
              </div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
                COD
              </span>
            </div>
          </div>

          <div className="w-full mt-6">
            <button
              id="place-order-submit-button"
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white text-sm font-medium tracking-wide py-3.5 rounded-xl hover:bg-gray-800 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>PLACING ORDER...</span>
                </>
              ) : (
                <span>PLACE ORDER</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

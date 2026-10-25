import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState]= useState('Sign Up');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const location = useLocation();
  const from = location.state?.from || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try{
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Account created successfully!');
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Logged in successfully!');
        }
        else{
          toast.error(response.data.message)
        }
      }
    }
    catch (error){
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(token){
      navigate(from, { replace: true });
    }
  }, [token])
  return (
    <div className='flex items-center justify-center py-12 px-4'>
      <div className='w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl shadow-gray-200/50'>
        {/* Toggle tabs */}
        <div className="flex bg-gray-100/80 p-1 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => setCurrentState('Login')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              currentState === 'Login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setCurrentState('Sign Up')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              currentState === 'Sign Up' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>
            {currentState === 'Login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className='text-xs text-gray-500 mt-1'>
            {currentState === 'Login' ? 'Sign in to access your orders and saved items' : 'Join Swift Cart for exclusive offers and faster checkout'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          {currentState === 'Sign Up' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
              <input 
                onChange={(e)=>setName(e.target.value)} 
                value={name} 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black focus:bg-white transition-all" 
                placeholder="John Doe" 
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
            <input 
              onChange={(e)=>setEmail(e.target.value)} 
              value={email} 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black focus:bg-white transition-all" 
              placeholder="you@example.com" 
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</label>
              {currentState === 'Login' && (
                <span className="text-xs text-gray-400 hover:text-black cursor-pointer transition-colors">Forgot password?</span>
              )}
            </div>
            <input 
              onChange={(e)=>setPassword(e.target.value)} 
              value={password} 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black focus:bg-white transition-all" 
              placeholder="••••••••" 
              required
            />
          </div>

          <button 
            disabled={loading} 
            className="w-full mt-4 bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase py-3.5 rounded-full hover:bg-gray-800 active:scale-95 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            <span>{loading ? 'Processing...' : (currentState === 'Login' ? 'Sign In' : 'Create Account')}</span>
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          {currentState === 'Login' ? (
            <>Don't have an account? <span onClick={() => setCurrentState('Sign Up')} className="font-semibold text-black cursor-pointer hover:underline ml-1">Create one</span></>
          ) : (
            <>Already have an account? <span onClick={() => setCurrentState('Login')} className="font-semibold text-black cursor-pointer hover:underline ml-1">Sign in</span></>
          )}
        </p>
      </div>
    </div>
  )
}

export default Login;

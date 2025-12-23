import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {/* Login Tab */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-2 rounded font-medium">
            LOGIN
          </button>
        </div>

        {/* Sign in with social media */}
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-4">Sign in with:</p>
          <div className="flex justify-center space-x-4">
            {/* Facebook */}
            <button className="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700">
              <span className="text-lg font-bold">f</span>
            </button>
            
            {/* Google */}
            <button className="w-10 h-10 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600">
              <span className="text-lg font-bold">G</span>
            </button>
            
            {/* Twitter */}
            <button className="w-10 h-10 bg-blue-400 text-white rounded flex items-center justify-center hover:bg-blue-500">
              <span className="text-lg font-bold">t</span>
            </button>
            
            {/* Other platform */}
            <button className="w-10 h-10 bg-orange-500 text-white rounded flex items-center justify-center hover:bg-orange-600">
              <span className="text-lg font-bold">O</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="text-center">
          <span className="text-gray-500 text-sm">or:</span>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or username"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default App

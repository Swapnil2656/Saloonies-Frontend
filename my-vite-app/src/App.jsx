import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-md space-y-8">
        {/* Header tab */}
        <div className="flex justify-center">
          <button className="bg-blue-600 text-white px-10 py-2 rounded shadow font-semibold">
            LOGIN
          </button>
        </div>

        {/* Social sign in */}
        <div className="text-center space-y-3">
          <p className="text-gray-700 text-sm">Sign in with:</p>
          <div className="flex justify-center gap-3">
            <button className="w-10 h-10 rounded bg-blue-600 text-white font-bold">f</button>
            <button className="w-10 h-10 rounded bg-red-500 text-white font-bold">G</button>
            <button className="w-10 h-10 rounded bg-blue-400 text-white font-bold">t</button>
            <button className="w-10 h-10 rounded bg-orange-500 text-white font-bold">O</button>
          </div>
          <p className="text-gray-600 text-sm">or:</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or username"
              className="w-full border border-gray-300 rounded px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default App

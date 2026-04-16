import React from 'react'
import { Sparkle, SparkleIcon, Sparkles, Stars } from 'lucide-react'
import { Link } from 'react-router-dom'

const HeaderGuest = ({ setLogin, setSignup }) => {
  return (
    <div className='flex items-center gap-9 text-[20px]'>
        <div className="flex items-center gap-2 text-text hover:text-primary cursor-pointer">
            <Sparkles />
            <Link to="/courses">Browse Courses</Link>
        </div>
        <div className="gap-10.75">
            <button onClick={() => setLogin(true)} className="px-3.5 py-2 border-2 border-[#958FEF] rounded-lg text-[#4F46E5] cursor-pointer">
                Log In
            </button>
            <button onClick={() => setSignup(true)} className="px-3.5 py-2 border-2 border-[#4F46E5] rounded-lg bg-[#4F46E5] ml-4 text-white cursor-pointer">
                Sign Up
            </button>
        </div>
    </div>
  )
}

export default HeaderGuest
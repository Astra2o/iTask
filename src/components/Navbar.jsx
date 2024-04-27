import React from 'react'

function Navbar() {
  return (
    <nav className='flex  justify-between bg-slate-700 text-white py-2'>
        <div className="logo mx-10">
            <span className="font-bold text-xl mx">iTask</span>
        </div>
<ul className="flex gap-8 mx-10">
    <li className='cursor-pointer hover:font-bold transition-all duration-50'>HOME</li>
    <li className='cursor-pointer hover:font-bold transition-all duration-50'>YOUR TASKS</li>
    <li className='cursor-pointer hover:font-bold transition-all duration-50'>TOOLS</li>
    </ul>   
     </nav>
  )
}

export default Navbar
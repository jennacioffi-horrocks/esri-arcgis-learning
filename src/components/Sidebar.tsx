import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='overflow-x-hidden'>
        <button
          onClick={toggleSidebar}
          className={`
            ${isOpen ? 'right-[250px] top-[0px]' : 'right-[0px] top-[0px]'} 
            transition-right 
            duration-300 
            font-sans 
            text-white 
            bg-blue-500 
            hover:bg-blue-700
            py-2 
            px-4
            rounded 
            absolute 
            w-fit
            h-screen`}
        >
          {isOpen ? '>' : '<'}
        </button>
      </div>
      <div className={`
        ${isOpen ? 'right-0' : '-right-[250px]'} 
        fixed 
        transition-right 
        duration-300 
        w-[250px] 
        h-screen 
        bg-stone-400`}>
        Hello World
      </div>
    </>
  );
};

export default Sidebar;
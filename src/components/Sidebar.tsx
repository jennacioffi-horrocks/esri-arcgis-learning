import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarWidth = 350; // Define your sidebar width

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`
          absolute 
          ${isOpen ? `right-[${sidebarWidth}px]` : 'right-0'} 
          top-0 
          transition-all 
          duration-300 
          font-sans 
          text-white 
          bg-blue-500 
          hover:bg-blue-700
          py-2 
          px-4
          rounded 
          w-fit
          h-screen`}
        style={{
          right: isOpen ? `${sidebarWidth}px` : '0', // Apply dynamic positioning
        }}
      >
        {isOpen ? '>' : '<'}
      </button>
      <div
        className={`
          fixed 
          transition-all 
          duration-300 
          h-screen 
          bg-stone-400`}
        style={{
          width: `${sidebarWidth}px`, // Apply width dynamically
          right: isOpen ? '0' : `-${sidebarWidth}px`, // Apply dynamic positioning
        }}
      >
        Hello World
      </div>
    </>
  );
};

export default Sidebar;

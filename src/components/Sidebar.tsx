import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface SidebarProps {
  columns: TableProps<any>['columns'];
  dataSource: any[];
}

const Sidebar: React.FC<SidebarProps> = ({ columns, dataSource }) => {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarWidth = 500; // Define your sidebar width

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
          h-full 
          bg-stone-400
          h-screen
          align-center
          items-center`}
        style={{
          width: `${sidebarWidth}px`, // Apply width dynamically
          right: isOpen ? '0' : `-${sidebarWidth}px`, // Apply dynamic positioning
        }}
      >
        <Table 
          columns={columns} 
          dataSource={dataSource}
          pagination={false} // Disable pagination
          // pagination={{
          //   pageSize: 14, // Number of rows per page
          //   current: 1,   // Current page number
          //   total: dataSource.length, // Total number of rows
          //   showSizeChanger: true, // Allow user to change page size
          //   pageSizeOptions: ['10', '20', '50'], // Page size options
          // }}
          scroll={{ y: 'calc(100vh)' }} // Scrollable table
          bordered
        />
      </div>
    </>
  );
};

export default Sidebar;

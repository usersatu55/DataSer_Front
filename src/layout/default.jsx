import React from 'react';
import { useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar'; 

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  
  // ตรวจสอบว่าเป็นหน้า Login หรือไม่
  const isLoginPage = location.pathname === '/';

  return (
    <div>
      {!isLoginPage && <Navbar />} {/* แสดง Navbar เฉพาะเมื่อไม่ใช่หน้า Login */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;

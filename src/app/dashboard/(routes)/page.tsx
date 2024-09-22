'use client';

import Card from '../_components/card';
import styles from './Page.module.css';

export default function Home() {

  const handleLineManagerClick = () => {
    window.open('https://manager.line.biz/account/@575xzopq');
  };

  const handleLineDeveloperClick = () => {
    window.open('https://developers.line.biz/console/channel/2005256427');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10 relative">

    <div className={styles.gridBackground}></div>
    <div className={styles.fadeEffect}></div>
  
    <div className="relative z-10 w-full max-w-4xl text-black text-center">
      <h1 className="text-6xl font-extrabold mb-4">IT ADMIN MANAGEMENT</h1>
      <p className="text-lg mb-6">
        แดชบอร์ดนี้ช่วยให้คุณจัดการและแก้ไขข้อมูลสื่อสารกับนักเรียนผ่านบัญชีทางการของ LINE
      </p>
    </div>
  
    <div className="relative z-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card
        title="LINE Manager (OA)"
        description="จัดการบัญทางการ Line Official Account"
        onClick={handleLineManagerClick}
        theme="manager"
      />
      <Card
        title="LINE Developer"
        description="จัดการการพัฒา Line Messaging API"
        onClick={handleLineDeveloperClick}
        theme="developer"
      />
    </div>
  </div>
  
  );
}
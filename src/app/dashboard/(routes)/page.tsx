'use client';

import Card from '../_components/card';

export default function Home() {
  const handleLineManagerClick = () => {
    window.open('https://manager.line.biz/account/@575xzopq');
  };

  const handleLineDeveloperClick = () => {
    window.open('https://developers.line.biz/console/channel/2005256427');
  };
 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 md:px-10 py-10 relative">
      
      <div
        className="absolute inset-0 h-full w-full bg-transparent pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 59, 59, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div
        className="absolute inset-0 h-full w-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 30%, transparent 85%)',
        }}
      ></div>
 
      <div className="relative z-10 w-full max-w-4xl text-black text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          IT ADMIN MANAGEMENT
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6">
          แดชบอร์ดนี้ช่วยให้คุณจัดการและแก้ไขข้อมูลสื่อสารกับนักเรียนผ่านบัญชีทางการของ LINE
        </p>
      </div>

      <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
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

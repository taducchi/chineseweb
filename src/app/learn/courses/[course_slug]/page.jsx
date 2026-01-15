// app/page.js
'use client';


export default function HomePage({ toggleSidebar }) {
  return (
   
      <div className="space-y-8">
      
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Other Content</h2>
          <p>This content will also receive toggleSidebar prop</p>
          
        </div>
      </div>
  
  );
}
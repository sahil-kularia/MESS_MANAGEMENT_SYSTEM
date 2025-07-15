// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// export default function Landing() {
//   const [loginOpen, setLoginOpen] = useState(false);
//   const navigate = useNavigate();
//   function navi1(){
//     console.log('move to invetory page')
//     navigate('/mess')
//   }
//   function navi2(){
//     console.log('move to mess page')
//     navigate('/menu')
//   }
//   function navi3(){
//     console.log('move to ngo page')
//     navigate('/ngo')
//   }
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100">
//       {/* Navbar */}
//       <nav className="bg-yellow-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
//         <div className="text-2xl font-bold tracking-wide">HostelFoodManage</div>

//         <div className="relative">
//           <button
//             onClick={() => setLoginOpen((prev) => !prev)}
//             className="bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded font-semibold"
//           >
//             Login ▼
//           </button>

//           {loginOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white text-yellow-900 rounded shadow-lg z-10">
//               <ul>
//                 <li>
//                   <a
//                     href="/login/student"
//                     className="block px-4 py-2 hover:bg-yellow-200"
//                     onClick={() => setLoginOpen(false)}
//                   >
//                     Student
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/login/ngo"
//                     className="block px-4 py-2 hover:bg-yellow-200"
//                     onClick={() => setLoginOpen(false)}
//                   >
//                     NGO
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/login/messcommittee"
//                     className="block px-4 py-2 hover:bg-yellow-200"
//                     onClick={() => setLoginOpen(false)}
//                   >
//                     Mess Committee
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Main Title */}
//       <header className="flex-grow flex flex-col justify-center items-center px-6 text-center py-20">
//         <h1 className="text-5xl font-extrabold text-yellow-900 mb-12 drop-shadow-lg">
//           MANAGE FOOD IN HOSTEL
//         </h1>

//         {/* Three Feature Boxes */}
//         <div className="flex flex-col md:flex-row gap-10 max-w-5xl w-full">
//           <div className="flex-1 bg-yellow-400 text-yellow-900 rounded-lg shadow-lg p-10 flex flex-col items-center justify-center hover:scale-105 transform transition cursor-pointer">
//             <h2 className="text-3xl font-bold mb-4">Inventory</h2>
//             <p className="text-center font-medium">
//                 <button onClick={navi1}>

//               Manage food stock and supplies efficiently to reduce waste.
//                 </button>
//             </p>
//           </div>

//           <div className="flex-1 bg-yellow-600 text-white rounded-lg shadow-lg p-10 flex flex-col items-center justify-center hover:scale-105 transform transition cursor-pointer">
//             <h2 className="text-3xl font-bold mb-4">Mess Detail</h2>
//             <p className="text-center font-medium">
//                 <button onClick={navi2}>

//               Keep track of daily menus, food usage, and wastage details.
//                 </button>
//             </p>
//           </div>

//           <div className="flex-1 bg-yellow-300 text-yellow-900 rounded-lg shadow-lg p-10 flex flex-col items-center justify-center hover:scale-105 transform transition cursor-pointer">
//             <h2 className="text-3xl font-bold mb-4">NGO Register</h2>
//             <p className="text-center font-medium">
//                 <button onClick={navi3}>

//               Connect with NGOs to donate leftover food and reduce hunger.
//                 </button>
//             </p>
//           </div>
//         </div>
//       </header>

//       {/* Impact Section */}
//       <section className="bg-yellow-100 text-yellow-900 py-16 px-6">
//         <h2 className="text-4xl font-bold mb-8 text-center drop-shadow-md">
//           Our Impact on Society
//         </h2>
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//           <div className="bg-yellow-400 rounded-lg p-8 shadow-md hover:shadow-lg transition">
//             <div className="text-5xl font-extrabold mb-3">1500+</div>
//             <div className="font-semibold text-lg">Meals Saved</div>
//           </div>
//           <div className="bg-yellow-500 text-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
//             <div className="text-5xl font-extrabold mb-3">50+</div>
//             <div className="font-semibold text-lg">NGOs Connected</div>
//           </div>
//           <div className="bg-yellow-300 rounded-lg p-8 shadow-md hover:shadow-lg transition">
//             <div className="text-5xl font-extrabold mb-3">1000+</div>
//             <div className="font-semibold text-lg">Kg Food Donated</div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-yellow-700 text-yellow-100 py-6 text-center mt-auto shadow-inner">
//         <p>
//           &copy; {new Date().getFullYear()} HostelFoodManage. All rights reserved.
//         </p>
//         <p className="mt-2 text-sm">
//           Made with ❤️ to reduce food wastage and fight hunger.
//         </p>
//       </footer>
//     </div>
//   );
// }










import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  function navi1() {
    navigate('/mess');
  }

  function navi2() {
    navigate('/menu');
  }

  function navi3() {
    navigate('/ngo');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100">
      {/* Navbar */}
      <nav className="bg-yellow-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold tracking-wide">HostelFoodManage</div>

        <div className="relative">
          <button
            onClick={() => setLoginOpen((prev) => !prev)}
            className="bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded font-semibold"
          >
            Login ▼
          </button>

          {loginOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-yellow-900 rounded shadow-lg z-10">
              <ul>
                <li>
                  <a
                    href="/student"
                    className="block px-4 py-2 hover:bg-yellow-200"
                    onClick={() => setLoginOpen(false)}
                  >
                    Student
                  </a>
                </li>
                <li>
                  <a
                    href="/ngo"
                    className="block px-4 py-2 hover:bg-yellow-200"
                    onClick={() => setLoginOpen(false)}
                  >
                    NGO
                  </a>
                </li>
                <li>
                  <a
                    href="/mess"
                    className="block px-4 py-2 hover:bg-yellow-200"
                    onClick={() => setLoginOpen(false)}
                  >
                    Mess Committee
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Header + Impact Section With Shared Background */}
      <div className="relative z-0 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.itl.cat/pngfile/big/285-2853453_fast-food-cartoon-wallpaper-free-fast-food-pattern.jpg')",
            filter: 'brightness(0.75) blur(1.5px)',
            zIndex: 0,
          }}
        />

        {/* White Overlay for Readability */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" />

        {/* Main Content Over Background */}
        <div className="relative z-20">
          {/* Main Title Section */}
          <header className="px-6 text-center py-20 flex flex-col justify-center items-center">
            <h1 className="text-5xl font-extrabold text-yellow-900 mb-12 drop-shadow-lg">
              MANAGE FOOD IN HOSTEL
            </h1>

            {/* Three Feature Boxes */}
            <div className="flex flex-col md:flex-row gap-10 max-w-5xl w-full">
              <div className="flex-1 bg-yellow-400 text-yellow-900 rounded-lg shadow-lg p-10 flex flex-col items-center justify-center hover:scale-105 transform transition cursor-pointer">
                <h2 className="text-3xl font-bold mb-4">Inventory</h2>
                <p className="text-center font-medium">
                  <button onClick={navi1}>
                    Manage food stock and supplies efficiently to reduce waste.
                  </button>
                </p>
              </div>

              <div className="flex-1 bg-yellow-600 text-white rounded-lg shadow-lg p-10 flex flex-col items-center justify-center hover:scale-105 transform transition cursor-pointer">
                <h2 className="text-3xl font-bold mb-4">Mess Detail</h2>
                <p className="text-center font-medium">
                  <button onClick={navi2}>
                    Keep track of daily menus, food usage, and wastage details.
                  </button>
                </p>
              </div>

              <div className="flex-1 bg-yellow-300 text-yellow-900 rounded-lg shadow-lg p-10 flex flex-col items-center justify-center hover:scale-105 transform transition cursor-pointer">
                <h2 className="text-3xl font-bold mb-4">NGO Register</h2>
                <p className="text-center font-medium">
                  <button onClick={navi3}>
                    Connect with NGOs to donate leftover food and reduce hunger.
                  </button>
                </p>
              </div>
            </div>
          </header>

          {/* Impact Section */}
          <section className="text-yellow-900 py-16 px-6">
            <h2 className="text-4xl font-bold mb-8 text-center drop-shadow-md">
              Our Impact on Society
            </h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="bg-yellow-400 rounded-lg p-8 shadow-md hover:shadow-lg transition">
                <div className="text-5xl font-extrabold mb-3">700+</div>
                <div className="font-semibold text-lg">Meals Saved</div>
              </div>
              <div className="bg-yellow-500 text-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
                <div className="text-5xl font-extrabold mb-3">10+</div>
                <div className="font-semibold text-lg">NGOs Connected</div>
              </div>
              <div className="bg-yellow-300 rounded-lg p-8 shadow-md hover:shadow-lg transition">
                <div className="text-5xl font-extrabold mb-3">100+</div>
                <div className="font-semibold text-lg">Kg Food Donated</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-yellow-700 text-yellow-100 py-6 text-center mt-auto shadow-inner">
        <p>&copy; {new Date().getFullYear()} HostelFoodManage. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Made with ❤️ to reduce food wastage and fight hunger.
        </p>
      </footer>
    </div>
  );
}

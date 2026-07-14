// 'use client';

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Menu, X, LogOut, ShoppingCart, Package, PlusCircle, Settings, Home, Info, Loader2 } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "react-toastify";
// import EMLogo from "../../../../../public/ElectroMart.png";
// import Image from "next/image";
// import { BiSupport } from "react-icons/bi";

// interface NavLink {
//   name: string;
//   href: string;
//   icon: React.ComponentType<{ className?: string }>;
// }

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [profileOpen, setProfileOpen] = useState<boolean>(false);
//   const router = useRouter();
  
//   const desktopProfileRef = useRef<HTMLDivElement>(null);
//   const mobileMenuRef = useRef<HTMLDivElement>(null);

//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;
//   const isLoading = isPending;
//   const pathname = usePathname();

//   const isLoggedIn = !!user;
  
//   const userWithRole = user as Record<string, unknown> & { role?: string };
//   const sessionWithRole = session as Record<string, unknown> & { role?: string };
  
//   const userRole = userWithRole?.role || sessionWithRole?.role;
//   const isAdmin = userRole?.toLowerCase() === 'admin' || user?.email === 'admin123@gmail.com';

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Node;
      
//       if (desktopProfileRef.current && !desktopProfileRef.current.contains(target)) {
//         setProfileOpen(false);
//       }
      
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     await authClient.signOut();
//     toast.warning("Logged out successfully!", { autoClose: 2000 });
//     setProfileOpen(false);
//     setIsOpen(false);
//     router.push("/login");
//   };

//   const isActive = (path: string) => pathname === path;

//   const publicLinks: NavLink[] = [
//     { name: "Home", href: "/", icon: Home },
//     { name: "All Items", href: "/all-items", icon: Package },
//     { name: "My Collection", href: "/my-collection", icon: ShoppingCart },
//     { name: "About Us", href: "/about", icon: Info },
//     { name: "Support", href: "/support", icon: BiSupport },
//   ];

//   const privateLinks: NavLink[] = [
//     { name: "Home", href: "/", icon: Home },
//     { name: "All Items", href: "/all-items", icon: Package },
//     { name: "Add Item", href: "/add-item", icon: PlusCircle },
//     { name: "My Collection", href: "/my-collection", icon: ShoppingCart },
//     { name: "Order Manage", href: "/order-manage", icon: Settings },
//     { name: "About Us", href: "/about", icon: Info },
//     { name: "Support", href: "/support", icon: BiSupport },
//   ];

//   const currentLinks = (isLoggedIn && isAdmin) ? privateLinks : publicLinks;

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 h-17 w-full bg-slate-900 border-b border-slate-800 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl tracking-wider">
//               <Image src={EMLogo} alt="ElectroMart Logo" className="h-9 w-9 rounded-full" />
//               <span>
//                 Electro<span className="text-indigo-500">Mart</span>
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-1">
//             {currentLinks.map((link) => {
//               const Icon = link.icon;
//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
//                     isActive(link.href)
//                       ? "bg-indigo-600 text-white"
//                       : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                   }`}
//                 >
//                   <div className="flex items-center space-x-1">
//                     <Icon className="w-4 h-4" />
//                     <span>{link.name}</span>
//                   </div>
//                 </Link>
//               );
//             })}

//             {/* Auth Section - Desktop */}
//             <div className="ml-4 pl-4 border-l border-slate-800 flex items-center gap-4">
//               {isLoading ? (
//                 <Loader2 className="animate-spin text-indigo-500 w-5 h-5" />
//               ) : isLoggedIn ? (
//                 <div className="relative" ref={desktopProfileRef}>
//                   <button onClick={() => setProfileOpen(!profileOpen)} className="block focus:outline-none pt-1">
//                     {user?.image ? (
//                       <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 cursor-pointer ring-indigo-500/20" />
//                     ) : (
//                       <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white ring-2 ring-indigo-500/20">
//                         {user?.name?.[0]?.toUpperCase()}
//                       </div>
//                     )}
//                   </button>

//                   {profileOpen && (
//                     <div className="absolute right-0 mt-3 w-56 p-2 rounded-2xl border border-slate-700 bg-slate-900 shadow-xl z-50 origin-top-right">
//                       <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-800 mb-1.5">
//                         {user?.image ? (
//                           <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20" />
//                         ) : (
//                           <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
//                             {user?.name?.[0]?.toUpperCase()}
//                           </div>
//                         )}
//                         <div className="flex flex-col min-w-0">
//                           <p className="text-xs font-bold text-slate-200 truncate">{user?.name}</p>
//                           <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
//                         </div>
//                       </div>

//                       <hr className="border-slate-800 my-1 mx-2" />

//                       <ul className="flex flex-col gap-1">
//                         <li>
//                           <button
//                             onClick={handleLogout}
//                             className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-400 hover:text-red-500 rounded-xl hover:bg-red-950/20 transition-all cursor-pointer text-left"
//                           >
//                             <LogOut className="w-4 h-4" />
//                             Logout
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <Link href="/login" className="text-slate-300 font-medium text-sm hover:text-indigo-400 transition">
//                     Login
//                   </Link>
//                   <Link
//                     href="/register"
//                     className="bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Mobile Hamburger Button */}
//           <div className="md:hidden flex items-center" ref={mobileMenuRef}>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsOpen(!isOpen);
//               }}
//               className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl z-50 absolute top-16 right-3 w-52 origin-top-right">
//           {isLoggedIn && (
//             <>
//               <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-800 mb-2">
//                 {user?.image ? (
//                   <img src={user.image} alt={user.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20" />
//                 ) : (
//                   <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
//                     {user?.name?.[0]?.toUpperCase()}
//                   </div>
//                 )}
//                 <div className="flex flex-col min-w-0">
//                   <p className="text-sm font-bold text-slate-200 truncate">{user?.name}</p>
//                   <p className="text-xs text-slate-400 truncate">{user?.email}</p>
//                 </div>
//               </div>
//               <hr className="border-slate-800 my-1 mx-2" />
//             </>
//           )}

//           <ul className="flex flex-col gap-1">
//             {currentLinks.map((link) => {
//               const Icon = link.icon;
//               return (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     onClick={() => setIsOpen(false)}
//                     className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                       isActive(link.href)
//                         ? "bg-indigo-600 text-white"
//                         : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <Icon className="w-5 h-5" />
//                       <span>{link.name}</span>
//                     </div>
//                   </Link>
//                 </li>
//               );
//             })}

//             <hr className="border-slate-800 my-1.5 mx-2" />

//             {isLoading ? (
//               <div className="flex justify-center py-2">
//                 <Loader2 className="animate-spin text-indigo-500 w-5 h-5" />
//               </div>
//             ) : isLoggedIn ? (
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-400 hover:text-red-500 rounded-xl hover:bg-red-950/20 transition-all cursor-pointer flex items-center gap-2"
//                 >
//                   <LogOut className="w-5 h-5" />
//                   Logout
//                 </button>
//               </li>
//             ) : (
//               <div className="grid grid-cols-1 gap-2 p-1">
//                 <Link
//                   href="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="block text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 text-center font-bold text-xs rounded-xl py-2 transition-all border border-slate-700"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/register"
//                   onClick={() => setIsOpen(false)}
//                   className="block bg-indigo-600 hover:bg-indigo-700 text-white text-center font-bold text-xs rounded-xl py-2 shadow-md shadow-indigo-950/40 transition-all cursor-pointer"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }


'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ShoppingCart, Package, PlusCircle, Settings, Home, Info, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import EMLogo from "../../../../../public/ElectroMart.png";
import Image from "next/image";
import { BiSupport } from "react-icons/bi";

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const router = useRouter();
  
  const desktopProfileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const isLoading = isPending;
  const pathname = usePathname();

  const isLoggedIn = !!user;
  
  const userWithRole = user as Record<string, unknown> & { role?: string };
  const sessionWithRole = session as Record<string, unknown> & { role?: string };
  
  const userRole = userWithRole?.role || sessionWithRole?.role;
  const isAdmin = userRole?.toLowerCase() === 'admin' || user?.email === 'admin123@gmail.com';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (desktopProfileRef.current && !desktopProfileRef.current.contains(target)) {
        setProfileOpen(false);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.warning("Logged out successfully!", { autoClose: 2000 });
    setProfileOpen(false);
    setIsOpen(false);
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  // লগইন ছাড়া এই লিংকগুলো দেখাবে (Support বাদ দেওয়া হয়েছে)
  const publicLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Items", href: "/all-items", icon: Package },
    { name: "My Collection", href: "/my-collection", icon: ShoppingCart },
    { name: "About Us", href: "/about", icon: Info },
  ];

  // লগইন থাকলে এই লিংকগুলো দেখাবে (এখানে Support থাকবে)
  const privateLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Items", href: "/all-items", icon: Package },
    ...(isAdmin ? [{ name: "Add Item", href: "/add-item", icon: PlusCircle }] : []),
    { name: "My Collection", href: "/my-collection", icon: ShoppingCart },
    ...(isAdmin ? [{ name: "Order Manage", href: "/order-manage", icon: Settings }] : []),
    { name: "About Us", href: "/about", icon: Info },
    { name: "Support", href: "/support", icon: BiSupport }, // শুধুমাত্র লগইন করা ইউজারদের জন্য
  ];

  const currentLinks = isLoggedIn ? privateLinks : publicLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-17 w-full bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl tracking-wider">
              <Image src={EMLogo} alt="ElectroMart Logo" className="h-9 w-9 rounded-full" />
              <span>
                Electro<span className="text-indigo-500">Mart</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              );
            })}

            {/* Auth Section - Desktop */}
            <div className="ml-4 pl-4 border-l border-slate-800 flex items-center gap-4">
              {isLoading ? (
                <Loader2 className="animate-spin text-indigo-500 w-5 h-5" />
              ) : isLoggedIn ? (
                <div className="relative" ref={desktopProfileRef}>
                  <button onClick={() => setProfileOpen(!profileOpen)} className="block focus:outline-none pt-1">
                    {user?.image ? (
                      <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 cursor-pointer ring-indigo-500/20" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white ring-2 ring-indigo-500/20">
                        {user?.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-56 p-2 rounded-2xl border border-slate-700 bg-slate-900 shadow-xl z-50 origin-top-right">
                      <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-800 mb-1.5">
                        {user?.image ? (
                          <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                            {user?.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <p className="text-xs font-bold text-slate-200 truncate">{user?.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                        </div>
                      </div>

                      <hr className="border-slate-800 my-1 mx-2" />

                      <ul className="flex flex-col gap-1">
                        <li>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-400 hover:text-red-500 rounded-xl hover:bg-red-950/20 transition-all cursor-pointer text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-slate-300 font-medium text-sm hover:text-indigo-400 transition">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center" ref={mobileMenuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl z-50 absolute top-16 right-3 w-52 origin-top-right">
          {isLoggedIn && (
            <>
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-800 mb-2">
                {user?.image ? (
                  <img src={user.image} alt={user.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-bold text-slate-200 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>
              </div>
              <hr className="border-slate-800 my-1 mx-2" />
            </>
          )}

          <ul className="flex flex-col gap-1">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? "bg-indigo-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </div>
                  </Link>
                </li>
              );
            })}

            <hr className="border-slate-800 my-1.5 mx-2" />

            {isLoading ? (
              <div className="flex justify-center py-2">
                <Loader2 className="animate-spin text-indigo-500 w-5 h-5" />
              </div>
            ) : isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-400 hover:text-red-500 rounded-xl hover:bg-red-950/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </li>
            ) : (
              <div className="grid grid-cols-1 gap-2 p-1">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 text-center font-bold text-xs rounded-xl py-2 transition-all border border-slate-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block bg-indigo-600 hover:bg-indigo-700 text-white text-center font-bold text-xs rounded-xl py-2 shadow-md shadow-indigo-950/40 transition-all cursor-pointer"
                >
                  Register
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
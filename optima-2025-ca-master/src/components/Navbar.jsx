import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo-optima.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  const closeNavbar = () => {
    setMobileDrawerOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 md:px-5">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          {/* <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Optima 2025</span>
          </div> */}
          <a href="/#" className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Optima 2025</span>
          </a>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                    href={item.href}
                    target={item.target} // Dynamically set target
                    rel={item.rel} // Dynamically set rel
                  >
                    {item.label}
                  </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              href="/register"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Register
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 mt-[13px] border-l border-b border-neutral-700/80 p-12 flex flex-col justify-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="pb-6">
                  <a
                    href={item.href}
                    target={item.target} // Dynamically set target
                    rel={item.rel} // Dynamically set rel
                    onClick={closeNavbar}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a
                href="/register"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
                onClick={closeNavbar}
              >
                Register
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

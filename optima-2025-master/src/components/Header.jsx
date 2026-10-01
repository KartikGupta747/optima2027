import { Link, useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import logo from "../assets/optima2025-logo.png";
import { navDropdown, navigation } from "../constants/Navlinks";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleClickdropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleClickAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="flex items-center gap-1 w-[15rem] xl:mr-8" to="/">
          <img src={logo} alt="Optima" className="w-[200px] md:w-[230px]" />
        </Link>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-start justify-center m-auto lg:flex-row lg:justify-end">
            <div className="relative group">
              <button
                onClick={() => {
                  setIsAboutDropdownOpen(!isAboutDropdownOpen);
                }}
                className={`flex relative font-code text-xl uppercase transition-colors px-3 xl:pl-4 py-4 lg:py-6 lg:-mr-0.25 lg:text-sm lg:font-semibold
									${
                    location.pathname === "/about" ||
                    location.pathname === "/team"
                      ? "text-color-1"
                      : "text-n-1/50"
                  }
									lg:leading-5 lg:hover:text-n-1`}
              >
                About{" "}
                <div
                  className={`${
                    isAboutDropdownOpen ? "" : "rotate-90"
                  } ml-1 transition transform-translate duration-200`}
                >
                  ▼
                </div>
              </button>
              {isAboutDropdownOpen && (
                <div className="relative lg:absolute lg:top-[69px] lg:left-[-40px] group-hover:block text-black bg-transparent lg:bg-black/80 rounded-b-xl w-48">
                  <Link
                    to="/about"
                    onClick={handleClickAboutDropdown}
                    className={`flex items-start gap-1 hover:text-color-1 mb-1 font-code uppercase text-lg transition-colors pl-3 lg:ml-3 py-2 md:py-4 lg:text-sm lg:font-semibold
											${location.pathname === "/about" ? "text-color-1" : "text-n-1/50"}
											lg:leading-5 lg:hover:text-n-1`}
                  >
                    <div className="">→</div>
                    Optima
                  </Link>
                  <Link
                    to="/team"
                    onClick={handleClickAboutDropdown}
                    className={`flex items-start gap-1 hover:text-color-1 mb-1 font-code uppercase text-lg transition-colors pl-3 lg:ml-3 py-2 md:py-4 lg:text-sm lg:font-semibold
											${location.pathname === "/team" ? "text-color-1" : "text-n-1/50"}
											lg:leading-5 lg:hover:text-n-1`}
                  >
                    <div className="">→</div>
                    Team
                  </Link>
                </div>
              )}
            </div>
            <div className="relative group">
              <button
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className={`flex relative font-code text-xl uppercase transition-colors px-3 xl:pl-4  py-4 lg:py-6 lg:-mr-0.25 lg:text-sm lg:font-semibold
									${
                    location.pathname === "/competitions" ||
                    location.pathname === "/workshops" ||
                    location.pathname === "/guest-lectures"
                      ? "text-color-1"
                      : "text-n-1/50"
                  }
									lg:leading-5 lg:hover:text-n-1 `}
              >
                Events{" "}
                <div
                  className={`${
                    isDropdownOpen ? "" : "rotate-90"
                  } ml-1 transition transform-translate duration-200`}
                >
                  ▼
                </div>
              </button>
              {isDropdownOpen && (
                <div className="relative lg:absolute lg:top-[69px] lg:left-[-40px] group-hover:block text-black bg-transparent lg:bg-black/80 rounded-b-xl w-48">
                  {navDropdown.map((item) => (
                    <Link
                      to={item.url}
                      onClick={handleClickdropdown}
                      className={`flex items-start gap-1 hover:text-color-1 mb-1 font-code uppercase text-lg transition-colors pl-3 lg:ml-3 py-2 md:py-4 lg:text-sm lg:font-semibold
												${location.pathname === item.url ? "text-color-1" : "text-n-1/50"}
												lg:leading-5 lg:hover:text-n-1`}
                    >
                      <div className="">→</div>
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navigation
              .filter((item) => item.url !== "/team")
              .map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  onClick={handleClick}
                  className={`block relative font-code text-xl uppercase transition-colors hover:text-color-1 ${
                    item.onlyMobile ? "lg:hidden" : ""
                  } px-3 xl:px-4 py-4 lg:py-6 lg:-mr-0.25 lg:text-sm lg:font-semibold ${
                    location.pathname === item.url
                      ? "text-color-1"
                      : "text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1`}
                >
                  {item.title}
                </Link>
              ))}
            {isAuthenticated ? (
              <div className="flex">
                <Link
                  to="/profile"
                  onClick={handleClick}
                  className={`block relative font-code text-xl uppercase transition-colors hover:text-color-1 px-3 xl:px-4 py-4 lg:py-6 lg:-mr-0.25 lg:text-sm lg:font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 lg:leading-5 lg:hover:text-n-1`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block relative font-code text-xl uppercase transition-colors text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 px-3 xl:px-4 py-4 lg:py-6 lg:-mr-0.25 lg:text-sm lg:font-semibold lg:leading-5 lg:hover:text-n-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/register"
                  onClick={handleClick}
                  className={`block relative font-code text-xl uppercase transition-colors hover:text-color-1 px-3 xl:px-4 py-4 lg:py-6 lg:-mr-0.25 lg:text-sm lg:font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 lg:leading-5 lg:hover:text-n-1`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <HamburgerMenu />
        </nav>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

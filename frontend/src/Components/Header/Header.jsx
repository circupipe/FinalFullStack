import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginForm } from "../LoginForm/LoginForm";
import { useUser } from "../../Providers/UserProvider";
import { Searcher } from "../Searcher/Searcher";
import { HiCpuChip } from "react-icons/hi2";
import { ImPower } from "react-icons/im";
import { BsDeviceSsdFill, BsFillMotherboardFill } from "react-icons/bs";
import { FaMemory, FaTools, FaFacebook, FaInstagram } from "react-icons/fa";
import { PiComputerTowerFill, PiGraphicsCardFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { RiUserFill, RiUserShared2Line } from "react-icons/ri";
import "./Header.css";

export function Header() {
  const [hamburger, setHamburger] = useState(false);
  const { user, logout } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const getPreferredTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const [darkMode, setDarkMode] = useState(getPreferredTheme());

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleProductSelect = (product) => {
    const productType = product.tipo_producto.toLowerCase();
    navigate(`/producto/${productType}`);
    setActiveButton(`/producto/${productType}`);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/producto/")) {
      const parts = currentPath.split("/");
      const productType = parts[parts.length - 1];
      setActiveButton(`/producto/${productType}`);
    } else {
      setActiveButton(currentPath);
    }
  }, [location.pathname]);

  return (
    <div className="header">
      <nav className="usernav ">
        <div className="padding-i-05r flex-center-between gap-05r">
          <a href="mailto:tucorreo@example.com">
            <MdEmail className="hover" />
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoLocation className="hover" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="hover" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover" />
          </a>
        </div>
        <div>
          {user ? (
            <div className="user">
              {user.username} <span> | </span>
              <Link
                className="weight500"
                onClick={() => {
                  logout();
                  setShowLogin(false);
                  navigate("/");
                  setActiveButton("");
                }}
              >
                Salir <RiUserShared2Line />
              </Link>
            </div>
          ) : (
            <div>
              <Link
                className="weight500"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Iniciar Sesion
                <RiUserFill />
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="mobileheader sticky column blur ">
        <nav className="searchnav ">
          <div className="divmobile">
            <Link to="/" className="textlogo">
              TechTrash
            </Link>
            <div
              className="mobilenav"
              onClick={() => {
                setHamburger(true);
              }}
            >
              <GiHamburgerMenu style={{ fontSize: "2rem" }} />
            </div>
          </div>

          <div className={hamburger ? "hambmenu" : "hambclose"}>
            <div className="black"></div>
            <div className="petit">
              <IoMdCloseCircle
                className="closemobile"
                onClick={() => {
                  setHamburger(false);
                }}
              />
              <Link
                className={`buttonnav ${
                  activeButton === "/armatupc" ? "active-button" : ""
                }`}
                to="/armatupc"
                onClick={() => {
                  setActiveButton("/armatupc");
                  setHamburger(false);
                }}
              >
                <p className="buttontext">Arma Tu Pc</p>
                <FaTools className="buttonicon" />
              </Link>
              <Link
                className={`buttonnav ${
                  activeButton === "/producto/cpu" ? "active-button" : ""
                }`}
                to="/producto/cpu"
                onClick={() => {
                  setActiveButton("/producto/cpu");
                  setHamburger(false);
                }}
              >
                <p className="buttontext">Cpu</p>
                <HiCpuChip className="buttonicon" />
              </Link>
              <Link
                className={`buttonnav ${
                  activeButton === "/producto/ram" ? "active-button" : ""
                }`}
                to="/producto/ram"
                onClick={() => {
                  setActiveButton("/producto/ram");
                  setHamburger(false);
                }}
              >
                <p className="buttontext">Memorias</p>
                <FaMemory className="buttonicon" />
              </Link>
              <Link
                className={`buttonnav ${
                  activeButton === "/producto/motherboard"
                    ? "active-button"
                    : ""
                }`}
                to="/producto/motherboard"
                onClick={() => {
                  setActiveButton("/producto/motherboard");
                  setHamburger(false);
                }}
              >
                <p className="buttontext">Motherboard</p>
                <BsFillMotherboardFill className="buttonicon" />
              </Link>
              <Link
                className={`buttonnav ${
                  activeButton === "/producto/case_pc" ? "active-button" : ""
                }`}
                to="/producto/case_pc"
                onClick={() => {
                  setActiveButton("/producto/case_pc");
                  setHamburger(false);
                }}
              >
                <p className="buttontext">Gabinete</p>
                <PiComputerTowerFill className="buttonicon" />
              </Link>
              <Link
                className={`buttonnav ${
                  activeButton === "/producto/power_supply"
                    ? "active-button"
                    : ""
                }`}
                to="/producto/power_supply"
                onClick={() => {
                  setActiveButton("/producto/power_supply");
                  setHamburger(false);
                }}
              >
                <p className="buttontext">Fuente</p>
                <ImPower className="buttonicon" />
              </Link>
              <Link
                className={`buttonnav ${
                  activeButton === "/producto/disk" ? "active-button" : ""
                }`}
                to="/producto/disk"
                onClick={() => {
                  setActiveButton("/producto/disk");
                  setHamburger(false);
                }}
              >
                <p className="buttontext">Discos</p>
                <BsDeviceSsdFill className="buttonicon" />
              </Link>
              <Link
                className={`buttonnav ${
                  activeButton === "/producto/graphics_card"
                    ? "active-button"
                    : ""
                }`}
                to="/producto/graphics_card"
                onClick={() => {
                  setActiveButton("/producto/graphics_card");
                  setHamburger(false);
                }}
              >
                <p className="buttontext">Graficas</p>
                <PiGraphicsCardFill className="buttonicon" />
              </Link>
            </div>
          </div>

          <div className="search-container">
            <Searcher
              className="searcher"
              onProductSelect={handleProductSelect}
            />
            <div className="theme-switch-container">
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={toggleDarkMode}
                  checked={!darkMode}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </nav>
        <nav className="buttonsnav">
          <Link
            className={`buttonnav ${
              activeButton === "/armatupc" ? "active-button" : ""
            }`}
            to="/armatupc"
            onClick={() => setActiveButton("/armatupc")}
          >
            <FaTools className="buttonicon" />
            <p className="buttontext">Arma Tu Pc</p>
          </Link>
          <Link
            className={`buttonnav ${
              activeButton === "/producto/cpu" ? "active-button" : ""
            }`}
            to="/producto/cpu"
            onClick={() => setActiveButton("/producto/cpu")}
          >
            <HiCpuChip className="buttonicon" />
            <p className="buttontext">Cpu</p>
          </Link>
          <Link
            className={`buttonnav ${
              activeButton === "/producto/ram" ? "active-button" : ""
            }`}
            to="/producto/ram"
            onClick={() => setActiveButton("/producto/ram")}
          >
            <FaMemory className="buttonicon" />
            <p className="buttontext">Memorias</p>
          </Link>
          <Link
            className={`buttonnav ${
              activeButton === "/producto/motherboard" ? "active-button" : ""
            }`}
            to="/producto/motherboard"
            onClick={() => setActiveButton("/producto/motherboard")}
          >
            <BsFillMotherboardFill className="buttonicon" />
            <p className="buttontext">Motherboard</p>
          </Link>
          <Link
            className={`buttonnav ${
              activeButton === "/producto/case_pc" ? "active-button" : ""
            }`}
            to="/producto/case_pc"
            onClick={() => setActiveButton("/producto/case_pc")}
          >
            <PiComputerTowerFill className="buttonicon" />
            <p className="buttontext">Gabinete</p>
          </Link>
          <Link
            className={`buttonnav ${
              activeButton === "/producto/power_supply" ? "active-button" : ""
            }`}
            to="/producto/power_supply"
            onClick={() => setActiveButton("/producto/power_supply")}
          >
            <ImPower className="buttonicon" />
            <p className="buttontext">Fuente</p>
          </Link>
          <Link
            className={`buttonnav ${
              activeButton === "/producto/disk" ? "active-button" : ""
            }`}
            to="/producto/disk"
            onClick={() => setActiveButton("/producto/disk")}
          >
            <BsDeviceSsdFill className="buttonicon" />
            <p className="buttontext">Discos</p>
          </Link>
          <Link
            className={`buttonnav ${
              activeButton === "/producto/graphics_card" ? "active-button" : ""
            }`}
            to="/producto/graphics_card"
            onClick={() => setActiveButton("/producto/graphics_card")}
          >
            <PiGraphicsCardFill className="buttonicon" />
            <p className="buttontext">Graficas</p>
          </Link>
        </nav>
      </div>
      {showLogin && (
        <div className="login-overlay">
          <LoginForm onClose={handleCloseLogin} />
        </div>
      )}
    </div>
  );
}

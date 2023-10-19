import { useState } from "react";

import { close, cblogo, menu, lumi, liven } from "../assets";
import { navLinks } from "../const";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Button from "./Button";
import Axios from "axios";
import { createurl, createUrlAlby } from "../utils/createurl";
import { FaBars } from "react-icons/fa6";
import { HiX } from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <div onClick={() => navigate("/")} className="hover:cursor-pointer">
        <img src={lumi} alt="liven" className="w-[130px] h-[60px]" />
        <p className="tracking-[20px] ml-[13px] text-[#B67465] font-poppins mt-2 text-[20px]">
          LUMI
        </p>
      </div>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => {
          return nav.title === "Chat" ? (
            <Link
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title
                  ? "text-[#797472] font-bold"
                  : "text-[#797472]"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
              to={{
                pathname: `/${
                  !localStorage.getItem("token") && nav.title === "Chat"
                    ? "login"
                    : nav.id
                }`,
              }}
            >
              {nav.title}
            </Link>
          ) : nav.title === "Login" ? (
            <a
              href={createUrlAlby()}
              hidden={localStorage.getItem("token") ? true : false}
            >
              <Button text={"Login with Alby"}></Button>
            </a>
          ) : (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title
                  ? "text-[#797472] font-bold"
                  : "text-[#797472]"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={nav.title === "SME" ? "/smelist" : "/"}>{nav.title}</a>
            </li>
          );
        })}
        {localStorage.getItem("token") ? (
          <FaSignOutAlt
            className="text-red-700 cursor-pointer text-lg"
            onClick={() => {
              navigate("/");
              localStorage.removeItem("token");
              localStorage.removeItem("refresh_token");
              localStorage.removeItem("user");
            }}
          />
        ) : null}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        {/* <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        /> */}
        {!toggle ? (
          <FaBars
            onClick={() => setToggle(!toggle)}
            className="text-[#797472] w-[28px] h-[28px]"
          />
        ) : (
          <HiX
            onClick={() => setToggle(!toggle)}
            className="text-[#797472] w-[28px] h-[28px]"
          />
        )}

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-primary absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-10`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => {
              return nav.title === "Sign Up" || nav.title === "Chat" ? (
                <Link
                  key={nav.id}
                  className={`${
                    localStorage.getItem("token") && nav.title === "Sign Up"
                      ? "hidden"
                      : ""
                  } font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title
                      ? "text-black font-bold"
                      : "text-black-gradient"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                  to={{ pathname: `/${nav.id}` }}
                >
                  {nav.title}
                </Link>
              ) : (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title
                      ? "text-[#797472] font-bold"
                      : "text-[#797472]"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={(e) => {
                    setActive(nav.title);
                    if (
                      localStorage.getItem("token") &&
                      nav.title === "Login"
                    ) {
                      localStorage.removeItem("token");
                      localStorage.removeItem("refresh_token");
                      localStorage.removeItem("user");

                      e.preventDefault();
                    } else if (nav.title === "SME") {
                      navigate("/smelist");
                    } else {
                      navigate("/");
                    }
                  }}
                >
                  {localStorage.getItem("token") && nav.title === "Login" ? (
                    <a>Logout</a>
                  ) : (
                    <a
                      href={
                        !localStorage.getItem("token") && nav.title === "Login"
                          ? createUrlAlby()
                          : ""
                      }
                    >
                      {nav.title}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

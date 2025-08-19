"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaCode,
  FaEnvelope,
} from "react-icons/fa";
import { Satisfy, Raleway } from "next/font/google";
import "../css/components.css";
import Link from "next/link";
import Clouds from "@/components/Clouds";
import { FaNewspaper } from "react-icons/fa6";

// Define allowed section IDs
type SectionKey = "header" | "about" | "opensources" | "blog" | "contact";
const sectionIds: SectionKey[] = [
  "header",
  "about",
  "opensources",
  "blog",
  "contact",
];

const satisfy = Satisfy({ weight: "400", subsets: ["latin"], display: "swap" });
const raleway = Raleway({ weight: "400", subsets: ["latin"], display: "swap" });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("header");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 100) current = id;
        }
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop nav items
  const navItems = [
    { id: "header", label: "Home", icon: <FaHome /> },
    { id: "about", label: "About", icon: <FaUser /> },
    { id: "opensources", label: "Open Source", icon: <FaCode /> },
    { id: "blog", label: "Blog", icon: <FaNewspaper /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <>
      <section id="header" className="relative w-full h-screen overflow-hidden">
        <Clouds />
        <picture className="absolute inset-0 z-0">
          <source
            media="(min-width: 1064px)"
            srcSet="/navarasu/img/navarasu_desktop.avif"
          />
          <source
            media="(min-width: 640px)"
            srcSet="/navarasu/img/navarasu_tab.avif"
          />
          <Image
            src="/navarasu/img/navarasu_mob.avif"
            alt="Responsive Background"
            width={800}
            height={600}
            className="w-full h-full object-cover object-[0.01%]"
            loading="eager"
            priority
          />
        </picture>

        <div className="absolute inset-0 bg-[rgba(41,37,37,0.37)] z-10" />

        <div className="absolute inset-0 z-20 grid grid-cols-10 grid-rows-7 py-20 justify-center px-4 md:px-16">
          <div className="col-start-3 col-span-8 row-start-3 row-span-2 sm:col-start-6 md:px-16 text-left">
            <div className="pr-2">
              <h1
                className={`${satisfy.className} text-white text-[80px] font-bold`}
              >
                Navarasu
              </h1>
            </div>
            <p
              className={`${raleway.className} text-[#eee] text-[28.8px] leading-tight md:text-[28px]`}
            >
              An Intense Seeker, Seeking a Profound Experience of Life
            </p>
            <Link
              href="#about"
              className={`${raleway.className} px-[30px] text-center h-[43px] w-[142px] leading-[46px] text-[15px] text-white shadow-none inline-block mt-6 rounded-full bg-[#ff3366] hover:bg-[#e52e5f] transition-all`}
            >
              <span className="text-center font-bold">ABOUT ME</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="fixed top-4 left-4 z-50 lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <div className="w-[36.58px] h-[32px] bg-[#12121299] mt-2 flex items-center justify-center">
            <i className="fa fa-bars bg-gray text-center" />
          </div>
        </button>


        {/* Mobile menu */}
        <header
          className={`fixed top-0 left-0 h-full w-3/4 max-w-[250px] bg-black/90 text-white z-50 transform transition-transform duration-700 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <span className="fixed top-4 left-44 z-50">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white text-xl"
            >
              <h6>X</h6>
            </button>
          </span>

          <div className="pt-20">
            <ul className="flex flex-col space-y-12 text-[20px] font-[Raleway,sans-serif]">
              {navItems.map(({ id, label, icon }) => (
                <li key={id} className="mt-[30px]">
                  <a
                    href={`#${id}`}
                    className="group flex items-center gap-3 hover:bg-[#fe4066] hover:text-white px-4 py-4 rounded-full duration-700"
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Desktop nav */}
        <div className="pt-10 hidden lg:grid fixed top-1/4 left-3 z-40 gap-7 p-2 rounded-lg text-[#45505b]">
          {navItems.map(({ id, label, icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`group relative w-[50px] h-[50px] flex items-center rounded-full transition-all duration-700 overflow-visible 
                ${
                  id === "opensources"
                    ? "hover:w-[170px]"
                    : "hover:w-[130px]"
                } 
                hover:bg-[#fe4066] px-4 
                ${
                  activeSection === id
                    ? "bg-[#fe4066] text-white"
                    : "bg-[#f2f3f5] hover:text-white"
                } shadow-md cursor-pointer`}
            >
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg z-10">
                {icon}
              </span>
              <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 whitespace-nowrap text-[17.6px] font-[Raleway,sans-serif]">
                {label}
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

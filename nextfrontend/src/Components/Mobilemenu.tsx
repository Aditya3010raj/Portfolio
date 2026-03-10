"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Work", href: "/#work" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Blog", href: "/#blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* The Hamburger Button */}
      <div className="block lg:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          <i className="bx bx-menu text-4xl text-white"></i>
        </button>
      </div>

      {/* The Collapsible Overlay Menu */}
      <div
        className={`fixed inset-0 z-70 min-h-screen bg-black bg-opacity-70 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } lg:hidden`}
      >
        <div
          className={`absolute right-0 min-h-screen w-2/3 bg-primary py-4 px-8 shadow transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:w-1/3`}
        >
          {/* Close Button */}
          <button className="absolute top-0 right-0 mt-4 mr-4" onClick={toggleMenu}>
            <img src="/assets/img/icon-close.svg" className="h-10 w-auto" alt="close" />
          </button>

          <ul className="mt-8 flex flex-col">
            {navLinks.map((link) => (
              <li key={link.name} className="py-2">
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                  className="pt-0.5 font-header font-semibold uppercase text-white hover:text-yellow"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
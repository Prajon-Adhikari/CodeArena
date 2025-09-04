import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook, faXTwitter, faWhatsapp, faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#196594] mt-10 px-[120px]">
      <div className=" px-10 pb-12 pt-16 flex justify-between text-sm text-white">
        <div className="w-[300px]">
           <h1 className="font-bold text-3xl pb-3 ">CODEARENA</h1>
           <p> Maxime quaerat asperiores ab cumque labore eveniet facilis ducimus nemo autem aperiam. labore eveniet facilis ducimus nemo autem aperiam.</p>
           <div className="pt-5 flex gap-5 items-center">
              <span className="bg-yellow-500 px-2 pt-2 pb-1 rounded-full">
                <FontAwesomeIcon icon={faFacebook} className="text-lg text-white"/>
              </span>
              <div className="bg-yellow-500 px-2 pt-2 pb-1 rounded-full">
                <FontAwesomeIcon icon={faXTwitter} className="text-lg text-white"/>
              </div>
              <div className="bg-yellow-500 px-[9px] pt-2 pb-1 rounded-full">
                <FontAwesomeIcon icon={faWhatsapp} className="text-lg text-white"/>
              </div>
              <div className="bg-yellow-500 px-[9px] pt-2 pb-1 rounded-full">
                <FontAwesomeIcon icon={faInstagram} className="text-lg text-white"/>
              </div>
           </div>
        </div>
        <div>
          <h4 className="font-bold text-xl mb-2">CodeArena</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:underline">
                 Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline flex items-center">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
               Blogs
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                 Press
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                 Contact
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                 Help
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xl mb-2">Hackathon Links</h4>
          <ul className="space-y-1">
            <li>
              <Link to="join/hackathon" className="hover:underline">
                 Join hackathon
              </Link>
            </li>
    
            <li>
              <Link to="hackathon" className="hover:underline">
                 Host  hackathon
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                My Hackathon
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xl mb-2">Information</h4>
          <ul className="space-y-1">
            <li>
              <FontAwesomeIcon icon={faPhone} className="text-yellow-500 pr-2" /> +977-9862783319
            </li>
    
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="text-yellow-500 pr-2"/> codearena@gmail.com

            </li>
            <li>
              <FontAwesomeIcon icon={faLocationDot} className="text-yellow-500 pr-2"/> Bharatpur-6, Chitwan
            </li>
          </ul>
          <h4 className="font-bold text-xl mb-2 pt-5">Opening Hours</h4>
              <div>Sunday-Friday ( 8:00 to 18:00 )</div>
              <div>Saturday ( Closed )</div>
        </div>
      </div>

      <div className=" px-10 py-6 border-t flex flex-col md:flex-row justify-between text-xs text-white">
        <p>© 2025 Code Arena, Inc. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
          <Link to="" className="hover:underline">
            Community guidelines
          </Link>
          <Link to="" className="hover:underline">
            Terms of service
          </Link>
          <Link to="" className="hover:underline">
            Security
          </Link>
          <Link to="" className="hover:underline">
            CA notice
          </Link>
          <Link to="" className="hover:underline">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

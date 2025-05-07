import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm text-gray-700">
        <div>
          <h4 className="font-semibold mb-2">CodeArena</h4>
          <ul className="space-y-1">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="" className="hover:underline">Careers</Link></li>
            <li><Link to="" className="hover:underline">Press</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="" className="hover:underline">Help</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Hackathons</h4>
          <ul className="space-y-1">
            <li><Link to="" className="hover:underline">Browse hackathons</Link></li>
            <li><Link to="" className="hover:underline">Explore projects</Link></li>
            <li><Link to="" className="hover:underline">Host a hackathon</Link></li>
            <li><Link to="" className="hover:underline">Hackathon guides</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Portfolio</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Your projects</a></li>
            <li><a href="#" className="hover:underline">Your hackathons</a></li>
            <li><a href="#" className="hover:underline">Settings</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Connect</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
            <li><a href="#" className="hover:underline">Discord</a></li>
            <li><a href="#" className="hover:underline">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 border-t flex flex-col md:flex-row justify-between text-xs text-gray-500">
        <p>© 2025 Devpost, Inc. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Community guidelines</a>
          <a href="#" className="hover:underline">Terms of service</a>
          <a href="#" className="hover:underline">Security</a>
          <a href="#" className="hover:underline">CA notice</a>
          <a href="#" className="hover:underline">Privacy policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

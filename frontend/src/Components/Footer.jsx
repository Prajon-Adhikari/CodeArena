import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm text-gray-700">
        <div>
          <h4 className="font-semibold mb-2">Devpost</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Hackathons</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Browse hackathons</a></li>
            <li><a href="#" className="hover:underline">Explore projects</a></li>
            <li><a href="#" className="hover:underline">Host a hackathon</a></li>
            <li><a href="#" className="hover:underline">Hackathon guides</a></li>
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

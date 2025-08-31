import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook, faInstagram,
  faGithub,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";

export default function Teams({image, name, role}) {
  return (
    <div className="flex flex-col items-center">
      <img src={image} alt="" className="w-[100px] h-[100px] object-cover rounded-full mb-4"/>
      <p className="font-bold text-xl">{name}</p>
      <p className="text-gray-600">{role}</p>
      <div className="flex gap-5 pt-2">
        <FontAwesomeIcon icon={faFacebook}  className="bg-gray-600 text-white text-lg p-[6px] rounded-md"/>
        <FontAwesomeIcon icon={faLinkedinIn} className="bg-gray-600 text-white text-lg p-[6px] rounded-md"/>
        <FontAwesomeIcon icon={faGithub} className="bg-gray-600 text-white text-lg p-[6px] rounded-md"/>
        <FontAwesomeIcon icon={faInstagram} className="bg-gray-600 text-white text-lg p-[6px] rounded-md"/>
      </div>
    </div>
  );
}

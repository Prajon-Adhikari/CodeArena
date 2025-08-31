import React from "react";

export default function Teams({image, name, role}) {
  return (
    <div className="flex flex-col items-center">
      <img src={image} alt="" className="w-[100px] h-[100px] object-cover rounded-full mb-4"/>
      <p className="font-bold text-xl">{name}</p>
      <p className="text-gray-600">{role}</p>
      <div></div>
    </div>
  );
}

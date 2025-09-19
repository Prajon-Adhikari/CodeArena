import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Panel(props) {
  return (
    <div
      className={`bg-gradient-to-br ${props.begColor} ${props.midColor}  ${props.endColor} w-[280px] text-white rounded-2xl p-4 shadow-lg shadow-slate-400`}
    >
      <div className="text-lg pl-2">{props.title}</div>
      <div className="flex justify-between pt-4">
        <FontAwesomeIcon icon={props.figure} className="text-[60px] pl-6" />
        <div className="flex flex-col items-end">
          <div className="text-center font-bold text-3xl">{props.amount}</div>
          <div className="text-gray-200 text-center text-sm">{props.description}</div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Panel from "./Panel";
import { faChartSimple, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  return (
    <div>
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">DASHBOARD</h2>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-2 w-[630px] gap-4">
          <Panel
            title="Total Users"
            figure={faChartSimple}
            amount={`1000`}
            description= "Users"
            begColor="from-pink-500"
            midColor="via-pink-600"
            endColor="to-pink-700"
          />

          <Panel
            title="Total Hackathons"
            figure={faChartSimple}
            amount={`20`}
            description= "Hackathons"
            begColor="from-blue-400" // ✅ Tailwind default
            midColor="via-blue-500"
            endColor="to-indigo-600"
          />

          <Panel
            title="Total Submissions"
            figure={faChartSimple}
            amount={`100`}
            description= "Submissions"
            begColor="from-teal-400"
            midColor="via-teal-500"
            endColor="to-teal-600"
          />

          <Panel
            title="Completed Hackathons"
            figure={faChartSimple}
            amount={`4000`}
            description= "Completed"
            begColor="from-yellow-400"
            midColor="via-yellow-500"
            endColor="to-yellow-600"
          />
        </div>
      </div>
    </div>
  );
}

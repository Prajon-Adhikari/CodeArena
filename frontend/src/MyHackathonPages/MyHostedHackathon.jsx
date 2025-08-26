import { useLocation, Link } from "react-router-dom";

export default function MyHostedHackathon() {
  const location = useLocation();

  const isJoinedActive = location.pathname.includes("joined");
  const isHostedActive = location.pathname.includes("hosted");

  return (
    <div className="pt-30 px-[130px]">
      <h1 className="font-bold text-5xl pb-10">My Hackathons</h1>

      <div className="flex gap-20 text-2xl">
        <Link
          to="/myjoinedhackathon"
          className={`pb-2 ${
            isJoinedActive ? "border-b-4 border-blue-400" : ""
          }`}
        >
          Joined Hackathon
        </Link>
        <Link
          to="/myhostedhackathon"
          className={`pb-2 ${
            isHostedActive ? "border-b-4 border-blue-400" : ""
          }`}
        >
          Hosted Hackathon
        </Link>
      </div>
      <div></div>
    </div>
  );
}

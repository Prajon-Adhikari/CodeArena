import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SpecificHackathon() {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState("");

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        console.log("Hello");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setHackathon(data.hackathon);
      } catch (error) {
        console.log("Failed to fetch hackathon", error);
      }
    };
    fetchHackathonDetails();
  }, [id]);
  return (
    <div>
      <h1>{hackathon.title}</h1>
    </div>
  );
}

import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Roomify Home" },
    { name: "description", content: "Welcome to Roomify!" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <h1 className=" text-2xl text-center text-black italic underline"> Welcome to Roomify! </h1>
    </div>
  )
}

import type { Route } from "./+types/home";
import HomeIndex from "~/home/HomeIndex";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <HomeIndex />;
}

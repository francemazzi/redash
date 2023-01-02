import { LinksFunction } from "@remix-run/server-runtime";
import tailwindUrl from "../styles/app.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindUrl }];
};
export default function Index() {
  return (
    <div>
      <p className="text-secondary text-[25px]">Welcome to Remix</p>
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";
import Mycards from "./MyCards";
import Appmanu from "./TemP/manu";
import GetProfile from "./chapter06.getProfile";
import BookFrom from "./sec02.bookForm";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <Appmanu/>
      <BookFrom/>
      <GetProfile/>
      <Mycards/>
      <h1 className="text-3xl">Welcome to Remix</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/quickstart"
            rel="noreferrer"
          >
            5m Quick Start
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/tutorial"
            rel="noreferrer"
          >
            30m Tutorial
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
      </ul>
      <hr />
      <h1 className="text-3xl">Welcome to Remix</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <img src="public\img\www.jpg" width={250} height={100} />
        <li>Name: Wachirawit Chotchuang</li>
        <li>Clsss : Information Technology</li>
        <li>Email: <a href="wachirawit.cho@rmutto.ac.th">Contect me</a></li>
      </ul>
    </div>
  );
}

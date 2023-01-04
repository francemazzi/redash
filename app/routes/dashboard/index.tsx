import React from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";

//componets
import Header from "~/components/header";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

const Dashboard = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      {/* HEADER */}
      <Header />

      {/* Opzioni Dashboard */}

      <Link
        to="/profilo"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
      >
        👤 Profilo
      </Link>

      <Link
        to="/mentors"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
      >
        💼 Cerca mentor
      </Link>

      <Link
        to="/task"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
      >
        📝 Tasks
      </Link>

      {/* <Link
        to="/notes"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
      >
        Crea note
      </Link> */}
    </div>
  );
};

export default Dashboard;

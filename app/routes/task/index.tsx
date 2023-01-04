import React from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";

//common type
import Header from "~/components/molecols/header";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

const Task = () => {
  const taskRef = React.useRef<HTMLInputElement>(null);
  const deadLineRef = React.useRef<HTMLInputElement>(null);
  return (
    <div>
      {/* HEADER */}
      <Header />
      {/* Crea task */}
      <p className="p-2 text-center">Crea un task</p>
      <Form method="post" className="space-y-6" noValidate>
        <label
          htmlFor="task"
          className="block text-sm font-medium text-gray-700"
        >
          Inserisci qui il lavoro da fare
        </label>
        <div className="mt-1">
          <input
            ref={taskRef}
            id="task"
            required
            autoFocus={true}
            name="task"
            type="task"
            autoComplete="task"
            // aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="task-error"
            className="my-2 w-full rounded border border-gray-500 px-2 py-1 text-lg"
          />
        </div>
        <label
          htmlFor="deadLine"
          className="block text-sm font-medium text-gray-700"
        >
          Inserisci qui la dead line
        </label>
        <div className="mt-1">
          <input
            ref={deadLineRef}
            id="deadLine"
            required
            autoFocus={true}
            name="deadLine"
            type="deadLine"
            autoComplete="deadLine"
            // aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="deadLine-error"
            className="my-2 w-full rounded border border-gray-500 px-2 py-1 text-lg"
          />
        </div>
      </Form>
      {/* I task che hai assegnato */}
      <p className="p-2 text-center">I task ti hanno assegnato</p>
    </div>
  );
};

export default Task;

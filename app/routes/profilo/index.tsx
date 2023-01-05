import React from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  useActionData,
  useLoaderData,
} from "@remix-run/react";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

//common type
import Header from "~/components/molecols/header";
import { createUser } from "~/models/user.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

// export async function action({ request }: ActionArgs) {
//   const userId = await requireUserId(request);
//   const formData = await request.formData();
//   const skill = formData.get("skill");
//   const experience = formData.get("experience");
//   const yearExperience = formData.get("yearExperience");
//   const ruolo = formData.get("ruolo");

//nuova funzione che aggiorna il profilo

// const profile = await createUser({ skill, experience, yearExperience, ruolo });
// }

const Profilo = () => {
  const user = useUser();
  // const actionData = useActionData<typeof action>();

  const data = useLoaderData<typeof loader>();
  //ref
  const skillRef = React.useRef<HTMLInputElement>(null);
  const experienceRef = React.useRef<HTMLInputElement>(null);
  const yearExperienceRef = React.useRef<HTMLInputElement>(null);
  const ruoloRef = React.useRef<HTMLInputElement>(null);

  // React.useEffect(() => {
  //   if (actionData?.errors?.title) {
  //     skillRef.current?.focus();
  //   } else if (actionData?.errors?.body) {
  //     experienceRef.current?.focus();
  //   } else if (actionData?.errors?.body) {
  //     yearExperienceRef.current?.focus();
  //   } else if (actionData?.errors?.body) {
  //     ruoloRef.current?.focus();
  //   }
  // }, [actionData]);

  return (
    <div>
      {/* HEADER */}
      <Header />
      <p className="p-2 text-center">Bentoranto! {user.email}</p>

      {/* form richiesta dati */}
      <div className="p-[5px]">
        <Form method="post" className="space-y-6" noValidate>
          {/* Skill*/}
          <label
            htmlFor="skill"
            className="block text-sm font-medium text-gray-700"
          >
            Inserisci le tue skill
          </label>
          <div className="mt-1">
            <input
              ref={skillRef}
              id="skill"
              required
              autoFocus={true}
              name="skill"
              type="skill"
              autoComplete="skill"
              // aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="skill-error"
              className="my-2 w-full rounded border border-gray-500 px-2 py-1 text-lg"
            />
          </div>
          {/* Experience */}
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700"
          >
            Inserisci la esperienza
          </label>
          <div className="mt-1">
            <input
              ref={experienceRef}
              id="experience"
              required
              autoFocus={true}
              name="experience"
              type="experience"
              autoComplete="experience"
              placeholder="Tipo di esperienza"
              // aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="experience-error"
              className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            />
            <input
              ref={yearExperienceRef}
              id="yearExperience"
              required
              autoFocus={true}
              name="yearExperience"
              type="yearExperience"
              autoComplete="yearExperience"
              placeholder="Anni passati a farla"
              // aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="yearExperience-error"
              className="my-2 w-full rounded border border-gray-500 px-2 py-1 text-lg"
            />
          </div>
          {/* Inseerisci il tuo ruolo */}
          <label
            htmlFor="ruolo"
            className="block text-sm font-medium text-gray-700"
          >
            Inserisci le tue skill
          </label>
          <div className="mt-1">
            <input
              ref={ruoloRef}
              id="ruolo"
              required
              autoFocus={true}
              name="ruolo"
              type="ruolo"
              autoComplete="ruolo"
              // aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="ruolo-error"
              className="my-2 w-full rounded border border-gray-500 px-2 py-1 text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Aggiungi
          </button>
        </Form>

        {/* cambia password */}
      </div>
    </div>
  );
};

export default Profilo;
function useState(): [any, any] {
  throw new Error("Function not implemented.");
}

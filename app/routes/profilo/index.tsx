import React, { useState } from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { safeRedirect, validateEmail } from "~/utils";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

//common type
import Header from "~/components/molecols/header";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

//form
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const skill = formData.get("skill");
  const experince = formData.get("experince");
  const yearExperience = formData.get("yearExperience");
  const ruolo = formData.get("ruolo");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");
}

const Profilo = () => {
  const data = useLoaderData<typeof loader>();
  const user = useUser();
  //ref
  const skillRef = React.useRef<HTMLInputElement>(null);
  const experienceRef = React.useRef<HTMLInputElement>(null);
  const yearExperienceRef = React.useRef<HTMLInputElement>(null);
  const ruoloRef = React.useRef<HTMLInputElement>(null);

  // stato
  const [skill, setSkill] = useState();
  const [Experince, setExperince] = useState();
  const [yearExperience, setYearExperience] = useState();
  const [ruolo, setRuolo] = useState();

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

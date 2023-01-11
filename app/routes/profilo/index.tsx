import React from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
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

//test zod
import { z } from "zod";

//common type
import Header from "~/components/molecols/header";
import {
  createSkill,
  createUser,
  getSkillListItems,
  updateProfile,
  verifyLogin,
} from "~/models/user.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const skilList = await getSkillListItems({ userId });
  return json({ skilList });
}

//create schema with zod

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  //dati del form
  const form = Object.fromEntries(formData.entries());

  const skill = formData.get("skill")?.toString() || null;
  const experience = formData.get("experience")?.toString() || null;
  const yearExperience = formData.get("yearExperience")?.toString() || null;
  const ruolo = formData.get("ruolo")?.toString() || null;

  //nuova funzione che aggiorna il profilo
  // prisma.user.create({
  //   data: {
  //     data
  //   }
  // })

  const skills = await createSkill(skill, userId);

  const profile = await updateProfile(
    experience,
    yearExperience,
    ruolo,
    userId
  );

  // return redirect("/dashboard");
  return null;
}

const Profilo = () => {
  const user = useUser();
  // const skill = us
  const actionData = useActionData<typeof action>();

  const data = useLoaderData<typeof loader>();
  //ref
  const skillRef = React.useRef<HTMLInputElement>(null);
  const experienceRef = React.useRef<HTMLInputElement>(null);
  const yearExperienceRef = React.useRef<HTMLInputElement>(null);
  const ruoloRef = React.useRef<HTMLInputElement>(null);

  //ERRORS
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
      <p className="p-2 text-center">
        La tua in anni: {user.yearExperience} {user.experince}
      </p>
      <p className="p-2 text-center">
        La ultima esperienza è stata: {user.experince}
      </p>
      <p className="p-2 text-center">Pra il tuo ruol è: {user.ruolo}</p>
      <p className="p-2 text-center">Skill:</p>
      {data.skilList.length === 0 ? (
        <p className="w-[10rem] rounded-md p-4 text-center shadow-md">
          Skill da inserire
        </p>
      ) : (
        <ol>
          {data.skilList.map((skill) => (
            <li key={skill.id}>
              <NavLink
                className={({ isActive }) =>
                  `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                }
                to={skill.id}
              >
                {skill.name}
              </NavLink>
            </li>
          ))}
        </ol>
      )}
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
              type="text"
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
              type="text"
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
              type="text"
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
            Inserisci il tuo ruolo
          </label>
          <div className="mt-1">
            <input
              ref={ruoloRef}
              id="ruolo"
              required
              autoFocus={true}
              name="ruolo"
              type="text"
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

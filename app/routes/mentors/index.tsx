import React from "react";
import Header from "~/components/molecols/header";
import MentorsCard from "~/components/molecols/MentorsCard";

type Props = {};

export default function Mentors({}: Props) {
  return (
    <div>
      {/* HEADER */}
      <Header />
      <h1 className="p-4 text-center text-[18px] font-semibold">
        Scegli tra i migliori mentors disponibili
      </h1>
      {/* Elenco dei mentors */}
      <MentorsCard />
    </div>
  );
}

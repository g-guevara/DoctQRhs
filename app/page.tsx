'use client';

import { Card, CardHeader } from "@nextui-org/react";
import React from "react";
import "@/styles/globals.css";
import Agendar from "@/components/Agendar";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-10 gap-1 lg:gap-10 mb-10">
      {/* Encabezado */}
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl md:text-9xl font-bold leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Bienvenido
          </span>
          <br />
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Invitación para crear páginas web a medida con Guillermo Guevara. Selecione una fecha para concretar una reunion por Meet.
        </p>
      </div>
      <Agendar />
      {/* Tarjeta de Atención */}
      <div className="max-w-xl w-full px-6 mt-10 sm:mt-0 md:mt-0">
  <Card
    className="p-5 bg-white dark:bg-gray-800 dark:border-gray-700"
    style={{ boxShadow: "1px 6px 20px rgba(83, 143, 240, 0.3)" }}
  >
    <CardHeader className="flex items-center mb-4">
      <svg
        className="w-6 h-6 text-gray-800 dark:text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#2562ea"
      >
        <path d="M11.209 3.816a1 1 0 0 0-1.966.368l.325 1.74a5.338 5.338 0 0 0-2.8 5.762l.276 1.473.055.296c.258 1.374-.228 2.262-.63 2.998-.285.52-.527.964-.437 1.449.11.586.22 1.173.75 1.074l12.7-2.377c.528-.1.418-.685.308-1.27-.103-.564-.636-1.123-1.195-1.711-.606-.636-1.243-1.306-1.404-2.051-.233-1.085-.275-1.387-.303-1.587-.009-.063-.016-.117-.028-.182a5.338 5.338 0 0 0-5.353-4.39l-.298-1.592Z" />
        <path
          fillRule="evenodd"
          d="M6.539 4.278a1 1 0 0 1 .07 1.412c-1.115 1.23-1.705 2.605-1.83 4.26a1 1 0 0 1-1.995-.15c.16-2.099.929-3.893 2.342-5.453a1 1 0 0 1 1.413-.069Z"
          clipRule="evenodd"
        />
        <path d="M8.95 19.7c.7.8 1.7 1.3 2.8 1.3 1.6 0 2.9-1.1 3.3-2.5l-6.1 1.2Z" />
      </svg>
      <div className="ml-2 font-semibold text-blue-600 dark:text-blue-400">
        Atención
      </div>
    </CardHeader>
    <p className="text-gray-700 dark:text-gray-300 pl-2 pb-3">
      Antes de pedir una hora, ten en cuenta que debes llevar una idea clara de
      lo que quieres.Puedes ver la pestaña Recursos para inspirarte.
    </p>
  </Card>
</div>


      {/* Sección principal: AGENDAR */}

    </section>
  );
}

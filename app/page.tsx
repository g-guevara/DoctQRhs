"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { styles } from "@/styles/doctqr-styles";

export default function DoctQRPage() {
  return (
    <div className="doctqr-container w-full">
      {/* Header Start */}
      <header>
        <div className="home">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-2">
                <Image 
                  src="/img/3.png" 
                  alt="Logo" 
                  width={40} 
                  height={40}
                />
                <h1 className="text-primary-blue text-xl font-bold">DoctQR</h1>
              </div>
              <nav className="hidden md:block">
                <ul className="flex gap-6">
                  <li>
                    <Link href="/" className="text-primary-blue hover:text-black">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/how_to" className="text-primary-blue hover:text-black">
                      How it works
                    </Link>
                  </li>
                  <li>
                    <Link href="/Sign_in" className="text-primary-blue hover:text-black">
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link href="/Log_in" className="text-primary-blue hover:text-black">
                      Log in
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="md:hidden">
                <Button isIconOnly variant="light">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Intro Section - FIXED: Section takes full width but content stays contained */}
      <section className="w-full py-20" style={{ backgroundColor: "#c8e2fe" }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h2 className="text-4xl font-bold leading-tight text-gray-800">
                  Allergies,<br/>
                  Discapatitations,<br/>
                  Special conditions.
                </h2>
              </div>
              <p className="text-lg mb-6">All that information and much more in one place.</p>
              <div className="flex gap-4">
                <Link href="/Sign_in">
                  <Button color="primary" size="lg">Sign in</Button>
                </Link>
                <Link href="/Log_in">
                  <Button color="primary" size="lg">Log in</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image 
                src="/img/hand4.PNG" 
                alt="Hand holding a card with QR code" 
                width={400} 
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="service" className="w-full py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Uses of <u>DOCTQR</u></h2>
            <p className="text-gray-600 mt-2">
              Multiples formas para facilitarte la comunicacion de tu ficha medica
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Card 1 */}
            <div className="service-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/img/doc3.png" 
                  alt="Medical icon" 
                  width={80} 
                  height={80}
                />
              </div>
              <h4 className="text-xl font-semibold text-center mb-2">Medical ocations</h4>
              <p className="text-gray-600 text-center">
                ¿Nuevo Doctor? No hay problema. Con DoctQR tu nuevo doctor conseguira todo lo que necesita escaneando el codigo
              </p>
            </div>
            
            {/* Service Card 2 */}
            <div className="service-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/img/emergency.PNG" 
                  alt="Emergency icon" 
                  width={80} 
                  height={80}
                />
              </div>
              <h4 className="text-xl font-semibold text-center mb-2">Emergency</h4>
              <p className="text-gray-600 text-center">
                En situaciones dificiles, DoctQR puede facilitar tu informacion medica en el instante
              </p>
            </div>
            
            {/* Service Card 3 */}
            <div className="service-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/img/trip (1).png" 
                  alt="Trip icon" 
                  width={80} 
                  height={80}
                />
              </div>
              <h4 className="text-xl font-semibold text-center mb-2">Trips</h4>
              <p className="text-gray-600 text-center">
                Transportar alimentos y medicamentos especiales puede ser complicado. DoctQR le dara la seriedad necesaria a la situacion.
              </p>
            </div>
            
            {/* Service Card 4 */}
            <div className="service-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/img/backpack2.PNG" 
                  alt="School icon" 
                  width={80} 
                  height={80}
                />
              </div>
              <h4 className="text-xl font-semibold text-center mb-2">Schoolar</h4>
              <p className="text-gray-600 text-center">
                Algunos niños se les olvida los nombres de los medicamentos que necesitan. Con DoctQR sera mas facil dar a conocer si condicion especial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="intro" className="w-full py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-center md:text-left">About</h2>
              </div>
              <p className="text-gray-600">
                DoctQR is a new way of being able to access medical data through a paper folded in any type of cards. The porpuse of this plattaform is that for those who have health complications, they can make their condition known more easily, providing all kinds of medical parameters with the QR code.
                <br/><br/>
                To start with you have to do is create an account, print your QR code and fold the page to fit your cards!
              </p>
            </div>
            <div className="flex justify-center">
              <Image 
                src="/img/wallet2.PNG" 
                alt="Wallet with QR code" 
                width={400} 
                height={300}

              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center">
            <ul className="flex flex-wrap justify-center gap-6 mb-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Sign_in" className="text-gray-600 hover:text-black">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/Log_in" className="text-gray-600 hover:text-black">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/Terms_and_conditions" className="text-gray-600 hover:text-black">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-600 hover:text-black">
                  How it works
                </Link>
              </li>
            </ul>
            <p className="text-gray-500 text-sm">Contact: doctqr.contact@gmail.com</p>
            <p className="text-gray-500 text-sm">Copyright &copy; {new Date().getFullYear()} - <b>DoctQR.</b></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
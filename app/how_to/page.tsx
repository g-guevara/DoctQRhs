"use client";

import React from "react";
import Image from "next/image";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { title } from "@/components/primitives";

const HowItWorksPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className={`${title({ color: "blue" })} mb-4`}>
          How DoctQR Works
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A simple solution to carry your important medical information in your wallet,
          accessible anytime through a QR code.
        </p>
      </section>

      {/* Steps Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Steps to Get Started</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex-col items-center pb-0 pt-4">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold">Create an Account</h3>
            </CardHeader>
            <CardBody className="text-center">
              <p>Sign up with your email to create your personal DoctQR profile.</p>
              <div className="flex justify-center mt-4">
                <Image 
                  src="/img/signup-illustration.png" 
                  alt="Sign up illustration" 
                  width={150} 
                  height={150}
                  className="opacity-80"
                  // This is a placeholder - you may need to update with actual images
                />
              </div>
            </CardBody>
          </Card>

          {/* Step 2 */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex-col items-center pb-0 pt-4">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold">Enter Medical Information</h3>
            </CardHeader>
            <CardBody className="text-center">
              <p>Add your allergies, conditions, medications, and emergency contacts.</p>
              <div className="flex justify-center mt-4">
                <Image 
                  src="/img/medical-form.png" 
                  alt="Medical form illustration" 
                  width={150} 
                  height={150}
                  className="opacity-80"
                  // This is a placeholder - you may need to update with actual images
                />
              </div>
            </CardBody>
          </Card>

          {/* Step 3 */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex-col items-center pb-0 pt-4">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold">Print Your QR Card</h3>
            </CardHeader>
            <CardBody className="text-center">
              <p>Download and print your personalized QR code template.</p>
              <div className="flex justify-center mt-4">
                <Image 
                  src="/img/print-qr.png" 
                  alt="Print QR illustration" 
                  width={150} 
                  height={150}
                  className="opacity-80"
                  // This is a placeholder - you may need to update with actual images
                />
              </div>
            </CardBody>
          </Card>

          {/* Step 4 */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex-col items-center pb-0 pt-4">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-bold">Fold & Carry</h3>
            </CardHeader>
            <CardBody className="text-center">
              <p>Cut, fold, and insert into your wallet like a regular card.</p>
              <div className="flex justify-center mt-4">
                <Image 
                  src="/img/wallet-card.png" 
                  alt="Wallet card illustration" 
                  width={150} 
                  height={150} 
                  className="opacity-80"
                  // This is a placeholder - you may need to update with actual images
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Folding Instructions */}
      <section className="mb-20 bg-gray-50 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-8">How to Fold Your DoctQR Card</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 h-48 flex items-center justify-center">
              <Image 
                src="/img/cut-template.png" 
                alt="Cut the template" 
                width={180} 
                height={180}
                className="object-contain"
                // This is a placeholder - you may need to update with actual images
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Cut the Template</h3>
            <p className="text-gray-600">Cut along the dotted lines of the printed template.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 h-48 flex items-center justify-center">
              <Image 
                src="/img/fold-template.png" 
                alt="Fold the card" 
                width={180} 
                height={180}
                className="object-contain"
                // This is a placeholder - you may need to update with actual images
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Fold Carefully</h3>
            <p className="text-gray-600">Fold along the indicated lines to create a card-sized insert.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 h-48 flex items-center justify-center">
              <Image 
                src="/img/insert-card.png" 
                alt="Insert into wallet" 
                width={180} 
                height={180}
                className="object-contain"
                // This is a placeholder - you may need to update with actual images
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Insert into Wallet</h3>
            <p className="text-gray-600">Place your folded DoctQR card in your wallet like any other card.</p>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="text-center bg-blue-50 py-16 px-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Create Your Medical QR Code?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Take control of your medical information and ensure it is accessible when needed most.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/Sign_up">
            <Button size="lg" color="primary">
              Sign Up Now
            </Button>
          </Link>
          <Link href="/Sign_in">
            <Button size="lg" variant="bordered">
              Log In
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Is my medical information secure?</h3>
            <p className="text-gray-600">Your data is encrypted and only accessible via your unique QR code. We never share your information with third parties.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">What if I need to update my information?</h3>
            <p className="text-gray-600">Simply log in to your account, update your details, and print a new QR code if necessary. Your QR code will always link to your most current information.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Do I need to reprint my card after updates?</h3>
            <p className="text-gray-600">No, your QR code stays the same. It links to your profile, so any updates you make are instantly accessible when scanning your existing card.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">What happens if I lose my card?</h3>
            <p className="text-gray-600">Just log in and print a new one. Your information remains secure in your account and can be accessed from any device.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { title } from "@/components/primitives";

// Import SignupForm with SSR disabled
const SignupForm = dynamic(() => import("@/components/SignupForm"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      <div className="animate-pulse">Loading form...</div>
    </div>
  )
});

export default function SignUpPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side - Form */}
        <div>
          <SignupForm />
        </div>
        
        {/* Right side - Information */}
        <div className="flex flex-col items-center md:items-start gap-8">
          <div className="text-center md:text-left">
            <h2 className={`${title({ color: "blue" })} mb-4`}>
              Carry Your Medical Info Everywhere
            </h2>
            <p className="text-gray-600">
              DoctQR provides a simple solution to keep your critical medical information
              accessible in emergencies through a convenient QR code card.
            </p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Why create an account?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-1">
                  <svg 
                    className="w-4 h-4 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <span>Store your medical information securely</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-1">
                  <svg 
                    className="w-4 h-4 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <span>Generate your personal QR code for your wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-1">
                  <svg 
                    className="w-4 h-4 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <span>Update your information anytime with instant QR access</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-1">
                  <svg 
                    className="w-4 h-4 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <span>Create emergency contact profiles for quick access</span>
              </li>
            </ul>
          </div>
          
          <div className="relative w-full max-w-sm h-60 mx-auto md:mx-0">
            <Image 
              src="/img/wallet2.PNG"
              alt="DoctQR card in wallet" 
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
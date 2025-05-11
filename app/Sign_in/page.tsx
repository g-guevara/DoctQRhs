"use client";

import React from "react";
import Image from "next/image";
import SigninForm from "@/components/SigninForm";
import { title } from "@/components/primitives";

export default function SignInPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side - Form */}
        <div>
          <SigninForm />
        </div>
        
        {/* Right side - Information */}
        <div className="flex flex-col items-center md:items-start gap-8">
          <div className="text-center md:text-left">
            <h2 className={`${title({ color: "blue" })} mb-4`}>
              Access Your Medical QR Profile
            </h2>
            <p className="text-gray-600">
              Sign in to manage your medical information, update your emergency contacts,
              and access your personalized QR code.
            </p>
          </div>
          
          <div className="relative w-full max-w-sm h-60 mx-auto md:mx-0">
            <Image 
              src="/img/hand4.PNG"
              alt="DoctQR card in hand" 
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Features of Your DoctQR Account
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
                <span>Update your medical information anytime</span>
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
                <span>Download your QR code card template</span>
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
                <span>Manage emergency contacts and medical history</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
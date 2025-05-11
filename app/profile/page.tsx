"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { title } from "@/components/primitives";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide navbar when profile page loads
    const navbar = document.querySelector("nav");
    if (navbar) {
      navbar.style.display = "none";
    }

    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Try to get user from localStorage or sessionStorage
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
      
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      } else {
        // No user found, redirect to login
        router.push("/Sign_in");
      }
      
      setLoading(false);
    }

    // Clean up function to show navbar again when navigating away
    return () => {
      if (navbar) {
        navbar.style.display = "";
      }
    };
  }, [router]);

  const handleSignOut = () => {
    // Show navbar again when signing out
    const navbar = document.querySelector("nav");
    if (navbar) {
      navbar.style.display = "";
    }
    
    // Clear user data from storage
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    
    // Redirect to home page
    router.push("/");
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[70vh]">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex justify-center items-center min-h-[70vh]">
        <div className="text-xl">Please log in to view your profile</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12">
      <h1 className={`${title()} text-center mb-8`}>Your Profile</h1>
      
      <Card className="w-full">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold">Welcome, {user.firstName}!</h2>
          <p className="text-default-500">Your DoctQR profile information</p>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
            </div>
          </div>
          
          <Button 
            color="danger" 
            variant="flat" 
            onPress={handleSignOut}
            className="mt-4"
          >
            Sign Out
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
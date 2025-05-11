// File: components/MedicalProfileView.tsx
"use client";

import React, { useEffect, useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  Chip,
  Spinner
} from "@nextui-org/react";
import Image from "next/image";

interface MedicalProfileProps {
  id: string;
}

interface MedicalProfileData {
  firstName: string;
  lastName: string;
  medicalInfo: {
    birthDate?: string;
    language?: string;
    isOrganDonor?: boolean;
    isPregnant?: boolean | null;
    medications?: string[];
    allergies?: string[];
    emergencyContacts?: {
      name: string;
      phone: string;
      relationship: string;
    }[];
    conditions?: string[];
    height?: number | string;
    weight?: number | string;
    bloodType?: string;
    additionalNotes?: string;
  };
}

export default function MedicalProfileView({ id }: MedicalProfileProps) {
  const [profile, setProfile] = useState<MedicalProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchMedicalProfile() {
      try {
        setLoading(true);
        
        if (!id) {
          setError("No profile ID provided");
          setLoading(false);
          return;
        }
        
        // Fetch the medical profile data
        const response = await fetch(`/api/medical-profile/${id}`);
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to load medical profile");
        }
        
        const profileData = await response.json();
        setProfile(profileData);
      } catch (err) {
        console.error("Error fetching medical profile:", err);
        setError((err as Error).message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    
    fetchMedicalProfile();
  }, [id]);
  
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <Spinner size="lg" label="Loading medical profile..." />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <Card className="max-w-md w-full mx-auto">
          <CardBody className="flex flex-col items-center gap-4 p-8">
            <div className="text-danger text-3xl">⚠️</div>
            <h1 className="text-xl font-bold">Error Loading Profile</h1>
            <p className="text-center text-gray-600">{error}</p>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <Card className="max-w-md w-full mx-auto">
          <CardBody className="flex flex-col items-center gap-4 p-8">
            <h1 className="text-xl font-bold">Profile Not Found</h1>
            <p className="text-center text-gray-600">The requested medical profile could not be found.</p>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  // Format the date in a more readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg 
              className="w-8 h-8 text-blue-600" 
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 15H16M8 9H16M9 18H15M6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">DoctQR Medical Profile</h1>
            <p className="text-gray-600">Emergency medical information</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Image 
            src="/img/hand4.PNG"
            alt="DoctQR" 
            width={100} 
            height={60}
            className="mt-4 md:mt-0"
          />
        </div>
      </div>
      
      {/* Patient Information */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold text-blue-600">Patient Information</h2>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          <h2 className="text-3xl font-bold mb-8">{profile.firstName} {profile.lastName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Date of Birth</p>
                <p className="font-medium text-lg">{formatDate(profile.medicalInfo.birthDate)}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Primary Language</p>
                <p className="font-medium text-lg capitalize">{profile.medicalInfo.language || "Not specified"}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Blood Type</p>
                <p className="font-medium text-lg">{profile.medicalInfo.bloodType || "Not specified"}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Height</p>
                <p className="font-medium text-lg">{profile.medicalInfo.height ? `${profile.medicalInfo.height} cm` : "Not specified"}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Weight</p>
                <p className="font-medium text-lg">{profile.medicalInfo.weight ? `${profile.medicalInfo.weight} kg` : "Not specified"}</p>
              </div>
              
              <div className="flex gap-3">
                {profile.medicalInfo.isOrganDonor && (
                  <Chip color="primary" variant="flat" size="sm">Organ Donor</Chip>
                )}
                
                {profile.medicalInfo.isPregnant === true && (
                  <Chip color="warning" variant="flat" size="sm">Pregnant</Chip>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Medical Conditions */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold text-blue-600">Medical Conditions</h2>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          {profile.medicalInfo.conditions && profile.medicalInfo.conditions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.medicalInfo.conditions.map((condition, index) => (
                <Chip key={index} color="danger" variant="flat">{condition}</Chip>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No medical conditions specified</p>
          )}
        </CardBody>
      </Card>
      
      {/* Allergies */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold text-blue-600">Allergies</h2>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          {profile.medicalInfo.allergies && profile.medicalInfo.allergies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.medicalInfo.allergies.map((allergy, index) => (
                <Chip key={index} color="warning" variant="flat">{allergy}</Chip>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No allergies specified</p>
          )}
        </CardBody>
      </Card>
      
      {/* Medications */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold text-blue-600">Medications</h2>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          {profile.medicalInfo.medications && profile.medicalInfo.medications.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.medicalInfo.medications.map((medication, index) => (
                <Chip key={index} color="success" variant="flat">{medication}</Chip>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No medications specified</p>
          )}
        </CardBody>
      </Card>
      
      {/* Emergency Contacts */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold text-blue-600">Emergency Contacts</h2>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          {profile.medicalInfo.emergencyContacts && profile.medicalInfo.emergencyContacts.length > 0 ? (
            <div className="space-y-4">
              {profile.medicalInfo.emergencyContacts.map((contact, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-md">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <p className="font-medium text-lg">{contact.name}</p>
                      <p className="text-gray-600">{contact.relationship}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <p className="font-medium">{contact.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No emergency contacts specified</p>
          )}
        </CardBody>
      </Card>
      
      {/* Additional Notes */}
      {profile.medicalInfo.additionalNotes && (
        <Card className="w-full mb-8">
          <CardHeader className="flex flex-col items-start px-6 py-4">
            <h2 className="text-2xl font-bold text-blue-600">Additional Notes</h2>
          </CardHeader>
          <Divider />
          <CardBody className="px-6 py-8">
            <p className="whitespace-pre-line">{profile.medicalInfo.additionalNotes}</p>
          </CardBody>
        </Card>
      )}
      
      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>This medical information is provided by the patient for emergency use.</p>
        <p className="mt-1">For more information, visit <a href="/" className="text-blue-600">DoctQR.com</a></p>
      </div>
    </div>
  );
}
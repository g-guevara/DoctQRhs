"use client";

import React, { useEffect, useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Divider,
  Spinner,
  Chip
} from "@nextui-org/react";
import { title } from "@/components/primitives";
import { use } from "react"; // Import use from React

interface MedicalInfo {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
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
  height?: number;
  weight?: number;
  bloodType?: string;
  additionalNotes?: string;
}

export default function MedicalInfoPage({ params }: { params: { id: string } }) {
  // Use React.use() to unwrap the params Promise
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalInfo = async () => {
      try {
        const response = await fetch(`/api/medical-info/${id}`);
        
        if (!response.ok) {
          throw new Error("Medical information not found");
        }
        
        const data = await response.json();
        setMedicalInfo(data);
      } catch (err) {
        setError("Unable to load medical information. The link may be invalid or expired.");
        console.error("Error fetching medical info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalInfo();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[70vh]">
        <Spinner size="lg" label="Loading medical information..." />
      </div>
    );
  }

  if (error || !medicalInfo) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <Card className="w-full">
          <CardBody className="p-12 text-center">
            <h2 className="text-2xl font-bold text-danger mb-4">Information Not Found</h2>
            <p className="text-gray-600">{error || "Medical information not available"}</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="medical-emergency-header bg-red-600 text-white p-4 rounded-t-xl text-center mb-2">
        <h1 className="text-xl font-bold">MEDICAL INFORMATION</h1>
        <p>EMERGENCY USE ONLY</p>
      </div>
      
      {/* Patient Info */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4 bg-blue-50">
          <h2 className="text-2xl font-bold">Patient Information</h2>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          <h2 className="text-3xl font-bold mb-8 text-primary">{medicalInfo.firstName} {medicalInfo.lastName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {medicalInfo.birthDate && (
                <div>
                  <p className="text-gray-500 text-sm">Date of Birth</p>
                  <p className="text-lg font-medium">{medicalInfo.birthDate}</p>
                </div>
              )}
              
              {medicalInfo.language && (
                <div>
                  <p className="text-gray-500 text-sm">Primary Language</p>
                  <p className="text-lg font-medium capitalize">{medicalInfo.language}</p>
                </div>
              )}
              
              {medicalInfo.bloodType && (
                <div>
                  <p className="text-gray-500 text-sm">Blood Type</p>
                  <p className="text-lg font-medium">{medicalInfo.bloodType}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {medicalInfo.height && (
                <div>
                  <p className="text-gray-500 text-sm">Height</p>
                  <p className="text-lg font-medium">{medicalInfo.height} cm</p>
                </div>
              )}
              
              {medicalInfo.weight && (
                <div>
                  <p className="text-gray-500 text-sm">Weight</p>
                  <p className="text-lg font-medium">{medicalInfo.weight} kg</p>
                </div>
              )}
              
              {medicalInfo.isOrganDonor !== undefined && (
                <div>
                  <p className="text-gray-500 text-sm">Organ Donor Status</p>
                  <p className="text-lg font-medium">{medicalInfo.isOrganDonor ? "Yes" : "No"}</p>
                </div>
              )}
              
              {medicalInfo.isPregnant !== null && (
                <div>
                  <p className="text-gray-500 text-sm">Pregnancy Status</p>
                  <p className="text-lg font-medium">
                    {medicalInfo.isPregnant === true ? "Yes" : 
                     medicalInfo.isPregnant === false ? "No" : "Not Applicable"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Critical Medical Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Allergies */}
        <Card className="w-full">
          <CardHeader className="flex flex-col items-start px-6 py-4 bg-red-50">
            <h2 className="text-xl font-bold text-red-600">Allergies</h2>
          </CardHeader>
          <Divider />
          <CardBody className="px-6 py-6">
            {medicalInfo.allergies && medicalInfo.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {medicalInfo.allergies.map((allergy, index) => (
                  <Chip key={index} color="danger" variant="flat" size="lg">{allergy}</Chip>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No allergies listed</p>
            )}
          </CardBody>
        </Card>
        
        {/* Medical Conditions */}
        <Card className="w-full">
          <CardHeader className="flex flex-col items-start px-6 py-4 bg-purple-50">
            <h2 className="text-xl font-bold text-purple-600">Medical Conditions</h2>
          </CardHeader>
          <Divider />
          <CardBody className="px-6 py-6">
            {medicalInfo.conditions && medicalInfo.conditions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {medicalInfo.conditions.map((condition, index) => (
                  <Chip key={index} color="secondary" variant="flat" size="lg">{condition}</Chip>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No medical conditions listed</p>
            )}
          </CardBody>
        </Card>
      </div>
      
      {/* Medications */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4 bg-blue-50">
          <h2 className="text-xl font-bold text-blue-600">Current Medications</h2>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-6">
          {medicalInfo.medications && medicalInfo.medications.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {medicalInfo.medications.map((medication, index) => (
                <Chip key={index} color="primary" variant="flat" size="lg">{medication}</Chip>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No medications listed</p>
          )}
        </CardBody>
      </Card>
      
      {/* Emergency Contacts */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4 bg-amber-50">
          <h2 className="text-xl font-bold text-amber-600">Emergency Contacts</h2>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-6">
          {medicalInfo.emergencyContacts && medicalInfo.emergencyContacts.length > 0 ? (
            <div className="space-y-4">
              {medicalInfo.emergencyContacts.map((contact, index) => (
                <div key={index} className="p-3 bg-default-100 rounded-md">
                  <p className="font-medium text-lg">{contact.name}</p>
                  <p className="text-default-500">{contact.relationship}</p>
                  <p className="text-medium mt-1">{contact.phone}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No emergency contacts listed</p>
          )}
        </CardBody>
      </Card>
      
      {/* Additional Notes */}
      {medicalInfo.additionalNotes && (
        <Card className="w-full mb-8">
          <CardHeader className="flex flex-col items-start px-6 py-4 bg-gray-50">
            <h2 className="text-xl font-bold">Additional Information</h2>
          </CardHeader>
          <Divider />
          <CardBody className="px-6 py-6">
            <p className="whitespace-pre-line">{medicalInfo.additionalNotes}</p>
          </CardBody>
        </Card>
      )}
      
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Medical information provided by DoctQR</p>
        <p className="mt-1">This information was shared by the patient for emergency purposes</p>
      </div>
    </div>
  );
}
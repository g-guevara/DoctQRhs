"use client";

import React, { useEffect, useState } from "react";
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  Input, 
  Textarea, 
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { title } from "@/components/primitives";
import { PlusIcon, PrinterIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  medicalInfo?: {
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
  };
}

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    birthDate: "",
    language: "english",
    isOrganDonor: false,
    isPregnant: null as boolean | null,
    medications: [] as string[],
    allergies: [] as string[],
    emergencyContacts: [] as EmergencyContact[],
    conditions: [] as string[],
    height: "",
    weight: "",
    bloodType: "",
    additionalNotes: ""
  });
  
  // Temporary state for new entries
  const [newMedication, setNewMedication] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: ""
  });

  // Blood type options
  const bloodTypes = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  // Language options
  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "arabic", label: "Arabic" },
    { value: "russian", label: "Russian" },
    { value: "portuguese", label: "Portuguese" },
  ];

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
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Initialize form data with user's medical info if available
          if (parsedUser.medicalInfo) {
            setFormData({
              birthDate: parsedUser.medicalInfo.birthDate || "",
              language: parsedUser.medicalInfo.language || "english",
              isOrganDonor: parsedUser.medicalInfo.isOrganDonor || false,
              isPregnant: parsedUser.medicalInfo.isPregnant,
              medications: parsedUser.medicalInfo.medications || [],
              allergies: parsedUser.medicalInfo.allergies || [],
              emergencyContacts: parsedUser.medicalInfo.emergencyContacts || [],
              conditions: parsedUser.medicalInfo.conditions || [],
              height: parsedUser.medicalInfo.height?.toString() || "",
              weight: parsedUser.medicalInfo.weight?.toString() || "",
              bloodType: parsedUser.medicalInfo.bloodType || "",
              additionalNotes: parsedUser.medicalInfo.additionalNotes || ""
            });
          }
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

  const handleInputChange = (field: string, value: string | boolean | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setFormData(prev => ({
        ...prev,
        medications: [...prev.medications, newMedication.trim()]
      }));
      setNewMedication("");
    }
  };

  const removeMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy("");
    }
  };

  const removeAllergy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setFormData(prev => ({
        ...prev,
        conditions: [...prev.conditions, newCondition.trim()]
      }));
      setNewCondition("");
    }
  };

  const removeCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const handleContactChange = (field: keyof EmergencyContact, value: string) => {
    setNewContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addContact = () => {
    if (newContact.name.trim() && newContact.phone.trim()) {
      setFormData(prev => ({
        ...prev,
        emergencyContacts: [...prev.emergencyContacts, { ...newContact }]
      }));
      setNewContact({ name: "", phone: "", relationship: "" });
    }
  };

  const removeContact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }));
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      // Parse numeric values
      const numericHeight = formData.height ? parseFloat(formData.height) : undefined;
      const numericWeight = formData.weight ? parseFloat(formData.weight) : undefined;
      
      // Create updated user object with medical info
      const updatedUser = {
        ...user,
        medicalInfo: {
          birthDate: formData.birthDate,
          language: formData.language,
          isOrganDonor: formData.isOrganDonor,
          isPregnant: formData.isPregnant,
          medications: formData.medications,
          allergies: formData.allergies,
          emergencyContacts: formData.emergencyContacts,
          conditions: formData.conditions,
          height: numericHeight,
          weight: numericWeight,
          bloodType: formData.bloodType,
          additionalNotes: formData.additionalNotes
        }
      };
      
      // In a real application, you would send this data to your API
      // For now, we'll just update localStorage/sessionStorage
      
      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      if (sessionStorage.getItem("user")) {
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      setUser(updatedUser);
      setSaveMessage({ text: "Changes saved successfully!", type: "success" });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
      
    } catch (error) {
      console.error("Error saving data:", error);
      setSaveMessage({ text: "Failed to save changes. Please try again.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

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

  const handlePrint = () => {
    window.print();
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
    <div className="w-full max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className={`${title({color: "blue", size: "lg"})}`}>Medical Profile</h1>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <Button 
            color="default" 
            variant="bordered"
            startContent={<PrinterIcon className="w-5 h-5" />}
            onPress={handlePrint}
            size="md"
          >
            Print
          </Button>
          
          <Button 
            color="danger" 
            variant="flat" 
            startContent={<ArrowRightOnRectangleIcon className="w-5 h-5" />}
            onPress={handleSignOut}
            size="md"
          >
            Sign Out
          </Button>
          
          <Button 
            color="primary" 
            isLoading={isSaving}
            onPress={handleSaveChanges}
            size="md"
          >
            Save Changes
          </Button>
        </div>
      </div>
      
      {/* Save message */}
      {saveMessage && (
        <div className={`p-3 rounded-md mb-6 ${saveMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-medium`}>
          {saveMessage.text}
        </div>
      )}
      
      {/* Basic Information */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold">Basic Information</h2>
          <p className="text-default-500">Your personal and basic medical information</p>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          <h2 className="text-3xl font-bold mb-8 text-primary">{user.firstName} {user.lastName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Left column */}
              <Input
                label="Date of Birth"
                placeholder="YYYY-MM-DD"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="w-full"
                classNames={{
                  label: "text-medium",
                }}
              />
              
              <Select 
                label="Primary Language" 
                placeholder="Select a language"
                selectedKeys={[formData.language]}
                onChange={(e) => handleInputChange("language", e.target.value)}
                className="w-full"
                classNames={{
                  label: "text-medium",
                }}
              >
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </Select>
              
              <Input
                label="Height (cm)"
                placeholder="Height in centimeters"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="w-full"
                classNames={{
                  label: "text-medium",
                }}
              />
              
              <Input
                label="Weight (kg)"
                placeholder="Weight in kilograms"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="w-full"
                classNames={{
                  label: "text-medium",
                }}
              />
              
              <Select 
                label="Blood Type" 
                placeholder="Select your blood type"
                selectedKeys={formData.bloodType ? [formData.bloodType] : []}
                onChange={(e) => handleInputChange("bloodType", e.target.value)}
                className="w-full"
                classNames={{
                  label: "text-medium",
                }}
              >
                {bloodTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            
            <div className="space-y-6">
              {/* Right column */}
              <div className="mb-2">
                <p className="text-medium mb-2">Organ Donor</p>
                <Checkbox
                  isSelected={formData.isOrganDonor}
                  onValueChange={(value) => handleInputChange("isOrganDonor", value)}
                  size="lg"
                >
                  Yes, I am an organ donor
                </Checkbox>
              </div>
              
              <div className="mb-2">
                <p className="text-medium mb-2">Pregnancy Status</p>
                <div className="flex flex-col gap-2">
                  <Checkbox
                    isSelected={formData.isPregnant === true}
                    onValueChange={(value) => value ? handleInputChange("isPregnant", true) : null}
                    size="md"
                  >
                    Yes
                  </Checkbox>
                  <Checkbox
                    isSelected={formData.isPregnant === false}
                    onValueChange={(value) => value ? handleInputChange("isPregnant", false) : null}
                    size="md"
                  >
                    No
                  </Checkbox>
                  <Checkbox
                    isSelected={formData.isPregnant === null}
                    onValueChange={(value) => value ? handleInputChange("isPregnant", null) : null}
                    size="md"
                  >
                    Not Applicable
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Medications */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold">Medications</h2>
          <p className="text-default-500">List all medications you are currently taking</p>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add medication"
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              className="flex-1"
              size="lg"
            />
            <Button
              isIconOnly
              color="primary"
              onClick={addMedication}
              size="lg"
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {formData.medications.length === 0 ? (
              <p className="text-default-500 p-3 bg-default-50 rounded-md">No medications added yet.</p>
            ) : (
              formData.medications.map((med, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-default-100 rounded-md">
                  <span className="font-medium">{med}</span>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    size="sm"
                    onClick={() => removeMedication(index)}
                  >
                    &times;
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
      
      {/* Allergies */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold">Allergies</h2>
          <p className="text-default-500">List all your allergies</p>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add allergy"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              className="flex-1"
              size="lg"
            />
            <Button
              isIconOnly
              color="primary"
              onClick={addAllergy}
              size="lg"
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {formData.allergies.length === 0 ? (
              <p className="text-default-500 p-3 bg-default-50 rounded-md">No allergies added yet.</p>
            ) : (
              formData.allergies.map((allergy, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-default-100 rounded-md">
                  <span className="font-medium">{allergy}</span>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    size="sm"
                    onClick={() => removeAllergy(index)}
                  >
                    &times;
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
      
      {/* Medical Conditions */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold">Medical Conditions</h2>
          <p className="text-default-500">List all your medical conditions</p>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add condition"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
              className="flex-1"
              size="lg"
            />
            <Button
              isIconOnly
              color="primary"
              onClick={addCondition}
              size="lg"
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {formData.conditions.length === 0 ? (
              <p className="text-default-500 p-3 bg-default-50 rounded-md">No conditions added yet.</p>
            ) : (
              formData.conditions.map((condition, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-default-100 rounded-md">
                  <span className="font-medium">{condition}</span>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    size="sm"
                    onClick={() => removeCondition(index)}
                  >
                    &times;
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
      
      {/* Emergency Contacts */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold">Emergency Contacts</h2>
          <p className="text-default-500">People to contact in case of emergency</p>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              label="Name"
              placeholder="Contact name"
              value={newContact.name}
              onChange={(e) => handleContactChange("name", e.target.value)}
              size="lg"
              classNames={{
                label: "text-medium",
              }}
            />
            <Input
              label="Phone"
              placeholder="Phone number"
              value={newContact.phone}
              onChange={(e) => handleContactChange("phone", e.target.value)}
              size="lg"
              classNames={{
                label: "text-medium",
              }}
            />
            <Input
              label="Relationship"
              placeholder="e.g. Spouse, Parent"
              value={newContact.relationship}
              onChange={(e) => handleContactChange("relationship", e.target.value)}
              size="lg"
              classNames={{
                label: "text-medium",
              }}
            />
          </div>
          
          <Button
            color="primary"
            onClick={addContact}
            className="mb-6"
            size="lg"
          >
            Add Contact
          </Button>
          
          <div className="space-y-4">
            {formData.emergencyContacts.length === 0 ? (
              <p className="text-default-500 p-4 bg-default-50 rounded-md">No emergency contacts added yet.</p>
            ) : (
              formData.emergencyContacts.map((contact, index) => (
                <div key={index} className="p-4 bg-default-100 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-lg">{contact.name}</p>
                      <p className="text-default-500">{contact.relationship}</p>
                      <p className="text-medium mt-1">{contact.phone}</p>
                    </div>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      size="sm"
                      onClick={() => removeContact(index)}
                    >
                      &times;
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
      
      {/* Additional Notes */}
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-2xl font-bold">Additional Notes</h2>
          <p className="text-default-500">Any other relevant medical information</p>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-8">
          <Textarea
            label="Additional Medical Information"
            placeholder="Enter any additional information that might be important for healthcare providers to know..."
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
            minRows={4}
            size="lg"
            classNames={{
              label: "text-medium pb-2",
            }}
          />
        </CardBody>
      </Card>
      
      {/* Action Buttons */}
      <Card className="w-full print:hidden">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Save message */}
            {saveMessage && (
              <div className={`p-3 rounded-md ${saveMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-medium`}>
                {saveMessage.text}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Button 
                color="primary" 
                variant="bordered"
                startContent={<PrinterIcon className="w-5 h-5" />}
                onPress={handlePrint}
                size="lg"
                className="px-8"
              >
                Print
              </Button>
              
              <Button 
                color="danger" 
                variant="flat" 
                startContent={<ArrowRightOnRectangleIcon className="w-5 h-5" />}
                onPress={handleSignOut}
                size="lg"
                className="px-8"
              >
                Sign Out
              </Button>
              
              <Button 
                color="primary" 
                isLoading={isSaving}
                onPress={handleSaveChanges}
                size="lg"
                className="px-8"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
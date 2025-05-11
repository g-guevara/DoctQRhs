"use client";

import React, { useState } from "react";
import { 
  Button, 
  Input, 
  Checkbox, 
  Link, 
  Card,
  CardBody,
  CardHeader,
  Divider
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignupForm() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Form validation state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: ""
  });

  // Toggle password visibility
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      valid = false;
    }
    
    // Terms and conditions
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setErrorMessage("");
    setSuccessMessage("");
    
    // Validate form
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Check if email already exists
      const emailCheckRes = await fetch(`/api/users?email=${encodeURIComponent(formData.email)}`);
      const emailCheck = await emailCheckRes.json();
      
      if (emailCheck.exists) {
        setErrorMessage("An account with this email already exists");
        setIsLoading(false);
        return;
      }
      
      // Submit registration data
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to register");
      }
      
      // Show success message
      setSuccessMessage("Registration successful! Redirecting to login...");
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push("/Sign_in");
      }, 2000);
      
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className="flex flex-col gap-1 items-start">
        <h1 className="text-2xl font-bold">Create your DoctQR account</h1>
        <p className="text-sm text-default-500">Enter your details to get started</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <Input
              isRequired
              label="First Name"
              placeholder="Enter your first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              errorMessage={errors.firstName}
              isInvalid={!!errors.firstName}
              autoComplete="given-name"
            />
            
            {/* Last Name */}
            <Input
              isRequired
              label="Last Name"
              placeholder="Enter your last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              errorMessage={errors.lastName}
              isInvalid={!!errors.lastName}
              autoComplete="family-name"
            />
          </div>
          
          {/* Email */}
          <Input
            isRequired
            label="Email"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
            isInvalid={!!errors.email}
            autoComplete="email"
          />
          
          {/* Password */}
          <Input
            isRequired
            label="Password"
            placeholder="Create a password"
            name="password"
            type={isVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            errorMessage={errors.password}
            isInvalid={!!errors.password}
            autoComplete="new-password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashIcon className="w-5 h-5 text-default-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-default-400" />
                )}
              </button>
            }
          />
          
          {/* Confirm Password */}
          <Input
            isRequired
            label="Confirm Password"
            placeholder="Confirm your password"
            name="confirmPassword"
            type={isVisible ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            errorMessage={errors.confirmPassword}
            isInvalid={!!errors.confirmPassword}
            autoComplete="new-password"
          />
          
          {/* Terms and Conditions */}
          <div className="flex flex-col gap-1">
            <Checkbox
              isSelected={acceptTerms}
              onValueChange={setAcceptTerms}
              size="sm"
            >
              I agree to the{" "}
              <Link href="/Terms_and_conditions" size="sm">
                terms and conditions
              </Link>
            </Checkbox>
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
            )}
          </div>
          
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}
          
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm">
              {successMessage}
            </div>
          )}
          
          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            className="mt-2"
            isLoading={isLoading}
            fullWidth
          >
            Sign Up
          </Button>
          
          {/* Login Link */}
          <div className="text-center mt-2">
            <p className="text-sm text-default-500">
              Already have an account?{" "}
              <Link href="/Sign_in" size="sm">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
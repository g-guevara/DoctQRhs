// File: components/ProfileQRCode.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Input,
  Tooltip
} from "@nextui-org/react";
import { DocumentDuplicateIcon, PrinterIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ProfileQRCodeProps {
  userId: string;
}

export default function ProfileQRCode({ userId }: ProfileQRCodeProps) {
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  
  useEffect(() => {
    // Create the share URL based on the user ID
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/view/${userId}`;
    setShareUrl(url);
    
    // Generate QR code URL using a free QR code API
    // We're using the Google Charts API for simplicity
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(url)}&choe=UTF-8`;
    setQrCodeUrl(qrUrl);
  }, [userId]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const openShareLink = () => {
    window.open(shareUrl, '_blank');
  };
  
  const printQRCode = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>DoctQR Medical Profile QR Code</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
              }
              .container {
                max-width: 500px;
                margin: 0 auto;
                border: 1px solid #ccc;
                padding: 20px;
                border-radius: 10px;
              }
              .qr-code {
                margin: 20px 0;
              }
              .instructions {
                font-size: 14px;
                color: #555;
                margin-top: 20px;
              }
              .url {
                word-break: break-all;
                font-size: 12px;
                color: #777;
                margin-top: 10px;
              }
              @media print {
                .no-print {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>DoctQR Medical Profile</h1>
              <p>Scan this QR code to access my medical information</p>
              <div class="qr-code">
                <img src="${qrCodeUrl}" alt="QR Code" style="width: 250px; height: 250px;" />
              </div>
              <div class="instructions">
                <p>Print this QR code, cut it out, and carry it in your wallet for emergency access to your medical information.</p>
              </div>
              <div class="url">
                <p>${shareUrl}</p>
              </div>
              <button class="no-print" onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; background-color: #0070f3; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Print
              </button>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start px-6 py-4">
        <h2 className="text-2xl font-bold">Your Medical QR Code</h2>
        <p className="text-default-500">Share this QR code to provide access to your medical profile</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col items-center px-6 py-8">
        <div className="mb-6">
          <img 
            src={qrCodeUrl} 
            alt="QR Code" 
            className="w-64 h-64 border rounded-lg"
          />
        </div>
        
        <div className="w-full max-w-md mb-6">
          <Input
            label="Share Link"
            value={shareUrl}
            readOnly
            endContent={
              <Tooltip content={copied ? "Copied!" : "Copy link"}>
                <Button
                  isIconOnly
                  variant="light"
                  onPress={copyToClipboard}
                >
                  <DocumentDuplicateIcon className="w-5 h-5" />
                </Button>
              </Tooltip>
            }
          />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            color="primary"
            startContent={<PrinterIcon className="w-5 h-5" />}
            onPress={printQRCode}
          >
            Print QR Code
          </Button>
          
          <Button
            variant="bordered"
            startContent={<ArrowTopRightOnSquareIcon className="w-5 h-5" />}
            onPress={openShareLink}
          >
            Open Link
          </Button>
        </div>
        
        <div className="mt-8 text-small text-default-500 text-center">
          <p>Print this QR code and keep it in your wallet for emergency situations.</p>
          <p>Healthcare providers can scan this code to access your critical medical information.</p>
        </div>
      </CardBody>
    </Card>
  );
}
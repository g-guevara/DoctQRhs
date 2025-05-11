"use client";

import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
import { PrinterIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import QRCodeReact from "react-qr-code"; // You'll need to install this: npm install react-qr-code

interface QRCodeProps {
  url: string;
  size?: number;
  title?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ url, size = 200, title = "Medical Information" }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    const qrCodeElement = qrCodeRef.current;
    if (!qrCodeElement) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the QR code');
      return;
    }
    
    // Clone the QR code SVG for printing
    const svgElement = qrCodeElement.querySelector('svg');
    if (!svgElement) return;
    
    const svgClone = svgElement.cloneNode(true) as SVGElement;
    const svgData = new XMLSerializer().serializeToString(svgClone);
    const dataUrl = `data:image/svg+xml;base64,${btoa(svgData)}`;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>DoctQR - Medical QR Code</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 20px;
            }
            .container {
              max-width: 400px;
              margin: 0 auto;
              border: 1px solid #ddd;
              padding: 20px;
              border-radius: 8px;
            }
            .header {
              background-color: #0070f3;
              color: white;
              padding: 10px;
              border-radius: 4px;
              margin-bottom: 15px;
            }
            .footer {
              font-size: 12px;
              color: #666;
              margin-top: 15px;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            @media print {
              .no-print {
                display: none;
              }
              body {
                padding: 0;
              }
              .container {
                border: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">${title}</h2>
              <p style="margin: 5px 0 0 0;">Scan this QR code for medical information</p>
            </div>
            <img src="${dataUrl}" alt="QR Code" width="${size}" height="${size}" />
            <div class="footer">
              <p>This QR code provides access to critical medical information.</p>
              <p>Keep this card with you at all times for emergency situations.</p>
              <p>Provided by DoctQR - Your Medical Information Service</p>
            </div>
            <button class="no-print" onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; background-color: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Print QR Code
            </button>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };
  
  const handleDownload = () => {
    const qrCodeElement = qrCodeRef.current;
    if (!qrCodeElement) return;
    
    const svgElement = qrCodeElement.querySelector('svg');
    if (!svgElement) return;
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Convert SVG to image
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Convert canvas to PNG
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create download link
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'DoctQR-Medical-QR-Code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm" ref={qrCodeRef}>
        <QRCodeReact 
          value={url} 
          size={size} 
          level="H" // High error correction
          bgColor="#FFFFFF"
          fgColor="#000000"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          color="primary"
          startContent={<PrinterIcon className="w-5 h-5" />}
          onClick={handlePrint}
        >
          Print QR Code
        </Button>
        
        <Button
          color="secondary"
          variant="flat"
          startContent={<ArrowDownTrayIcon className="w-5 h-5" />}
          onClick={handleDownload}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default QRCode;
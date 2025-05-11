"use client";

// Note: This component requires installing the qrcode package:
// npm install qrcode @types/qrcode

import React, { useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";
import { PrinterIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface QRCodeProps {
  url: string;
  size?: number;
  title?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ url, size = 200, title = "Medical Information" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Import QRCode library dynamically since it's a client component
    import('qrcode').then((QRCode) => {
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, url, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
      }
    }).catch(err => {
      console.error('Error loading QR code library:', err);
    });
  }, [url, size]);
  
  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the QR code');
      return;
    }
    
    const dataUrl = canvas.toDataURL('image/png');
    
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
            <img src="${dataUrl}" alt="QR Code" />
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'DoctQR-Medical-QR-Code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <canvas ref={canvasRef} />
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
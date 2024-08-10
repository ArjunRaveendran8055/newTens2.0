import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SubmitSuccess() {
  const { resid } = useParams();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    console.log(resid);
  }, [resid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resid);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Hide the message after 2 seconds
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Form Submitted Successfully
        </h1>
        <p className="mt-4 text-muted-foreground">Your form has been submitted. Here's your response code:</p>
        <div className="relative mt-4 flex items-center justify-center rounded-md bg-muted px-4 py-2 text-2xl font-medium text-foreground">
          <span className="uppercase">{resid}</span>
          <button
            className="ml-2 rounded-md border border-muted-foreground/20 p-1 hover:bg-muted-foreground/10"
            onClick={handleCopy}
          >
            <CopyIcon className="h-5 w-5" />
          </button>

          {/* Popup message */}
          {isCopied && (
            <div className="absolute rounded-md mt-16 bg-green-500 px-2 py-1 text-sm text-white">
              Copied successfully!
            </div>
          )}
        </div>
        <div className="mt-6">
          <a
            href="https://new10s.in/about-us/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export default SubmitSuccess;

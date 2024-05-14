import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Avatar,
} from "@material-tailwind/react";

function Batches() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility to true after component mounts to trigger transition
    setIsVisible(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">PARAVOOR - CLASS LIST</h1>
      </div>

      {/* LOOP CLASSES FROM HERE */}
      <div className={`space-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}  transition-transform duration-1000`}>
        <Card className="flex flex-col">
          <div className="flex items-start space-x-4 p-4">
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-black font-semibold">Class 10</h2>
              </div>
              <p className="text-sm mt-3 text-muted-foreground">Accessing classes made easy. Track, analyse and execute!</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                <span>#new10s</span>
                <span>#analytics</span>
              </div>
            </div>
            <div className="text-lg font-semibold self-end">2732 Students</div>
          </div>
          <div className="flex space-x-2 border-t p-4">
            <Button variant="outlined" className="text-sm" >
              Batches
            </Button>
          </div>
        </Card> 
      </div>

      <div className={`space-y-4 mt-5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}  transition-transform duration-1000`}>
        <Card className="flex flex-col">
          <div className="flex items-start space-x-4 p-4">
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-black font-semibold">Class 9</h2>
              </div>
              <p className="text-sm mt-3 text-muted-foreground">Accessing classes made easy. Track, analyse and execute!</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                <span>#new10s</span>
                <span>#analytics</span>
              </div>
            </div>
            <div className="text-lg font-semibold self-end">732 Students</div>
          </div>
          <div className="flex space-x-2 border-t p-4">
            <Button variant="outlined" className="text-sm" >
              Batches
            </Button>
          </div>
        </Card> 
      </div>

      <div className={`space-y-4 mt-5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}  transition-transform duration-1000`}>
        <Card className="flex flex-col">
          <div className="flex items-start space-x-4 p-4">
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-black font-semibold">Class 8</h2>
              </div>
              <p className="text-sm mt-3 text-muted-foreground">Accessing classes made easy. Track, analyse and execute!</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                <span>#new10s</span>
                <span>#analytics</span>
              </div>
            </div>
            <div className="text-lg font-semibold self-end">620 Students</div>
          </div>
          <div className="flex space-x-2 border-t p-4">
            <Button variant="outlined" className="text-sm" >
              Batches
            </Button>
          </div>
        </Card> 
      </div>
    </div>
  );
}

export default Batches;

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";

export default function page() {
  const interests = [
    "Music", "Movies", "Books", "Sports", "Travel", "Cooking",
    "Gaming", "Art", "Photography", "Technology", "Fashion",
    "Fitness", "Nature", "Science", "History", "Languages",
    "Dance", "Yoga", "Pets", "Volunteering",
  ];

  // ✅ Fix: Initialize selectedInterests as an empty array
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center">
            Select Your Interests
          </CardTitle>
          <CardDescription className="text-center">
            Choose at least 5 interests to help us match you better
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
            {interests.map((interest) => (
              <Button
                key={interest}
                variant={selectedInterests.includes(interest) ? "default" : "outline"}
                className="w-full text-sm py-1 px-2"
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Button>
            ))}
          </div>
          {/* ✅ Fix: Use optional chaining to avoid undefined errors */}
          <Button className="w-full" disabled={selectedInterests?.length < 5}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};


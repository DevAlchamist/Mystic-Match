"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
  MessageCircle,
} from "lucide-react";
import { ChatPanel } from "@/components/Chat-Panel";
import InterestButton from "@/components/ui/InterestButton";

export default function VideoCallPage() {
  const sharedInterests = ["Music", "Travel", "Photography"];
  const userVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error("Error accessing webcam:", error));
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-1 relative p-4">
        <div className="absolute inset-0 m-4 rounded-xl overflow-hidden bg-white shadow-lg">
          <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-400">
            Main Video Stream
          </div>
        </div>

        {/* Remote User Video */}
        <div className="absolute bottom-8 right-8 w-1/4 aspect-video rounded-lg overflow-hidden shadow-md bg-black">
          <video
            ref={userVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full transform scale-x-[-1] h-full object-cover"
          ></video>
        </div>

        {/* Interest Tags */}
        <div className="absolute bottom-8 left-8 bg-black bg-opacity-30 rounded-lg p-3">
          <div className="flex flex-wrap gap-2">
            {sharedInterests.map((interest, index) => (
              <InterestButton key={index} data={interest} />
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-100 text-gray-700 rounded-full w-12 h-12"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-100 text-gray-700 rounded-full w-12 h-12"
            onClick={() => setIsCameraOff(!isCameraOff)}
          >
            {isCameraOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-100 text-gray-700 rounded-full w-12 h-12"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
}

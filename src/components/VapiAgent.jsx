import React, { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneOff } from "lucide-react"; // icons from lucide-react

const VapiAgent = () => {
  const vapiRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    vapiRef.current = new Vapi("8c47cdd3-742b-4c31-a790-6f27c27d1a6e");

    vapiRef.current.on("call-start", () => setIsCalling(true));
    vapiRef.current.on("call-end", () => setIsCalling(false));
    vapiRef.current.on("error", (err) => console.error("Vapi error:", err));
  }, []);

  const startCall = () => {
    if (!vapiRef.current) return;
    vapiRef.current.start({
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are Home Academy assistant. Greet user politely.",
          },
        ],
      },
      voice: {
        provider: "11labs",
        voiceId: "burt",
      },
    });
  };

  const stopCall = () => {
    if (!vapiRef.current) return;
    vapiRef.current.stop();
  };

  return (
    <div>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6">
        {!isCalling ? (
          <button
            onClick={startCall}
            className="p-4 mr-18 mt-14 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition"
            title="Start Call"
          >
            <Mic size={28} />
          </button>
        ) : (
          <button
            onClick={stopCall}
            className="p-4 mr-14 rounded-full bg-red-500 text-white shadow-lg hover:scale-110 transition"
            title="End Call"
          >
            <PhoneOff size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default VapiAgent;

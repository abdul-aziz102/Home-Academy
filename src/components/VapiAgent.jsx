import React, { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

const VapiAgent = () => {
  const vapiRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    // Initialize Vapi with your Public Key
    vapiRef.current = new Vapi("8c47cdd3-742b-4c31-a790-6f27c27d1a6e");

    // Event listeners
    vapiRef.current.on("call-start", () => {
      console.log("Call started");
      setIsCalling(true);
    });

    vapiRef.current.on("call-end", () => {
      console.log("Call ended");
      setIsCalling(false);
    });

    vapiRef.current.on("speech-start", () => {
      console.log("Assistant started speaking");
    });

    vapiRef.current.on("speech-end", () => {
      console.log("Assistant stopped speaking");
    });

    vapiRef.current.on("message", (msg) => {
      console.log("Message:", msg);
    });

    vapiRef.current.on("error", (err) => {
      console.error("Vapi error:", err);
    });
  }, []);

  // Start call
  const startCall = () => {
    if (!vapiRef.current) return;
    vapiRef.current.start({
      model: {
        provider: "openai",
        model: "gpt-4o-mini", // fast + cheap model
        messages: [
          {
            role: "system",
            content: "You are Home Academy assistant. Greet user politely.",
          },
        ],
      },
      voice: {
        provider: "11labs",
        voiceId: "burt", // change to your desired voice
      },
    });
  };

  // Stop call
  const stopCall = () => {
    if (!vapiRef.current) return;
    vapiRef.current.stop();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold">🎙 Home Academy AI Agent</h2>
      {!isCalling ? (
        <button
          onClick={startCall}
          className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold"
        >
          Start Call
        </button>
      ) : (
        <button
          onClick={stopCall}
          className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold"
        >
          End Call
        </button>
      )}
    </div>
  );
};

export default VapiAgent;

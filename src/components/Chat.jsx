import React, { useState, useEffect } from "react";

const Chat = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const handleOpen = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.open(
        "https://abdulazizyousufzai.app.n8n.cloud/webhook/06d996b7-0419-4a0b-83d6-46ccaf1bc293/chat",
        "_blank"
      );
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeatures(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
          maxWidth: "600px",
          textAlign: "center",
          transform: "translateY(0)",
          transition: "transform 0.5s ease, box-shadow 0.5s ease",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          ":hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V6M5 12l7-7 7 7" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "15px",
            color: "#333",
            fontWeight: "700",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI Chat Assistant
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#555",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          Apke sawalon ka jawab dene ke liye AI ready hai. Sirf button click
          karein aur nayi tab me AI Chat khol kar baat shuru karein.
        </p>

        {showFeatures && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "15px",
              marginBottom: "30px",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            <div
              style={{
                background: "rgba(102, 126, 234, 0.1)",
                padding: "15px",
                borderRadius: "8px",
                borderLeft: "4px solid #667eea",
              }}
            >
              <h3 style={{ margin: "0 0 5px", color: "#444", fontSize: "1rem" }}>
                Instant Responses
              </h3>
              <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
                Get answers to your questions immediately
              </p>
            </div>
            <div
              style={{
                background: "rgba(118, 75, 162, 0.1)",
                padding: "15px",
                borderRadius: "8px",
                borderLeft: "4px solid #764ba2",
              }}
            >
              <h3 style={{ margin: "0 0 5px", color: "#444", fontSize: "1rem" }}>
                24/7 Available
              </h3>
              <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
                Always ready to help, anytime
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleOpen}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            padding: "15px 30px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: isHovering
              ? "0 10px 20px rgba(102, 126, 234, 0.4)"
              : "0 5px 15px rgba(102, 126, 234, 0.3)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  border: "3px solid rgba(255,255,255,0.3)",
                  borderRadius: "50%",
                  borderTopColor: "#fff",
                  animation: "spin 1s ease-in-out infinite",
                }}
              ></span>
              Opening...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Open AI Chat
            </>
          )}
        </button>

        <div
          style={{
            marginTop: "30px",
            fontSize: "0.9rem",
            color: "#777",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <span>100% Secure</span>
          <span>•</span>
          <span>Privacy Focused</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Chat;
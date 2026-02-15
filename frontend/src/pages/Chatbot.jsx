import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Chatbot = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "👋 Hi! I'm your assistant. How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userInput = input;
        const newMessages = [...messages, { sender: "user", text: userInput }];
        setMessages(newMessages);
        setInput("");

        let reply;

        // Matching queries with responses containing links
        if (userInput.toLowerCase().includes("auction")) {
            reply = (
                <>
                    You can view or manage auctions on the{" "}
                    <Link to="/auctions" className="text-blue-600 underline">
                        Auctions page
                    </Link>
                    .
                </>
            );
        } else if (userInput.toLowerCase().includes("leaderboard")) {
            reply = (
                <>
                    Check out the current leaderboard on the{" "}
                    <Link to="/leaderboard" className="text-blue-600 underline">
                        Leaderboard page
                    </Link>
                    .
                </>
            );
        } else if (userInput.toLowerCase().includes("register")) {
            reply = (
                <>
                    You can register as a new user on our{" "}
                    <Link to="/sign-up" className="text-blue-600 underline">
                        Registration page
                    </Link>
                    .
                </>
            );
        } else if (userInput.toLowerCase().includes("login")) {
            reply = (
                <>
                    To log in, please visit the{" "}
                    <Link to="/login" className="text-blue-600 underline">
                        Login page
                    </Link>
                    .
                </>
            );
        } else if (userInput.toLowerCase().includes("commission")) {
            reply = (
                <>
                    Commission updates are handled in the Admin Panel → Commission tab.
                </>
            );
        } else if (userInput.toLowerCase().includes("hello")) {
            reply = "Hello there! 😊 How can I assist you today?";
        } else if (userInput.toLowerCase().includes("help")) {
            reply = "You can ask about Auctions, Commission, Registration, Login or Navigation.";
        } else {
            reply = "I'm not sure about that yet. Please contact support.";
        }

        setMessages([...newMessages, { sender: "bot", text: reply }]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 bg-white w-80 h-96 shadow-2xl rounded-2xl flex flex-col">
            <div className="flex justify-between items-center bg-[#8458B3] text-white p-3 rounded-t-2xl">
                <h4 className="font-semibold"> BidBot </h4>
                <X size={20} onClick={onClose} className="cursor-pointer" />
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-2 rounded-xl ${msg.sender === "bot" ? "bg-purple-100 self-start" : "bg-gray-200 text-right"
                            }`}
                    >
                        {typeof msg.text === "string" ? (
                            msg.text
                        ) : (
                            // Render React elements (links) safely
                            msg.text
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="flex border-t">
                <input
                    className="flex-1 p-2 outline-none"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="bg-[#8458B3] text-white px-3">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;

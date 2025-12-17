import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I can help you find shelter, food, or explain policies. How can I help?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const getBotResponse = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('food')) return "I found 2 food pantries near you. The Mid-Ohio Food Collective is open until 4pm.";
        if (lower.includes('shelter')) return "There are 3 shelters in your area. Faith Mission has space available.";
        if (lower.includes('pet') || lower.includes('dog')) return "Clintonville-Beechwold Resources allows pets, but most emergency shelters do not.";
        return "I can help you find resources. Try asking about 'food', 'shelter', or 'policies'.";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        setTimeout(() => {
            const botMsg = { text: getBotResponse(input), sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="card chatbot">
            <div className="card-header dark">
                <h2>Franklin Assistant</h2>
            </div>
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`msg ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input-area">
                <input
                    type="text"
                    placeholder="Ask a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSend}>➤</button>
            </div>
        </div>
    );
};

export default Chatbot;

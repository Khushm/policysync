import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { RESOURCES, POLICIES } from './data';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I can help you find shelter, food, or explain policies. Try asking about 'tornado' or 'university'.", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getBotResponse = (text) => {
        const lower = text.toLowerCase();

        // strict filtering check
        if (!lower || lower.length < 2) return "Please enter a specific topic.";

        // 1. Search Policies
        const policyMatches = POLICIES.filter(p =>
            p.title.toLowerCase().includes(lower) ||
            p.desc.toLowerCase().includes(lower) ||
            p.type.toLowerCase().includes(lower)
        );

        if (policyMatches.length > 0) {
            return `I found ${policyMatches.length} policies related to "${text}": ${policyMatches.map(p => p.title).join(', ')}.`;
        }

        // 2. Search Resources
        const resourceMatches = RESOURCES.filter(r =>
            r.title.toLowerCase().includes(lower) ||
            r.type.toLowerCase().includes(lower) ||
            r.description.toLowerCase().includes(lower)
        );

        if (resourceMatches.length > 0) {
            return `I found ${resourceMatches.length} locations: ${resourceMatches.map(r => r.title).join(', ')}. Check the map for details.`;
        }

        // Strict Requirement: "correctly say 'No data available.'"
        return "No data available.";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const responseText = getBotResponse(currentInput);
            const botMsg = { text: responseText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800); // Simulate processing time
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleChipClick = (query) => {
        setInput(query);
        // Optional: auto-send
        // handleSend(); 
    };

    return (
        <div className="embedded-chatbot">
            <div className="chat-header">
                <div className="avatar">
                    <Sparkles size={18} fill="white" />
                </div>
                <div className="header-info">
                    <h4>Franklin Assistant</h4>
                    <span className="status-indicator">
                        <span className="status-dot"></span> Online
                    </span>
                </div>
                <button className="minimize-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            </div>
            <div className="chat-body" ref={chatWindowRef}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`chat-message ${msg.sender === 'bot' ? 'message-bot' : 'message-user'}`}>
                        {msg.text}
                    </div>
                ))}
                {isTyping && (
                    <div className="chat-message message-bot">
                        <span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span>
                    </div>
                )}
            </div>
            <div className="suggestions">
                <button onClick={() => handleChipClick('Tornado')}>Tornado</button>
                <button onClick={() => handleChipClick('University')}>University</button>
                <button onClick={() => handleChipClick('Food')}>Food</button>
            </div>
            <div className="chat-input-area">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="chat-send" onClick={handleSend}>
                    <Send size={16} />
                </button>
            </div>
        </div>
    );
};

export default Chatbot;

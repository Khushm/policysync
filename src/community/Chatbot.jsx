import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { RESOURCES, POLICIES } from './data';

const Chatbot = ({ externalSearch }) => {
    const [messages, setMessages] = useState([
        { text: "Hello! I am the Franklin County Crisis Assistant. Enter your information in the search bar above or type a question here to get started.", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatWindowRef = useRef(null);

    // Watch for external search triggers from the top bar
    useEffect(() => {
        if (externalSearch) {
            triggerAIEvaluation(externalSearch);
        }
    }, [externalSearch]);

    const triggerAIEvaluation = (filters) => {
        setIsTyping(true);
        setTimeout(() => {
            let response = "I've analyzed the available records based on your input: \n\n";

            // Logic for specific recommendations
            if (filters.income === 'low' || filters.income === 'none') {
                response += "• **Food Security:** You likely qualify for **Ohio SNAP** or **Replacement Benefits** if you've lost power. I've highlighted the **Mid-Ohio Market** and **St. Stephens** as key resources in your sidebar. \n";
            }
            if (filters.disability) {
                response += "• **ADA Access:** I'm prioritizing shelters like **Faith Mission** and **Van Buren Center** which have a high capacity for medical and mobility support. \n";
            }
            if (filters.sip) {
                const localResources = RESOURCES.filter(r => r.zip === filters.zip);
                if (localResources.length > 0) {
                    response += `• **Local Impact:** There are ${localResources.length} facilities directly in ZIP ${filters.zip}. \n`;
                }
            }

            response += "\nI recommend exploring the **Resources** and **Policies** columns to the right. Is there anything else you'd like me to explain?";

            setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
            setIsTyping(false);
        }, 1500);
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getBotResponse = (text) => {
        const lower = text.toLowerCase();
        if (!lower || lower.length < 2) return "I'm here to help. Could you please specify what you're looking for (e.g., 'food', 'shelter', or a specific policy)?";

        // 1. Search Policies
        const policyMatches = POLICIES.filter(p =>
            p.title.toLowerCase().includes(lower) ||
            p.desc.toLowerCase().includes(lower) ||
            p.type.toLowerCase().includes(lower) ||
            p.category.toLowerCase().includes(lower)
        );

        // 2. Search Resources
        const resourceMatches = RESOURCES.filter(r =>
            r.title.toLowerCase().includes(lower) ||
            r.type.toLowerCase().includes(lower) ||
            r.description.toLowerCase().includes(lower) ||
            r.address.toLowerCase().includes(lower)
        );

        if (policyMatches.length === 0 && resourceMatches.length === 0) {
            return "Based on my current records, I couldn't find a direct match. You can call the Homeless Hotline at 614-274-7000 for immediate 24/7 human assistance.";
        }

        let response = `I've found some relevant records for you: \n\n`;

        if (resourceMatches.length > 0) {
            response += `**Resources:** I've identified ${resourceMatches.length} matching locations, including ${resourceMatches.slice(0, 2).map(r => r.title).join(' and ')}. \n\n`;
        }

        if (policyMatches.length > 0) {
            response += `**Policies:** There are ${policyMatches.length} policies found, such as "${policyMatches[0].title}". \n\n`;
        }

        response += `Would you like me to provide the contact details for any of these?`;

        return response;
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
        }, 1200); // Simulate processing time
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
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
                        {msg.text.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                ))}
                {isTyping && (
                    <div className="chat-message message-bot">
                        <span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span>
                    </div>
                )}
            </div>
            <div className="chat-input-area">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask a question..."
                    style={{ backgroundColor: 'white' }}
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

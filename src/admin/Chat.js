import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Chat.css';

const Chat = () => {
    const { reportId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const username = Cookies.get('username'); // Get the username from cookies

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/message/bug/${reportId}/messages`);
                setMessages(response.data);
                setLoading(false);
            } catch (error) {
                toast.error('Error Fetching Messages');
                console.log(error);
            }
        };

        fetchMessages();
    }, [reportId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        try {
            const response = await axios.post(`/message/bug/${reportId}/message`, { sender: username, content: newMessage });
            setMessages([...messages, response.data]);
            setNewMessage('');
            console.log(username);
        } catch (error) {
            toast.error('Error Sending Message');
            console.log(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chat-container">
            <h2 className='flex'>Chat</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === username ? 'sent' : 'received'}`}>
                        <h4>{msg.sender}:</h4> 
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>
            <div className="message-input flex">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage} className='send-btn'>Send</button>
            </div>
        </div>
    );
};

export default Chat;
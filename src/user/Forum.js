import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useWindowSize from "../utils/UseWindowSize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Forum.css';

const Forum = ({setHasNotifications, colorScheme, role}) => {
  const { reportId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const username = Cookies.get('username');
  const { width } = useWindowSize();


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/message/forum`);
        setMessages(response.data);
        setLoading(false);
        
        // Check if there are any new messages from other users
        const hasNewMessages = response.data.some(msg => msg.sender !== username);
        if (hasNewMessages) {
          setHasNotifications(true);
        } else {
          setHasNotifications(false);
        }
      } 
      catch (error) {
        toast.error('Error Fetching Messages');
        console.log(error);
      }
    };
  
    fetchMessages();
  }, [reportId, setHasNotifications, username]);  

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        try {
            const response = await axios.post(`/message/postForum`, { sender: username, content: newMessage });
            setMessages([...messages, response.data]);
            setNewMessage('');

            let redirectUrl;
            if (role === 'admin') {
              redirectUrl = '/tester/forum';
            } else if (role === 'tester') {
              redirectUrl = '/admin/forum';
            }else if (role === 'user') {
              redirectUrl = '/forum';
            }
            // Send notification
            await axios.post('/notification/notifications', {
              message: 'New forum message',
              type: 'forum',
              time: new Date().toISOString(),
              redirect: redirectUrl,
              sender: username
            });
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
      <h1 className='header flex'>Forum</h1>
      <div className="messages">
          {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === username ? 'sent' : 'received'}`}>
                  <h4>{msg.sender}:</h4> 
                  <p className={`${colorScheme}`}>{msg.content}</p>
              </div>
          ))}
      </div>
      <div className="message-input flex">
          <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
          />
          {width > 867 ? 
            <button onClick={handleSendMessage} className={`${colorScheme} send-btn`}>Send</button> :
            <button onClick={handleSendMessage} className={`${colorScheme} send-btn`}><FontAwesomeIcon icon='arrow-up' /></button>
          }
      </div>
    </div>
  )
}

export default Forum
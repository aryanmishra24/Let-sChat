import React from 'react';
import MessageForm from './MessageForm';
import TheirMessage from './TheirMessage';
import MyMessage from './MyMessage';

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;
    const chat = chats && chats[activeChat];
  
    const renderReadReceipts = (message, isMyMessage) => {
      return chat.people.map((person, index) => {
        if (person.last_read === message.id && !isMyMessage) {
          return (
            <div
              key={`read_${index}`}
              className="read-receipt"
              style={{
                float: isMyMessage ? 'right' : 'left',
                backgroundImage: `url(${person?.person?.avatar})`,
              }}
            />
          );
        } else {
          return null;
        }
      });
    };
  
    const renderMessages = () => {
      const keys = Object.keys(messages);
  
      return keys.map((key, index) => {
        const message = messages[key];
        const lastMessage = index === 0 ? null : messages[keys[index - 1]];
        const isMyMessage = message.sender.username === userName;
  
        return (
          <div key={key} style={{ width: '100%' }}>
            <div className="message-block">
              {isMyMessage ? (
                <MyMessage message={message} />
              ) : (
                <TheirMessage message={message} lastMessage={lastMessage} />
              )}
            </div>
            <div
              className="read-receipts"
              style={{
                marginRight: isMyMessage ? '0px' : '68px',
                marginLeft: isMyMessage ? '68px' : '0px',
              }}
            >
              {renderReadReceipts(message, isMyMessage)}
            </div>
          </div>
        );
      });
    };
  
    if (!chat) return 'Loading...';
  
    return (
      <div className="chat-feed">
        <div className="chat-title-container">
          <div className="chat-title">{chat.title}</div>
          <div className="chat-subtitle">
            {chat.people.map((person) => person.person.username).join(', ')}
          </div>
        </div>
        {renderMessages()}
        <div style={{ height: '100px' }} />
        <div className="message-form-container">
          <MessageForm {...props} chatId={activeChat} />
        </div>
      </div>
    );
  };
  
  export default ChatFeed;
  

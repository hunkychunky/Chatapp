import { ChannelHeader, MessageInput, Thread, Window, MessageList } from "stream-chat-react";
import React from "react";
const MessagingContainer = () =>{
    return(
        <div className="messaging-container">
        <Window>
            <ChannelHeader />
              <MessageList/>
            <MessageInput/>
        </Window>
    <Thread />
    </div>
    )
};

export default MessagingContainer
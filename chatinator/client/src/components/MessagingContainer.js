import { ChannelHeader, MessageInput, Thread, Window, MessageList } from "stream-chat-react";
import React from "react";
import {useCookies} from "react-cookie"
import UserList from "./UserList";
import {FaUsers, FaArrowAltCircleLeft} from "react-icons/fa"
import { useState } from "react";
const MessagingContainer = () =>{
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [userListVisible, setUserListVisible] = useState(false);
    const logout = () => {
        removeCookie('Name', cookies.Name);
        removeCookie('HashedPassword', cookies.HashedPassword);
        removeCookie('UserId', cookies.userId);
        removeCookie('AuthToken', cookies.AuthToken);

        window.location.reload();
    }
    return(
        <div className="messaging-container">
        {!userListVisible && (
            <Window>
            <FaUsers className="icon" onClick={() => setUserListVisible(true)}/>
            <ChannelHeader />
            <MessageList/>
            <MessageInput/>
            <button className="standard-button" onClick={logout}> Log out</button>
        </Window>
        )}
        {userListVisible && (
            <Window>
            <div className="chat-container">
            <FaArrowAltCircleLeft className="icon" onClick={() => setUserListVisible(true)}/>
            <ChannelHeader title="Users" />
            <UserList users= {users}/>
            </div>
            </Window>
        )}    
    <Thread />
    </div>
    )
};

export default MessagingContainer
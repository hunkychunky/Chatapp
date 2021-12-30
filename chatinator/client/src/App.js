import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
} from 'stream-chat-react'
import Auth from './components/Auth'
import MessagingContainer from './components/MessagingContainer';
import Video from './components/Video';
import '@stream-io/stream-chat-css/dist/css/index.css';
import { customStyle } from './styles/customstyles';

// const filters = { type: 'messaging' };
// const options = { state: true, presence: true, limit: 10 };
// const sort = { last_message_at: -1 };

const client = StreamChat.getInstance('q5h9xxt8m7k3');

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [channel, setChannel] = useState(null);
  const [users, setUsers] = useState(null);

  const authToken = cookies.AuthToken;

  console.log(authToken);

  useEffect( async() => {
    if(authToken){
      const {users} = await client.queryUsers({ role: 'user'})
      setUsers(users)
    }
  }, {})

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HashedPassword,
        },

        authToken
      )
        const channel = await client.channel('gaming', 'gaming-demo', {
          name: 'Mr Mujib',
        })
        setChannel(channel)
      } catch (err) {
        console.log(err);
      }
    }
  if (authToken) setupClient();

  
  return (
    <div>
     {!authToken && <Auth/>}
     {authToken && <Chat client={client} customStyles={customStyle}>
      <Channel channel = {channel}>
        <Video/>
        <MessagingContainer users={users}/>
      </Channel> 
      </Chat>}
    </div> 
  );
};

export default App;  
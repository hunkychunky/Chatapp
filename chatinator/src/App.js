import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react'
import './index.css';

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance('q5h9xxt8m7k3');

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: 'ahmad-animasaun',
            name: 'Ahmad Animasaun',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWhtYWQtYW5pbWFzYXVuIn0.TBbH9RidgqGWn3rb9ibbEocT7fhH3DOLQDilz4Ijmwo',
        );

        const channel = await client.channel('gaming', 'gaming-demo', {
          name: 'Gaming Demo',
        })
        setChannel(channel)


        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);

  if (!clientReady) return null;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel channel = {channel}>
        <Window>
          <ChannelHeader />
          <MessageList/>
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App; 
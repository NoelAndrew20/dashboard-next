import Image from 'next/image';
import React from 'react';
const ChatBtn = () => {
  return (
    <a
      href="/Chat"
      className="h-20 w-20 flex items-center justify-center fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md cursor-pointer hover:shadow-lg hover:bg-blue-700"
    >
      <Image src={"/images/svg/chat.png"} width={35} height={35} alt="chat" className='chat-icon'/>
    </a>
  );
};

export default ChatBtn;

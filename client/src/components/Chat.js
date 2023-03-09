import React from "react";
import styled from "styled-components";

const rooms = [
    "general", 
    "random", 
    "jokes", 
    "javascript"
];

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
`;

const SideBar = styled.div`
    height: 100%;
    width: 15%;
    border-right: 1px solid black;
`;

const ChatPanel = styled.div`
    height: 100;
    width: 85%;
    display: flex;
    flex-direction: column;
`;

const BodyContainer = styled.div`
    width: 100%;
    height: 75%;
    overflow: scroll;
    border-bottom: 1px solid black;
`;

const TextBox = styled.textarea`
    height: 15%;
    width: 100%;
`;

const ChannelInfo = styled.div`
    height: 10%;
    width: 100%;
    border-bottom: 1px solid black;
`;

const Row = styled.div`
    cursor: pointer;
`;

const Messages = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

function Chat(props) {
    function renderRooms(room){
        const currentChat = {
            chatName: room,
            isChannel: true,
            receiverId: "",
        }
        return(
            <row onClick = {() => props.toggleChat(currentChat)} key={room}>
                {room}
            </row>
        );
    }

    return(
        <Container>
            <SideBar>
                <h3>Channels</h3>
                {rooms.map(renderRooms)}
                <h3>All Users</h3>
                {props.allUsers.map(renderUsers)}
            </SideBar>
            <ChatPanel>
                <ChannelInfo>
                    {props.currentChat.name}
                </ChannelInfo>
                <BodyContainer>
                    {body}
                </BodyContainer>
                <TextBox
                    value={props.message}
                    onChange={props.handleMessageChange}
                    onKeyPress={handleKeyPress}
                    placeholder="say something..."
                />
            </ChatPanel>
        </Container>
    );
};

export default Chat;

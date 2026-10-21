import ChatView from "./views.js";
import Chatroom from "./chat.js";

const usernameDefault = localStorage.getItem("updateName")
  ? localStorage.getItem("updateName")
  : "anonymous";
const initialRoom = location.hash.slice(1) || "general";
const chat1 = new Chatroom(initialRoom, usernameDefault);

const chatList = "message-list";
const chatView = new ChatView(chatList);

async function domEvent(element) {
  await chat1.addChat(element.value);
}

chatView.handleEvent(domEvent);

function updataNameUP(name) {
  chat1.updateName(name);
}

function updatechatRoom(room) {
  chat1.updateRoom(room);
  chat1.getChats(data => chatView.render(data));
}

chatView.eventUpdateName(updataNameUP);
chatView.eventChatroom(updatechatRoom);
chat1.getChats(data => chatView.render(data));
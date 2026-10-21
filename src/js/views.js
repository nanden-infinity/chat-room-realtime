import { formatDistanceToNow } from "date-fns";
import { enGB } from "date-fns/locale";

export default class ChatView {
  #parentElement;
  #formUpdate;
  #formChat;
  #chatRoom;
  constructor(list) {
    this.#parentElement = document.getElementById(list);
    this.#formUpdate = document.getElementById("update-name-form");
    this.#formChat = document.getElementById("new-chat-form");
    this.#chatRoom = document.querySelector(".chat-room");
    if (this.#parentElement)
      this.#parentElement.className = "grid space-y-4 mt-4";
  }

  render(data) {
    const list = document.createElement("li");
    list.className =
      "text-slate-700  text-small p-4 px-2 bg-slate-200 rounded-md";
    const username = document.createElement("span");
    username.className = "font-bold";
    username.textContent = data.username.toUpperCase();

    const message = document.createElement("span");
    message.textContent = data.message;

    const details = document.createElement("div");
    details.className = "flex justify-between items-center";

    const room = document.createElement("p");
    room.textContent = data.room;

    const timestamp = data.created_at.toDate();
    const timeText = formatDistanceToNow(timestamp, { locale: enGB });
    const time = document.createElement("small");
    time.className = `p-2 rounded text-gray-50 ${
      timeText.includes("about") ? "bg-slate-900" : "bg-green-500"
    }`;
    time.textContent = timeText;

    details.append(room, time);
    list.append(username, document.createTextNode(" "), message, details);
    this.#parentElement?.append(list);
    return list;
  }
  handleEvent(handle) {
    if (!this.#formChat) return;

    this.#formChat.addEventListener("submit", async e => {
      e.preventDefault();
      const inputValue = e.target.querySelector("input");
      try {
        await handle(inputValue);
        inputValue.value = "";
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error.message);
      }
    });
  }
  eventUpdateName(handleUpata) {
    if (!this.#formUpdate) return;

    this.#formUpdate.addEventListener("submit", async function (e) {
      e.preventDefault();
      const inputName = new FormData(e.target).get("updateName")?.trim();
      if (!inputName) return alert("Please field the name");

      handleUpata(inputName);
      const updateMessage = document.createElement("div");
      const textMessage = document.createElement("p");
      textMessage.append(
        document.createTextNode(`Your name is update to ${inputName}`),
      );

      updateMessage.prepend(textMessage);
      this.appendChild(updateMessage);
      setTimeout(() => updateMessage.remove(), 2500);
      this.reset();
    });
  }
  eventChatroom(handleRoom) {
    if (!this.#chatRoom) return;

    this.#chatRoom.addEventListener("click", e => {
      const link = e.target.closest("a");
      if (!link || !this.#chatRoom.contains(link)) return;

      this.#chatRoom
        .querySelectorAll("a")
        .forEach(anchor => anchor.classList.remove("text-amber-400"));
      link.classList.add("text-amber-400");
      this.#parentElement?.replaceChildren();
      handleRoom(link.hash.slice(1));
    });
  }
}
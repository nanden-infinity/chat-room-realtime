import {
  dataCollection,
  addDoc,
  onSnapshot,
  Timestamp,
} from "././db_config.js";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./db_config.js";

// Adding new chat documents

// setting up a real-time listener to get new chats
// Updating the username
// Updating the room

export default class Chatroom {
  constructor(room, username = localStorage.getItem("updateName")) {
    this.room = room;
    this.username = username;
    this.chats = collection(db, "chats");
    this.unsub = null;
  }

  async addChat(message) {
    const existingChats = await getDocs(
      query(
        this.chats,
        where("room", "==", this.room),
        where("username", "==", this.username),
        where("message", "==", message),
        limit(1),
      ),
    );

    if (!existingChats.empty) return existingChats.docs[0].ref;

    const time = new Date();
    // fontmat a chat objects
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: Timestamp.fromDate(time),
    };
    // save tghe chat document
    const response = await addDoc(this.chats, chat);

    return response;
  }
  getChats(callback) {
    if (this.unsub) this.unsub();

    const roomChats = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at"),
    );

    this.unsub = onSnapshot(roomChats, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type !== "added") return;
        callback(change.doc.data());
      });
    }, this.handleError);

    return this.unsub;
  }
  updateName(username) {
    this.username = username;
    console.log(this.username);
    localStorage.setItem("updateName", username);
    console.log(username, "Name Updated");
  }
  updateRoom(room) {
    if (this.unsub) this.unsub();
    this.unsub = null;
    this.room = room;
    console.log("Room updated", room);
  }
  handleError(error) {
    console.error("Erro ao receber mensagens:", error.message);
  }
}

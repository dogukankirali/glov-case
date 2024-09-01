import axios from "axios";
import Toastify from "../Utils/Toastify";

export module MessageService {
  export function SendMessage(newMessage: Message.Message) {
    try {
      const newMessages = JSON.parse(localStorage.getItem("messages") || "[]");
      newMessages.push(newMessage);
      localStorage.setItem("messages", JSON.stringify(newMessages));
      return 200;
    } catch (error) {
      console.error(error);
      Toastify({
        title: "Error",
        subtitle: "An error occurred while sending the message.",
        type: "error",
      });
      return 500;
    }
  }

  export function GetMessages(user: User.User) {
    try {
      const messages = JSON.parse(localStorage.getItem("messages") || "[]");
      const filteredMessages = messages.filter(
        (message: Message.Message) => message.user.id === user.id
      );
      return filteredMessages;
    } catch (error) {
      console.error(error);
      Toastify({
        title: "Error",
        subtitle: "An error occurred while fetching the messages.",
        type: "error",
      });
      return [];
    }
  }

  export async function GetRandomImages(image: number) {
    try {
      const response = await axios.get(
        `https://picsum.photos/id/${image}/200/300/`,
        {
          responseType: "blob",
        }
      );
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(response.data);
      });
    } catch (error) {
      console.error(error);
      Toastify({
        title: "Error",
        subtitle: "An error occurred while fetching the images.",
        type: "error",
      });
      return null;
    }
  }

  export function DeleteMessage(id: number) {
    try {
      const currentMessages = JSON.parse(
        localStorage.getItem("messages") || "[]"
      );
      const filteredMessages = currentMessages.filter(
        (message: Message.Message) => message.id !== id
      );
      localStorage.setItem("messages", JSON.stringify(filteredMessages));
      return 200;
    } catch (error) {
      console.error(error);
      Toastify({
        title: "Error",
        subtitle: "An error occurred while deleting the message.",
        type: "error",
      });
      return 500;
    }
  }
}

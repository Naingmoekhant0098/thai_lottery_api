import { SendToDeviceParams, SendToTopicParams } from "./notification.type";
import admin from "firebase-admin";
const notificationRepository: {
  sendToDevice: (params: SendToDeviceParams) => Promise<string>;
  sendToTopic: (params: SendToTopicParams) => Promise<string>;
  subscribeToTopic: (token: string, topic: string) => Promise<any>;
  unsubscribeFromTopic: (token: string, topic: string) => Promise<any>;
} = {
  async sendToDevice({ token, title, body, data }: SendToDeviceParams) {
    const message: admin.messaging.Message = {
      token,
      notification: {
        title,
        body,
      },

      data,
    };

    return await admin.messaging().send(message);
  },
  async sendToTopic({ topic, title, body, data }: SendToTopicParams) {
    const message: admin.messaging.Message = {
      topic,

      notification: {
        title,
        body,
      },

      data,
    };

    return await admin.messaging().send(message);
  },
  async subscribeToTopic(token: string, topic: string) {
    return await admin.messaging().subscribeToTopic(token, topic);
  },
  async unsubscribeFromTopic(token: string, topic: string) {
    return await admin.messaging().unsubscribeFromTopic(token, topic);
  },
};
export default notificationRepository;

import notificationRepository from "./notification.repository";
import { SendToDeviceParams, SendToTopicParams } from "./notification.type";
const notificationService = {
  async sendToDevice(payload: SendToDeviceParams) {
    return await notificationRepository.sendToDevice(payload);
  },
  async sendToTopic(payload: SendToTopicParams) {
    return await notificationRepository.sendToTopic(payload);
  },
  async subscribeToTopic(token: string, topic: string) {
    return await notificationRepository.subscribeToTopic(token, topic);
  },
  async unsubscribeFromTopic(token: string, topic: string) {
    return await notificationRepository.unsubscribeFromTopic(token, topic);
  },
};
export default notificationService;

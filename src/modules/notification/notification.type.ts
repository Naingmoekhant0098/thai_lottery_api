export interface SendToDeviceParams {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface SendToTopicParams {
  topic: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}


 
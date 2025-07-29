export {};

declare global {
  interface Window {
    api: {
      sendNotification: (title: string, body: string) => void;
    };
  }
}

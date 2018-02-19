import { Client as PostmarkClient } from "postmark";

class Client {
  constructor(token) {
    this.client = new PostmarkClient(token);
  }

  sendEmail(payload, callback) {
    if (process.env.ENVIRONMENT === "staging") {
      // To avoid spamming people with emails sent on staging servers,
      // we override the recipient, and put them in the subject instead.
      payload.Subject = `'${payload.To}': ${payload.Subject}`;
      payload.To = "mailmerge@example.com";
    }
    this.client.sendEmail(payload, (error, result) => {
      if (error) {
        console.error(`Unable to send via postmark: ${JSON.stringify(error)}`);
      }
      if (callback) {
        callback(error, result);
      }
    });
  }
}

export default Client;

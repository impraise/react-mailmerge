describe("email client", () => {
  let mockClient, mockSendEmail, Client, environmentEnv;

  beforeEach(() => {
    jest.mock("postmark", () => {
      mockClient = jest.fn().mockReturnThis();
      mockSendEmail = jest.fn((payload, callback) =>
        callback(null, { origin: "test" })
      );
      mockClient.sendEmail = mockSendEmail;
      return { Client: jest.fn(() => mockClient) };
    });
    Client = require("./email").default;
    environmentEnv = process.env.ENVIRONMENT;
  });

  afterEach(() => {
    process.env.ENVIRONMENT = environmentEnv;
  });

  it("does not override properties in production environment", () => {
    const payload = {
      To: "foo@example.com",
      Subject: "Test"
    };
    process.env.ENVIRONMENT = "production";
    const client = new Client("token");
    client.sendEmail(payload);

    expect(mockSendEmail).toHaveBeenCalledWith(
      {
        To: "foo@example.com",
        Subject: "Test"
      },
      expect.any(Function)
    );
  });

  it("override properties in staging environment", () => {
    const payload = {
      To: "foo@example.com",
      Subject: "Test"
    };
    process.env.ENVIRONMENT = "staging";
    const client = new Client("token");
    client.sendEmail(payload);

    expect(mockSendEmail).toHaveBeenCalledWith(
      {
        To: "mailmerge@example.com",
        Subject: "'foo@example.com': Test"
      },
      expect.any(Function)
    );
  });
});

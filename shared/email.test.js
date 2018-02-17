describe("email client", () => {
  let consoleErr, environmentEnv, mockClient, mockSendEmail, Client;

  beforeEach(() => {
    consoleErr = global.console.error;
    environmentEnv = process.env.ENVIRONMENT;

    jest.mock("postmark", () => {
      mockClient = jest.fn().mockReturnThis();
      mockSendEmail = jest.fn((payload, callback) =>
        callback(null, { origin: "test" })
      );
      mockSendEmail.returnError = err => {
        mockSendEmail.mockImplementation((payload, callback) => callback(err));
      };
      mockClient.sendEmail = mockSendEmail;
      return { Client: jest.fn(() => mockClient) };
    });
    Client = require("./email").default;
  });

  afterEach(() => {
    global.console.error = consoleErr;
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

  it("logs errors", () => {
    const payload = {
      To: "foo@example.com",
      Subject: "Test"
    };
    process.env.ENVIRONMENT = "staging";
    global.console.error = jest.fn();
    mockSendEmail.returnError({ message: "whoops" });
    const client = new Client("token");
    client.sendEmail(payload);

    expect(mockSendEmail).toHaveBeenCalledWith(
      {
        To: "mailmerge@example.com",
        Subject: "'foo@example.com': Test"
      },
      expect.any(Function)
    );
    expect(global.console.error).toHaveBeenCalledWith(
      "Unable to send via postmark: whoops"
    );
  });
});

import MockContext from "shared/context";

describe("userInvitation handler", () => {
  let mockClient, mockSendEmail, handle;

  beforeEach(() => {
    jest.mock("postmark", () => {
      mockClient = jest.fn().mockReturnThis();
      mockSendEmail = jest.fn((payload, callback) =>
        callback(null, { origin: "test" })
      );
      mockClient.sendEmail = mockSendEmail;
      return { Client: jest.fn(() => mockClient) };
    });
    global.console.log = jest.fn(); // disable logging in tests
    handle = require("./index").handle;
  });

  it("returns an error when called without arguments", () => {
    const data = {};
    const context = new MockContext();
    const callback = jest.fn();
    handle(data, context, callback);

    const errors = callback.mock.calls[0][0];
    expect(errors).toHaveLength(4);
    const messages = errors.map(error => error.message);
    expect(messages[0]).toContain("baseUrl");
    expect(messages[1]).toContain("user");
    expect(messages[2]).toContain("invitedBy");
    expect(messages[3]).toContain("group");
  });

  it("sends an email when called with correct arguments", () => {
    const data = {
      baseUrl: "example-website.com",
      user: {
        email: "foo@example.com",
        invitationToken: "abc123"
      },
      invitedBy: {
        name: "Sam Smith"
      },
      group: {
        name: "Cool Kids"
      }
    };
    const callback = jest.fn();
    const context = new MockContext();
    handle(data, context, callback);

    expect(mockSendEmail).toHaveBeenCalledWith(
      {
        From: "hi@example-website.com",
        To: "foo@example.com",
        Subject: "You've been invited to join Cool Kids on Example Website!",
        TextBody: expect.any(String),
        HtmlBody: expect.any(String),
        Tag: "invite"
      },
      expect.any(Function)
    );
    expect(callback).toHaveBeenCalled();
  });
});

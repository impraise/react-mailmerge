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

    const errorsText = callback.mock.calls[0][0];
    expect(errorsText.startsWith("Validation errors: ")).toBe(true);
    expect(errorsText).toContain("baseUrl");
    expect(errorsText).toContain("user");
    expect(errorsText).toContain("invitedBy");
    expect(errorsText).toContain("group");
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

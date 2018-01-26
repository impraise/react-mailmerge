import MockContext from "shared/context";

describe("userReminder handler", () => {
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
    expect(errors).toHaveLength(3);
    expect(errors[0].message).toContain("baseUrl");
    expect(errors[1].message).toContain("user");
    expect(errors[2].message).toContain("event");
  });

  it("sends an email when called with correct arguments", () => {
    const data = {
      baseUrl: "example-website.com",
      user: {
        email: "foo@example.com",
        firstName: "Test",
        locale: "en",
        timeZone: "America/New_York",
      },
      event: {
        id: 1,
        title: "Pool Party",
        startAt: "2017-02-01T10:00:00Z",
        endAt: "2017-02-01T22:00:00Z",
      }
    };
    const context = new MockContext();
    const callback = jest.fn();
    handle(data, context, callback);

    expect(mockSendEmail).toHaveBeenCalledWith(
      {
        From:  "hi@example-website.com",
        To: "foo@example.com",
        Subject: "Looking forward to seeing you at Pool Party!",
        TextBody: expect.any(String),
        HtmlBody: expect.any(String),
        Tag: "reminder"
      },
      expect.any(Function)
    );
    expect(callback).toHaveBeenCalled();
  });
});

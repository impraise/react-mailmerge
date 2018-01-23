import React from "react";
import { shallow } from "enzyme";
import { mountWithIntl } from "enzyme-react-intl";

import Template from "./template";
import textTemplate from "./template.text";

describe("userReminder template", () => {
  const data = {
    baseUrl: "example-website.com",
    user: {
      firstName: "Test",
      email: "foo@example.com",
      locale: "en",
      timeZone: "America/New_York",
    },
    event: {
      id: 2,
      name: "Lemonade Stand",
      startAt: "2017-02-01T22:00:00Z",
    }
  };

  it("renders without crashes", () => {
    const wrapper = shallow(
      <Template {...data} />
    );

    expect(wrapper.exists()).toBe(true);
  });
  it("displays the review information", () => {
    const wrapper = mountWithIntl(
      <Template {...data} />
    );

    expect(wrapper.text()).toContain("Test,");
    expect(wrapper.text()).toContain("RSVP Now");
  });
  it("includes a link with the activation URL", () => {
    const dataWithInvitation = {
      ...data,
      user: {
        ...data.user,
        invitationToken: "xyz1234",
      }
    }

    const wrapper = mountWithIntl(
      <Template {...dataWithInvitation} />
    );

    expect(wrapper.html()).toContain("xyz1234");
    expect(wrapper.text()).toContain(
      "Register and RSVP Now"
    );
  });
  it("renders the timezone correctly", () => {
    const wrapper = mountWithIntl(
      <Template {...data} />
    );

    expect(wrapper.text()).toContain("February 1 at 5:00 PM EST");
  });
});

describe("selfAssessmentReminder text template", () => {
  const data = {
    baseUrl: "example-website.com",
    user: {
      firstName: "Test",
      email: "foo@example.com",
      locale: "en",
      timeZone: "America/New_York",
    },
    event: {
      id: 2,
      name: "Lemonade Stand",
      startAt: "2017-02-01T22:00:00Z",
    }
  };

  it("renders timezone corectly", () => {
    const text = textTemplate(data);

    expect(text).toContain("February 1 at 5:00 PM EST");
  });
});

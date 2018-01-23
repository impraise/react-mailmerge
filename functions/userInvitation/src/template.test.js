import React from "react";
import { shallow, mount } from "enzyme";

import Template from "./template";

describe("userInvitation template", () => {
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

  it("renders without crashes", () => {
    const wrapper = shallow(
      <Template {...data} />
    );

    expect(wrapper.exists()).toBe(true);
  });
  it("displays the organization name", () => {
    const wrapper = mount(
      <Template {...data} />
    );

    expect(wrapper.text()).toContain("Example");
  });
  it("includes a link with the activation URL", () => {
    const wrapper = mount(
      <Template {...data} />
    );

    const invitationLinks = wrapper.find(
      'a[href="https://example-website.com/invitations/abc123"]'
    );
    expect(invitationLinks.exists()).toBe(true);
    expect(invitationLinks.at(0).text()).toBe("Example Website!");
    expect(invitationLinks.at(1).text()).toBe("Accept your invitation");
  });
});

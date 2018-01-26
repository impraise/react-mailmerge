import React from "react";
import { storiesOf } from "@storybook/react";
import Template from "./src/template";
import textTemplate from "./src/template.text";

storiesOf("userInvitation", module)
  .add("HTML", () => {
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
    return <Template {...data} />;
  })
  .add("text", () => {
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
    return <pre>{textTemplate(data)}</pre>;
  });

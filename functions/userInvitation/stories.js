import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";
import Template from "./src/template";
import textTemplate from "./src/template.text";

const dataFactory = () => ({
  baseUrl: text("baseUrl", "example-website.com"),
  user: {
    email: "foo@example.com",
    name: text("user name", "Frodo Baggins"),
    invitationToken: text("token", "secondbreakfast")
  },
  invitedBy: {
    name: text("invitedBy name", "Gandalf")
  },
  group: {
    name: text("group name", "Fellowship of the Ring")
  }
});

storiesOf("userInvitation", module)
  .addDecorator(withKnobs)
  .add("HTML", () => {
    const data = dataFactory();
    return <Template {...data} />;
  })
  .add("text", () => {
    const data = dataFactory();
    return <pre>{textTemplate(data)}</pre>;
  });

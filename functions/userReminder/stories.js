import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, date } from "@storybook/addon-knobs/react";
import { IntlProvider } from "react-intl";
import Template from "./src/template";
import textTemplate from "./src/template.text";

function isoDate(name, defaultValue) {
  const stringTimestamp = date(name, new Date(defaultValue));
  return new Date(stringTimestamp).toISOString();
}

const dataFactory = () => ({
  baseUrl: text("baseUrl", "example-website.com"),
  user: {
    email: "foo@example.com",
    firstName: text("user firstName", "Frodo"),
    locale: "en",
    timeZone: text("user timeZone", "America/New_York")
  },
  event: {
    id: 1,
    title: text("event title", "Bilbo's Farewell Birthday Party"),
    startAt: isoDate("event startAt", "3001-10-22T11:00:00-05:00"),
    endAt: isoDate("event endAt", "3001-10-22T22:00:00-05:00")
  }
});

storiesOf("userReminder", module)
  .addDecorator(withKnobs)
  .add("HTML", () => {
    const data = dataFactory();
    return (
      <IntlProvider locale={data.user.locale}>
        <Template {...data} />
      </IntlProvider>
    );
  })
  .add("text", () => {
    const data = dataFactory();
    return <pre>{textTemplate(data)}</pre>;
  });

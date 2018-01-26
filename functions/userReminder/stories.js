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

storiesOf("userReminder", module)
  .addDecorator(withKnobs)
  .add("HTML", () => {
    const data = {
      baseUrl: text("baseUrl", "example-website.com"),
      user: {
        email: text("user email", "foo@example.com"),
        firstName: text("user firstName", "Alice"),
        locale: "en",
        timeZone: text("user timeZone", "America/New_York"),
      },
      event: {
        id: 1,
        title: text("event title", "Pool Party"),
        startAt: isoDate("event startAt", "2017-02-01T10:00:00Z"),
        endAt: isoDate("event endAt", "2017-02-01T22:00:00Z"),
      }
    };
    return (
      <IntlProvider locale={data.user.locale}>
        <Template {...data} />
      </IntlProvider>
    );
  })
  .add("text", () => {
    const data = {
      baseUrl: "example-website.com",
      user: {
        email: "foo@example.com",
        firstName: "Test",
        locale: "en",
        timeZone: "America/New_York"
      },
      event: {
        id: 1,
        title: "Pool Party",
        startAt: "2017-02-01T10:00:00Z",
        endAt: "2017-02-01T22:00:00Z"
      }
    };
    return <pre>{textTemplate(data)}</pre>;
  });

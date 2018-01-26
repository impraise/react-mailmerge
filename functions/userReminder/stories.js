import React from "react";
import { storiesOf } from "@storybook/react";
import { IntlProvider } from "react-intl";
import Template from "./src/template";
import textTemplate from "./src/template.text";

storiesOf("userReminder", module)
  .add("HTML", () => {
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

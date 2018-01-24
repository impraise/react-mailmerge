import React from "react";
import PropTypes from "prop-types";
import { FormattedDate, FormattedTime } from "react-intl";
import { Item } from "react-html-email";
import EmailWrapper from "shared/components/EmailWrapper";
import CallToAction from "shared/components/CallToAction";
import generateUrl from "shared/constants/url";

const Template = ({ baseUrl, user, event }) => {
  let eventUrl = generateUrl(
    baseUrl,
    `events/${event.id}`,
    user.invitationToken
  );
  let eventCta = user.invitationToken ? "Register and RSVP Now" : "RSVP Now";

  return (
    <EmailWrapper title="Don't forget to RSVP!">
      <Item>{user.firstName},</Item>
      <Item>
        Are you attending {event.title}? It&apos;s starting on
        <b>
          <FormattedDate
            value={event.startAt}
            timeZone={user.timeZone}
            month="long"
            day="numeric"
          />
          {" at "}
          <FormattedTime
            value={event.startAt}
            timeZone={user.timeZone}
            timeZoneName="short"
          />
        </b>
      </Item>
      <CallToAction url={eventUrl} text={eventCta} />
    </EmailWrapper>
  );
};

Template.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

export default Template;

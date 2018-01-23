import globalFormatMessage from "format-message";
import generateUrl from "shared/constants/url";
import { footer } from "shared/constants/textVersion";

const textTemplate = ({ baseUrl, user, event }) => {
  const formatMessage = globalFormatMessage.namespace();
  formatMessage.setup({
    locale: user.locale,
    formats: {
      date: {
        local: {
          month: "long",
          day: "numeric",
          timeZone: user.timeZone
        }
      },
      time: {
        local: {
          hour: "numeric",
          minute: "2-digit",
          timeZone: user.timeZone,
          timeZoneName: "short"
        }
      }
    }
  });

  const eventUrl = generateUrl(
    baseUrl,
    `events/${event.id}`,
    user.invitationToken
  );
  const eventCta = user.invitationToken ? "Register and RSVP Now" : "RSVP Now";

  return `
${user.firstName},

${formatMessage(
    "Are you attending {event}? It's starting on {startAt, date, local} at {startAt, time, local}.",
    {
      event: event.title,
      startAt: new Date(event.startAt)
    }
  )}

${eventCta} by visiting this link:
${eventUrl}

${footer}`.trim();
};

export default textTemplate;

import * as site from "shared/constants/site";
import { footer } from "shared/constants/textVersion";

const textTemplate = ({ baseUrl, user, invitedBy, group }) => {
  const url = `https://${baseUrl}/invitations/${user.invitationToken}`;
  const greeting = user.name ? `Hey, ${user.name}!` : "Hey!";

  return `
${greeting}

You've been invited to join ${group.name} on ${
    site.name
  }! To accept your invitation, visit this webpage:

${url}

${footer}`.trim();
};

export default textTemplate;

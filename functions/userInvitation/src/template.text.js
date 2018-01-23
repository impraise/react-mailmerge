import { footer } from "shared/constants/textVersion";

const textTemplate = ({ baseUrl, user, invitedBy, group }) => {
  const url = `https://${baseUrl}/invitations/${user.invitationToken}`;
  const greeting = user.name ? `Hey, ${user.name}!` : "Hey!";

  return `
${greeting}

You've been invited to join ${group.name} on Example Website! To accept your invitation, visit this webpage:

${url}

${footer}`.trim();
}

export default textTemplate;

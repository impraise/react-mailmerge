const generateUrl = (baseUrl, path, invitationToken) => {
  let finalPath = invitationToken
    ? `invitations/${invitationToken}?after=${encodeURIComponent("/" + path)}`
    : path;

  return `https://${baseUrl}/${finalPath}`;
};

export default generateUrl;

import React from "react";
import PropTypes from "prop-types";
import { Box, Item, A } from "react-html-email";
import EmailWrapper from "shared/components/EmailWrapper";
import CallToAction from "shared/components/CallToAction";
import { linkColor } from "shared/constants/colors";
import * as site from "shared/constants/site";

const Template = ({ baseUrl, user, invitedBy, group }) => {
  const url = `https://${baseUrl}/invitations/${user.invitationToken}`;
  return (
    <EmailWrapper title={`You're invited to ${site.name}!`}>
      <Item>
        <Box cellPadding={5}>
          <Item>Hey!</Item>
          <Item>
            ${invitedBy.name} has invited you to join the <b>{group.name}</b>
            group on{" "}
            <A href={url} color={linkColor} textDecoration="none">
              {site.name}!
            </A>
          </Item>
          <Item>
            <b>{site.name}</b> is the best place to frobnicate all your
            whatsits, and it&apos;s free! We&apos;d love to get you on board!
          </Item>
          <CallToAction url={url} text="Accept your invitation" />
        </Box>
      </Item>
    </EmailWrapper>
  );
};

Template.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  invitedBy: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired
};

export default Template;

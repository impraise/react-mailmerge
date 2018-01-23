import React from "react";
import { Box, Item } from "react-html-email";
import PropTypes from "prop-types";

const EmailContent = ({ children }) => (
  <Box
    align="center"
    valign="middle"
    cellPadding={30}
    bgcolor="#ffffff"
    className="main-content"
    style={{ borderRadius: "4px", maxWidth: "600px" }}
  >
    <Item>
      <Box cellPadding={5}>{children}</Box>
    </Item>
  </Box>
);

EmailContent.propTypes = {
  children: PropTypes.node.isRequired
};

export default EmailContent;

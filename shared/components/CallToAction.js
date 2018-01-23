import React from "react";
import PropTypes from "prop-types";
import { Box, Item, A } from "react-html-email";
import { linkColor } from "../constants/colors";

const CallToAction = ({ url, text }) => [
  <Item key={1} />,
  <Item key={2} />,
  <Item key={3}>
    <Box
      align="center"
      valign="middle"
      bgcolor={linkColor}
      className="button"
      cellPadding={15}
      style={{ borderRadius: "4px" }}
    >
      <Item align="center">
        <A
          className="button-link"
          href={url}
          color="white"
          textDecoration="none"
        >
          {text}
        </A>
      </Item>
    </Box>
  </Item>,
  <Item key={4} />,
  <Item key={5} />
];

CallToAction.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default CallToAction;

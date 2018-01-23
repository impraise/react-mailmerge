import React from "react";
import { Email, Item } from "react-html-email";
import PropTypes from "prop-types";
import Header from "shared/components/Header";
import EmailContent from "shared/components/EmailContent";
import Footer from "shared/components/Footer";
import { textColor, emailBackgroundColor } from "shared/constants/colors";
import { headCSS } from "shared/constants/css";

const fontFamily = "Helvetica, Arial, sans-serif";

const EmailWrapper = ({ title, children }) => (
  <Email
    title={title}
    bgcolor={emailBackgroundColor}
    headCSS={headCSS}
    width="100%"
    bodyStyle={{
      fontFamily: fontFamily,
      lineHeight: "150%",
      color: textColor
    }}
  >
    <Item>
      <Header />
    </Item>
    <Item>
      <EmailContent>{children}</EmailContent>
    </Item>
    <Item>
      <Footer />
    </Item>
  </Email>
);

EmailWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default EmailWrapper;

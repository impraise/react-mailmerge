import React from "react";
import { Box, Item, Image } from "react-html-email";
import logo from "../images/logo.png";
import { name } from "shared/constants/site";

const Header = () => (
  <Box align="center" valign="middle" cellPadding={25}>
    <Item>
      <Image src={logo} alt={name} width={320} height={168} />
    </Item>
  </Box>
);

export default Header;

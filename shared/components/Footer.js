import React from "react";
import { Box, Item, A } from "react-html-email";
import { footerTextColor } from "shared/constants/colors";
import * as site from "shared/constants/site";

const Footer = () => (
  <Box
    className="footer"
    align="center"
    cellPadding={10}
    style={{ maxWidth: "600px" }}
  >
    <Item />
    <Item>
      <table
        className="legalese"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        border={0}
      >
        <tbody>
          <tr>
            <td>
              <A
                href={`https://${site.baseUrl}`}
                color={footerTextColor}
                textDecoration="none"
              >
                {site.name}
              </A>{" "}
              &copy; {new Date().getFullYear()}
            </td>
          </tr>
        </tbody>
      </table>
    </Item>
    <Item />
  </Box>
);

export default Footer;

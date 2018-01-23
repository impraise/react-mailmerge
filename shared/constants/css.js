import { linkVisitedColor, footerTextColor } from "./colors";

export const headCSS = `
  * {
    font-size: 14px;
  }
  .footer a, .footer td {
    font-size: 12px;
    color: ${footerTextColor};
  }
  @media only screen and (max-width: 600px) {
    img {
      max-width: 600px !important;
      width: 100% !important;
      height: auto !important;
    }
    .main-content {
      border-radius: 0 !important;
    }
    .legalese td {
      display: block !important;
      text-align: center !important;
      padding: 5px;
    }
  }
  a:hover {
    text-decoration: underline !important;
  }
  .button a:hover {
    text-decoration: none !important;
  }
  a:visited {
    color: ${linkVisitedColor};
  }
`.trim();

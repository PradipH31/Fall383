import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <Container maxWidth="lg">
        <Box textAlign="Center" pt={{ xs: 1, sm: 1 }} pb={{ xs: 1, sm: 0 }}>
          <Link
            href="https://twitter.com/envoc"
            color="inherit"
            borderRight={1}
            borderLeft={1}
            paddingLeft={1}
            paddingRight={1}
          >
            <TwitterIcon />
          </Link>
          <Link
            href="https://www.facebook.com/Envoc/"
            color="inherit"
            borderRight={1}
            borderLeft={1}
            paddingLeft={1}
            paddingRight={1}
          >
            <FacebookIcon />
          </Link>
          <Link
            href="https://www.linkedin.com/company/envoc/"
            color="inherit"
            borderRight={1}
            borderLeft={1}
            paddingLeft={1}
            paddingRight={1}
          >
            <LinkedInIcon />
          </Link>
          <Link
            href="mailto:383@envoc.com"
            color="inherit"
            borderRight={1}
            borderLeft={1}
            paddingLeft={1}
            paddingRight={1}
          >
            <EmailIcon />
          </Link>
          <Link
            href="tel:+12253845549"
            color="inherit"
            borderRight={1}
            borderLeft={1}
            paddingLeft={1}
            paddingRight={1}
          >
            <PhoneForwardedIcon />
          </Link>
          <p borderRight={1} borderLeft={1}>
            {" "}
            Food To Go &reg; {new Date().getFullYear}{" "}
          </p>
        </Box>
      </Container>
    </div>
  );
}

export default Footer;

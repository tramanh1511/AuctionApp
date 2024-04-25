import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import bgimg from "../../assets/images/banner.jpg";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/Styles/Landing/Landing.css";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import LogoutIcon from "@mui/icons-material/Logout";
import Layout from "../layout/Layout";
import AuctionList from "../auction/auctionList";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}



export default function BackToTop(props) {
  const match = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const signOut = useSignOut();

  const [pkgId, setPkgId] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    signOut();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?packagesId=${pkgId}`);
  };

  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();

  return (
    <React.Fragment>
      <Box>
        <Box
          sx={{
            backgroundImage: `url(${bgimg})`,
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              textAlign: "center",
              backgroundColor: "tranparent",
              marginTop: "-25px",
            }}
          >
            <Typography
              sx={{
                fontSize: "100px",
                color: "#f1f2ec",
                padding: "0",
              }}
            >
              Auction
            </Typography>
            <i style={{ fontSize: "20px", padding: "0", color: "#f1f2ec" }}>
              Hệ thống đấu giá trực tuyến
            </i>
          </div>
        </Box>
        <Box
          sx={{
            minHeight: "30vh",
            background: "#222831",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              padding: 2,
              background: "#222831",
              mt: 1,
              boxShadow: "none",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#EEEEEE",
                mb: 4,
              }}
            >
              Tìm kiếm đấu giá
            </Typography>
            <Stack sx={{ alignItems: "center" }}>
              <FormHelperText sx={{ width: `${match ? "300px" : "570px"}` }}>
              </FormHelperText>
              <form onSubmit={handleSubmit}>
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{
                    mb: 2,
                    justifyContent: "center",
                    width: `${match ? "300px" : "570px"}`,
                  }}
                >
                  <TextField
                    required
                    placeholder="Tìm kiếm"
                    onChange={(e) => {
                      setPkgId(e.target.value);
                    }}
                    value={pkgId}
                    sx={{
                      width: "100%",
                      ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#222831",
                      },
                    }}
                  >
                    {" "}
                  </TextField>
                  <Button
                    id="button"
                    type="submit"
                    variant="contained"
                    sx={{
                      margin: 0,
                      width: 130,
                    }}
                  >
                    Tìm kiếm
                  </Button>
                </Stack>
              </form>
            </Stack>
            <Stack>
              Show các đấu giá ở đây
              <AuctionList></AuctionList>
            </Stack>
          </Paper>
        </Box>
      </Box>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

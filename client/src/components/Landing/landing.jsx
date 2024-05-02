import * as React from "react";
import Typography from "@mui/material/Typography";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
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

  const [auctionId, setAuctionId] = React.useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${auctionId}`);
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
            backgroundSize: "cover",
          }}
        >
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
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Search Auction
            </Typography>
            <Stack sx={{ alignItems: "center" }}>
              <FormHelperText sx={{ width: `${match ? "300px" : "400px"}` }}>
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
                    placeholder="Searching..."
                    onChange={(e) => {
                      setAuctionId(e.target.value);
                    }}
                    value={auctionId}
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
                    Search
                  </Button>
                </Stack>
              </form>
            </Stack>
            <Stack>
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

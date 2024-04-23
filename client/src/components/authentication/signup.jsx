import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";

import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import EastIcon from "@mui/icons-material/East";
import Layout from '../../components/layout/Layout';
import {
  Button, TextField, Typography, Grid, Card, Box, CircularProgress, FormControl,
} from '@mui/material';


export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    axios
      .post("http://localhost:3000/api/v1/users/signup", {
        email,
        name,
        citizenId,
        phoneNumber,
        address,
        password,
      })
      .then((result) => {
        if (result.status === 201) {
          navigate("/login");
        }
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div>
      <Layout>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', marginTop: '5rem' }}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: '500' }}>
                Đăng ký
              </Typography>
              <Box sx={{ mt: 3 }}>
                <form onSubmit={handleSubmit}>
                  <FormControl>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Họ tên"
                          type="text"
                          fullWidth
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Số CMND"
                          type="text"
                          fullWidth
                          value={citizenId}
                          onChange={(e) => setCitizenId(e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          type="email"
                          fullWidth
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Mật khẩu"
                          type="password"
                          fullWidth
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Số điện thoại"
                          type="text"
                          fullWidth
                          value={phoneNumber}
                          onChange={(e) => setPhone(e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isRegisterLoading}>
                        {isRegisterLoading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
                      </Button>
                    </Box>

                  </FormControl>
                </form>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    Đã có tài khoản?
                    {' '}
                    <Link to="/login">Đăng nhập</Link>
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Layout>
      <CssBaseline>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#222831",
          }}
        >
          <Paper
            sx={{
              width: "600px",
              textAlign: "center",
              padding: 2,
              backgroundColor: "#faf6ed",
            }}
          >
            <i
              style={{
                fontFamily: "arial",
                fontWeight: "bold",
                fontSize: "45px",
                color: "#222831",
              }}
            >
              Auction app
            </i>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                mt: 4,
                fontWeight: "bold",
                color: "#222831",
                fontSize: "30px",
              }}
            >
              Đăng ký
            </Typography>
            <form style={{ marginBottom: "12px" }} onSubmit={handleSubmit}>
              <TextField
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                label="Địa chỉ email"
                sx={{
                  mb: 3,
                  ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#467061",
                  },
                  ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: "#F8F6E3",
                  },
                }}
              ></TextField>
              <TextField
                fullWidth
                onChange={(e) => setName(e.target.value)}
                label="Tên người dùng"
                sx={{
                  mb: 3,
                  ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#467061",
                  },
                  ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: "#F8F6E3",
                  },
                }}
              ></TextField>
              <TextField
                fullWidth
                onChange={(e) => setPhoneNumber(e.target.value)}
                label="Số điện thoại"
                sx={{
                  mb: 3,
                  ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#467061",
                  },
                  ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: "#F8F6E3",
                  },
                }}
              ></TextField>
              <TextField
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
                label="Địa chỉ thường trú"
                sx={{
                  mb: 3,
                  ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#467061",
                  },
                  ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: "#F8F6E3",
                  },
                }}
              ></TextField>
              <FormControl sx={{ mb: 3 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Mật khẩu
                </InputLabel>
                <OutlinedInput
                  onChange={(e) => setPassword(e.target.value)}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl sx={{ mb: 3 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  Xác nhận mật khẩu
                </InputLabel>
                <OutlinedInput
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="outlined-adornment-confirm-password"
                  type="password"
                  label="Confirm Password"
                />
              </FormControl>
              {error && <Alert severity="error">{error}</Alert>}
              <Button id="button" variant="contained" fullWidth type="submit">
                Đăng ký
              </Button>
            </form>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 3,
                mt: 3,
                justifyContent: "center",
                ml: -3,
                alignItems: "center",
              }}
            >
              <EastIcon sx={{ fontSize: "20px" }} />
              <Typography>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Đã có tài khoản? Đăng nhập ngay
                </Link>
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </CssBaseline>
    </div>
  );
}

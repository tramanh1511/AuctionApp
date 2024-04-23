import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button, TextField, Typography, Grid, Card, Box,
} from '@mui/material';
import React, { Component } from 'react'
import Layout from '../layout/Layout';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/users/login", { email, password })
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          if (
            signIn({
              token: result.data.token,
              expiresIn: 480,
              tokenType: "Bearer",
              authState: {
                data: result.data.user,
              },
            })
          ) {
            navigate("/menu");
          }
          setError("");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  return (
    <Layout>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', marginTop: '5rem' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: '500' }}>
              Đăng nhập
            </Typography>
            <Box sx={{ mt: 3 }}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
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
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Đăng nhập
                  </Button>
                </Box>
              </form>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Chưa có tài khoản?
                  {' '}
                  <RouterLink to="/signup">Đăng ký</RouterLink>
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Login;

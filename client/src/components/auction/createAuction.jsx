import { useState } from "react";
import Layout from "../layout/Layout";
import React from "react";
import { Button, TextField, Typography, Grid, Card, Box, } from '@mui/material';
import axios from "axios";

export default function createAuction() {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [initPrice, setInitPrice] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/auction/", { category, title, description, imageUrl, initPrice })
            .then((result) => {
                if (result.status === 201) {
                    window.alert("create success");
                }
            })
            .catch((e) => {
                setError(e.response.data.message);
                console.log(e.response.data.message)
            })
    }
    return (
        <Layout>
            <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', marginTop: '5rem' }}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Card sx={{ padding: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: '500' }}>
                            Create Auction
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Category"
                                            type="text"
                                            fullWidth
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Title"
                                            type="text"
                                            fullWidth
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Description"
                                            type="text"
                                            fullWidth
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Init Price"
                                            type="text"
                                            fullWidth
                                            value={initPrice}
                                            onChange={(e) => setInitPrice(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="imageUrl"
                                            type="Url"
                                            fullWidth
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 3 }}>
                                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                                        Create
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Avatar,
    Paper,
    CircularProgress
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

const Materials = () => {
    const { id } = useParams();
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/materials/allMaterials/${id}`)
            .then((result) => {
                setMaterials(result.data.allMaterials);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Server Error');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Grid container spacing={2}>
                {materials.map((material) => (
                    <Grid item key={material._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                                    <Avatar alt="Teacher Image" src={material.teacher?.imageUrl} style={{ width: 100, height: 100 }} />
                                </Box>
                                {material.contentType === 'document' ? (
<Paper elevation={3} style={{ padding: 10 }}>
                                   <Box display="flex" alignItems="center" mb={2}>
                                       <BookIcon style={{ fontSize: 50, marginRight: 10 }} />
                                       <Typography variant="subtitle1">{material.name}</Typography>
                                   </Box>
                                   <Box width="100%" height={400}>
                                       <embed src={material.contentUrl} type="application/pdf" style={{ width: '100%', height: '100%' }} />
                                   </Box>
                               </Paper>
                                ) : (
                                    <Box>
                                        <Typography variant="subtitle1">{material.name}</Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Materials;

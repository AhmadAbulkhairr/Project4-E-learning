import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Button,
    CircularProgress,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';

const Course = () => {
    const { id } = useParams();
    const { token, user } = useContext(UserContext);
    const [course, setCourse] = useState(null);
    const [review, setReview] = useState({
        review: '',
        reviewerName: user.name 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/courses/course/${id}`)
            .then((result) => {
                setCourse(result.data.result);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Server Error');
                setLoading(false);
            });
    }, [id]);

    const handleReviewChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const createNewReview = async () => {
        try {
            await axios.post(`http://localhost:5000/courses/review/${id}`, review, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.reload();
        } catch (error) {
            console.error('Failed to add review:', error);
        }
    };

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
            <Typography variant="h4">{course.name}</Typography>
            <Typography variant="subtitle1">Price: {course.price}</Typography>
            <Typography variant="subtitle1">Teacher: {course.teacher.user.name}</Typography>
            <Typography variant="subtitle1">Grade: {course.teacher.grade.name}</Typography>
            <Typography variant="subtitle1">Subject: {course.teacher.subject.name}</Typography>
            <Box mt={2}>
                {token && (
                    <Box>
                        <Typography variant="h6">Add Your Review</Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="review"
                                name="review"
                                label="Review"
                                multiline
                                rows={4}
                                value={review.review}
                                onChange={handleReviewChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={createNewReview}
                            style={{ marginTop: '1rem' }}
                        >
                            Submit Review
                        </Button>
                    </Box>
                )}
            </Box>
            <Box mt={4}>
                <Typography variant="h6">Reviews</Typography>
                {course.reviews.length > 0 ? (
                    course.reviews.map((review) => (
                        <Box key={review._id} mt={2} p={2} boxShadow={1}>
                            <Typography variant="body1">
                                <strong>{review.reviewerName}</strong>
                            </Typography>
                            <Typography variant="body2">{review.review}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2">No reviews yet.</Typography>
                )}
            </Box>
        </Container>
    );
};

export default Course;

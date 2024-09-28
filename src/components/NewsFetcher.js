import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, CircularProgress, Typography, Grid } from '@mui/material';
import NewsCard from './NewsCard';
import { auth } from '../firebase'; // Import Firebase config
import { signOut } from 'firebase/auth'; // Import signOut
import './NewsFetcher.css';

const NewsFetcher = () => {
    const [query, setQuery] = useState('');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;
    const [recommendedArticles, setRecommendedArticles] = useState([]);

    // Fetch news from Flask API and recommended articles
    const fetchNewsAndRecommendations = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch normal news articles
            const newsResponse = await axios.post('http://localhost:5000/get_news_with_sentiment', {
                query
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Filter out articles with '[Removed]' in title or description
            const filteredNews = newsResponse.data.filter(article =>
                !article.title.includes('[Removed]') && !article.description.includes('[Removed]')
            );

            setNews(filteredNews);
            setCurrentPage(1); // Reset to page 1 when new search is made

            // Fetch recommended articles based on the same query
            const recommendationsResponse = await axios.post('http://localhost:5000/get_recommended_articles', {
                query
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            setRecommendedArticles(recommendationsResponse.data);
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError('Failed to fetch articles.');
        } finally {
            setLoading(false);
        }
    };

    // Sign out function
    const handleSignOut = async () => {
        try {
            await signOut(auth); // Sign out the user
            alert("You have been signed out successfully."); // Confirmation message
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // Pagination calculation for normal articles
    const totalPages = Math.ceil(news.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

    return (
        <Container className="container">
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleSignOut}
                className="sign-out-button"
            >
                Sign Out
            </Button>

            <div>
                <Typography variant="h3" align="center" gutterBottom className="news-fetcher">
                    Search For a Topic
                </Typography>
                <div className='same-level'>
                    <TextField
                        variant="outlined"
                        label="Enter news topic"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        fullWidth
                        className="input-field"
                        style={{ width: '50%' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={fetchNewsAndRecommendations}
                        className="fetch-button"
                    >
                        Get News
                    </Button>
                </div>
            </div>

            {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
            {error && <Typography color="error" align="center">{error}</Typography>}

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                {currentArticles.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </Grid>

            {news.length > articlesPerPage && (
                <div className="pagination">
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </Button>

                    <Typography variant="body2" component="span" style={{ margin: '0 10px' }}>
                        Page {currentPage} of {totalPages}
                    </Typography>

                    <Button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}

            <Typography variant="h4" align="center" gutterBottom>
                Recommended Articles
            </Typography>

            {recommendedArticles.length > 0 ? (
                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {recommendedArticles.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" align="center" color="textSecondary">
                    Enter a topic to see our recommended articles.
                </Typography>
            )}
        </Container>
    );
};

export default NewsFetcher;

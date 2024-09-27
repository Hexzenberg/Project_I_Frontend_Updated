import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';
import { firestore } from '../firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods
import { auth } from '../firebase'; // Import Firebase auth
import './NewsCard.css';

const NewsCard = ({ article }) => {
    const handleClick = async (e) => {
        e.preventDefault(); // Prevent the default link behavior

        if (auth.currentUser) { // Ensure the user is logged in
            const articleId = article.id || article.url; // Use article.id or fallback to article.url

            if (!articleId) {
                console.error('Article ID or URL is missing.');
                return; // Exit if there's no valid identifier
            }

            try {
                await addDoc(collection(firestore, 'userInteractions'), {
                    userId: auth.currentUser.uid,
                    articleId: articleId, // Use the ID or fallback URL
                    timestamp: new Date() // Use a client-side timestamp
                });
                console.log('Interaction recorded:', { userId: auth.currentUser.uid, articleId });
            } catch (error) {
                console.error('Error tracking article click:', error);
            }
        }

        // Open the article URL in a new window
        window.open(article.url, '_blank'); // Open the URL in a new tab/window
    };

    return (
        <Card className="news-card">
            <CardContent>
                <Typography variant="h6" component="h3">
                    <Link href={article.url} onClick={handleClick} color="primary" underline="hover">
                        {article.title}
                    </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {article.description}
                </Typography>
                <Typography variant="body1" className="sentiment">
                    <strong>Sentiment:</strong> {article.sentiment}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NewsCard;

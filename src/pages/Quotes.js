import React, { useState, useEffect } from "react";
import axios from "axios";

const QUOTABLE_API_URL = "https://api.quotable.io/random";
const PEXELS_API_KEY = "sG2RIRusEXex3jWDOONyA6Mi1VzF59D4BbnQP7DeRrvwtnVlfaRqRHMz";
const PEXELS_API_URL = "https://api.pexels.com/v1/search?query=nature&per_page=20";

const QuoteGenerator = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");

    // Function to fetch a new quote
    const fetchQuote = async () => {
        try {
            const response = await axios.get(QUOTABLE_API_URL);
            setQuote(response.data.content);
            setAuthor(response.data.author);
        } catch (error) {
            console.error("Error fetching the quote:", error);
            setQuote("Stay positive and keep pushing forward! 🚀");
            setAuthor("Unknown");
        }
    };

    // Function to fetch a new background image
    const fetchBackground = async () => {
        try {
            const response = await fetch(PEXELS_API_URL, {
                headers: { Authorization: PEXELS_API_KEY },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            if (data.photos && data.photos.length > 0) {
                const randomIndex = new Date().getDate() % data.photos.length;
                setBackgroundImage(data.photos[randomIndex].src.large2x);
            } else {
                console.error("No images returned from Pexels API.");
            }
        } catch (error) {
            console.error("Error fetching background:", error);
        }
    };

    useEffect(() => {
        fetchQuote();
        fetchBackground();

        // Apply smooth scrolling
        document.documentElement.style.scrollBehavior = "smooth";
    }, []);

    return (
        
        <div
            className="quote-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "80vh", // Ensures full-page scroll
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
                padding: "50px",
                transition: "background-image 1s ease-in-out",
            }}
        >
            <div className="quote-box">
                <p className="quote-text">❝ {quote} ❞</p>
                <p className="quote-author">- {author}</p>
            </div>
        </div>
    );
};

export default QuoteGenerator;

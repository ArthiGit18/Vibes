import React, { useState, useEffect } from "react";
import axios from "axios";

const PEXELS_API_KEY = "sG2RIRusEXex3jWDOONyA6Mi1VzF59D4BbnQP7DeRrvwtnVlfaRqRHMz"; // 🔹 Replace this with your actual key
const QUOTE_API_URL = "https://api.allorigins.win/raw?url=https://zenquotes.io/api/quotes";
const PEXELS_API_URL = "https://api.pexels.com/v1/search?query=nature&per_page=10";

const QuoteGenerator = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");

    // Function to fetch a new quote
    const fetchQuote = async () => {
        try {
            const response = await axios.get(QUOTE_API_URL);
            if (response.data && response.data.length > 0) {
                const randomIndex = Math.floor(Math.random() * response.data.length);
                const newQuote = response.data[randomIndex].q; // Quote text
                const newAuthor = response.data[randomIndex].a; // Author

                setQuote(newQuote);
                setAuthor(newAuthor);
            } else {
                throw new Error("Invalid response from ZenQuotes API");
            }
        } catch (error) {
            console.error("Error fetching the quote:", error);
            setQuote("Keep going, you are doing great! 😊");
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
                const randomIndex = Math.floor(Math.random() * data.photos.length);
                setBackgroundImage(data.photos[randomIndex].src.landscape);
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
    }, []);

    useEffect(() => {
        if (backgroundImage) {
            document.body.style.backgroundImage = `url(${backgroundImage})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.transition = "background-image 1s ease-in-out"; // Smooth transition
        }
    }, [backgroundImage]);

    return (
        <div className="quote-container">
            <div className="quote-box">
                <p className="quote-text">❝ {quote} ❞</p>
                <p className="quote-author">- {author}</p>
                <button
                    className="new-quote-btn"
                    onClick={() => {
                        fetchQuote();
                        fetchBackground();
                    }}
                >
                    New Quote & Background
                </button>
            </div>
        </div>
    );
};

export default QuoteGenerator;

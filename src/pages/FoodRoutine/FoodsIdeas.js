import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Foods.css";
import he from 'he';

const HealthyFood = () => {
    const [foodSections, setFoodSections] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/food/list") // Adjust URL based on your backend
            .then(response => {
                const data = response.data;

                const categories = [
                    { title: "Morning Breakfast Ideas", mldj: 1 },
                    { title: "Lunch Ideas", mldj: 2 },
                    { title: "Dinner Ideas", mldj: 3 },
                    { title: "Juices for Healthy Skin & Hair", mldj: 7 }
                ];

                const groupedFood = categories.map(category => {
                    const filteredItems = data.filter(item => item.mldj === category.mldj);
                    return {
                        title: category.title,
                        items: filteredItems.slice(0, 5), // Show only 5 initially
                        hasMore: filteredItems.length > 5, // Check if there are more than 5
                    };
                });

                setFoodSections(groupedFood);
            })
            .catch(error => console.error("Error fetching food list:", error));
    }, []);

    const handleNavigate = (id) => {
        navigate(`/healthy-food-Recipe-details/${id}`);
    };
    const decodeHtml = (html) => {
        return he.decode(html); // Decodes HTML entities like &lt;, &gt;, &amp;, etc.
    };

    return (
        <div className="container">
            <div className="healthy-food-container">
                <h2 className="page-title">Healthy Food Ideas</h2>
                {foodSections.map((section, index) => (
                    <div key={index} className="food-section">
                        <h3 className="section-title">{section.title}</h3>
                        <div className="food-grid">
                            {section.items.map((item) => (
                                <div key={item._id} className="food-box" onClick={() => handleNavigate(item._id)}>
                                    <img src={`http://localhost:5000${item.image}`} alt={item.name} className="food-image" />
                                    <h4 className="food-title">{item.name}</h4>
                                    <div
                                        className="food-content-ideas"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeHtml(item.description.slice(0, 60)) + "...",
                                        }}
                                    />
                                </div>
                            ))}
                            {section.hasMore && (
                                <div className="food-box view-more">
                                    <button
                                        className="view-more-btn"
                                        onClick={() => navigate("/healthy-food-recipe-list", {
                                            state: { category: section.title, mldj: section.mldj } // optional: pass state if needed
                                        })}
                                    >
                                        View More
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HealthyFood;

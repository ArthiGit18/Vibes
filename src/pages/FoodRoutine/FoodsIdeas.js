import React from "react";
import "./Foods.css";

const foodSections = [
    {
        title: "Morning Breakfast Ideas",
        items: [
            { image: "/assets/Foods/1.jpg", title: "Oats & Berries", content: "A nutritious mix of oats, nuts, and fresh berries to start your day." },
            { image: "/assets/Foods/1.jpg", title: "Avocado Toast", content: "Whole grain toast with mashed avocado, lemon, and chili flakes." },
            { image: "/assets/Foods/1.jpg", title: "Smoothie Bowl", content: "A mix of banana, berries, yogurt, and chia seeds for energy." },
            { image: "/assets/Foods/1.jpg", title: "Egg & Spinach Wrap", content: "A protein-rich wrap with eggs, spinach, and cheese." },
            { image: "/assets/Foods/1.jpg", title: "Greek Yogurt & Nuts", content: "A refreshing bowl of Greek yogurt with honey and almonds." },
        ],
    },
    {
        title: "Lunch Ideas",
        items: [
            { image: "/assets/Foods/1.jpg", title: "Quinoa Salad", content: "A healthy salad with quinoa, veggies, and a lemon dressing." },
            { image: "/assets/Foods/1.jpg", title: "Grilled Chicken Bowl", content: "Lean grilled chicken with brown rice and steamed veggies." },
            { image: "/assets/Foods/1.jpg", title: "Lentil Soup", content: "A hearty bowl of lentil soup packed with protein and fiber." },
            { image: "/assets/Foods/1.jpg", title: "Veggie Stir-fry", content: "A mix of fresh vegetables stir-fried with garlic and tofu." },
            { image: "/assets/Foods/1.jpg", title: "Hummus & Whole Wheat Pita", content: "A tasty meal with hummus, pita, and fresh salad." },
        ],
    },
    {
        title: "Dinner Ideas",
        items: [
            { image: "/assets/Foods/1.jpg", title: "Grilled Salmon", content: "Salmon with a side of roasted vegetables and quinoa." },
            { image: "/assets/Foods/1.jpg", title: "Stuffed Bell Peppers", content: "Bell peppers stuffed with quinoa, beans, and cheese." },
            { image: "/assets/Foods/1.jpg", title: "Spinach & Chickpea Curry", content: "A flavorful curry with chickpeas, spinach, and spices." },
            { image: "/assets/Foods/1.jpg", title: "Zucchini Noodles", content: "Zucchini noodles with homemade pesto and cherry tomatoes." },
            { image: "/assets/Foods/1.jpg", title: "Brown Rice & Stir-fry", content: "Healthy brown rice with tofu and mixed vegetables." },
        ],
    },
    {
        title: "Juices for Healthy Skin & Hair",
        items: [
            { image: "/assets/Foods/1.jpg", title: "Carrot & Beet Juice", content: "A refreshing juice rich in antioxidants for glowing skin." },
            { image: "/assets/Foods/1.jpg", title: "Green Detox Juice", content: "Spinach, cucumber, and lemon juice for body detox." },
            { image: "/assets/Foods/1.jpg", title: "Coconut & Aloe Vera", content: "A hydrating blend that nourishes hair and skin." },
            { image: "/assets/Foods/1.jpg", title: "Berry Blast", content: "A mix of blueberries, strawberries, and chia seeds." },
            { image: "/assets/Foods/1.jpg", title: "Turmeric & Ginger", content: "A powerful anti-inflammatory juice for radiant skin." },
        ],
    },
];

const HealthyFood = () => {
    return (
        <div className="container">
            <div className="healthy-food-container">
                <h2 className="page-title">Healthy Food Ideas</h2>
                {foodSections.map((section, index) => (
                    <div key={index} className="food-section">
                        <h3 className="section-title">{section.title}</h3>
                        <div className="food-grid">
                            {section.items.map((item, idx) => (
                                <div key={idx} className="food-box">
                                    <img src={item.image} alt={item.title} className="food-image" />
                                    <h4 className="food-title">{item.title}</h4>
                                    <p className="food-content">{item.content}</p>
                                </div>
                            ))}
                            <div className="food-box view-more">
                                <button className="view-more-btn">View More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HealthyFood;

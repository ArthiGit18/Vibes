import React from "react";
import "./Facecare.css";

const careSections = [
    {
        title: "Face Massage",
        items: [
            { image: "/assets/Face/1.jpg", title: "Lifting Massage", content: "Reduces wrinkles and improves skin elasticity." },
            { image: "/assets/Face/1.jpg", title: "Lymphatic Drainage", content: "Eliminates toxins and improves blood circulation." },
            { image: "/assets/Face/1.jpg", title: "Acupressure Points", content: "Releases tension and promotes relaxation." },
            { image: "/assets/Face/1.jpg", title: "Gua Sha Therapy", content: "Reduces puffiness and enhances glow." },
            { image: "/assets/Face/1.jpg", title: "Oil-Based Massage", content: "Deeply hydrates and nourishes skin." },
        ],
    },
    {
        title: "Hair Massage",
        items: [
            { image: "/assets/Face/1.jpg", title: "Coconut Oil Massage", content: "Strengthens roots and prevents dandruff." },
            { image: "/assets/Face/1.jpg", title: "Scalp Acupressure", content: "Stimulates hair growth and reduces stress." },
            { image: "/assets/Face/1.jpg", title: "Aloe Vera Massage", content: "Hydrates scalp and prevents hair fall." },
            { image: "/assets/Face/1.jpg", title: "Essential Oil Therapy", content: "Boosts hair growth and enhances shine." },
            { image: "/assets/Face/1.jpg", title: "Hot Towel Treatment", content: "Deeply conditions and improves texture." },
        ],
    },
    {
        title: "Homemade Face Pack",
        items: [
            { image: "/assets/Face/1.jpg", title: "Turmeric & Yogurt", content: "Brightens skin and fights acne naturally." },
            { image: "/assets/Face/1.jpg", title: "Honey & Oatmeal", content: "Exfoliates and deeply moisturizes skin." },
            { image: "/assets/Face/1.jpg", title: "Aloe Vera & Cucumber", content: "Soothes and cools sensitive skin." },
            { image: "/assets/Face/1.jpg", title: "Charcoal Detox Mask", content: "Removes impurities and unclogs pores." },
            { image: "/assets/Face/1.jpg", title: "Rose Water & Clay", content: "Tightens skin and reduces oiliness." },
        ],
    },
    {
        title: "Homemade Hair Mask",
        items: [
            { image: "/assets/hair-mask1.jpg", title: "Banana & Honey", content: "Deep conditions and repairs dry hair." },
            { image: "/assets/hair-mask2.jpg", title: "Egg & Olive Oil", content: "Strengthens weak hair and adds shine." },
            { image: "/assets/hair-mask3.jpg", title: "Fenugreek & Yogurt", content: "Prevents dandruff and soothes scalp." },
            { image: "/assets/hair-mask4.jpg", title: "Avocado & Coconut Milk", content: "Hydrates and softens frizzy hair." },
            { image: "/assets/hair-mask5.jpg", title: "Amla & Hibiscus", content: "Boosts hair growth and adds volume." },
        ],
    },
];

const FaceHairCarePage = () => {
    return (
        <div className="container">
            <div className="care-container">
                <h2 className="page-title">Face & Hair Care Tips</h2>
                {careSections.map((section, index) => (
                    <div key={index} className="care-section">
                        <h3 className="section-title">{section.title}</h3>
                        <div className="care-grid">
                            {section.items.map((item, idx) => (
                                <div key={idx} className="care-box">
                                    <img src={item.image} alt={item.title} className="care-image" />
                                    <h4 className="care-title">{item.title}</h4>
                                    <p className="care-content">{item.content}</p>
                                </div>
                            ))}
                            <div className="care-box view-more">
                                <button className="view-more-btn">View More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaceHairCarePage;

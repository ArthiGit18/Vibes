import React from "react";
import "./Bodycare.css";

const bodyCareSections = [
    {
        title: "Skin Types - Dry, Oily & Combination",
        items: [
            { image: "/assets/Bodycare/1.jpg", title: "Dry Skin Care", content: "Hydration is key! Use gentle, nourishing moisturizers." },
            { image: "/assets/Bodycare/1.jpg", title: "Oily Skin Care", content: "Use oil-free products to control excess shine." },
            { image: "/assets/Bodycare/1.jpg", title: "Combination Skin", content: "Balance hydration and oil control for even tone." },
            { image: "/assets/Bodycare/1.jpg", title: "Sensitive Skin", content: "Avoid harsh chemicals and opt for mild cleansers." },
            { image: "/assets/Bodycare/1.jpg", title: "Normal Skin", content: "Maintain with daily hydration and SPF." },
        ],
    },
    {
        title: "Hair Types - Curly & Straight",
        items: [
            { image: "/assets/Bodycare/1.jpg", title: "Curly Hair", content: "Use deep conditioning treatments for definition." },
            { image: "/assets/Bodycare/1.jpg", title: "Straight Hair", content: "Use heat protectants to prevent damage." },
            { image: "/assets/Bodycare/1.jpg", title: "Wavy Hair", content: "Use lightweight mousses for volume and texture." },
            { image: "/assets/Bodycare/1.jpg", title: "Coily Hair", content: "Moisturize regularly to reduce breakage." },
            { image: "/assets/Bodycare/1r.jpg", title: "Frizzy Hair", content: "Apply leave-in conditioner for smoother strands." },
        ],
    },
    {
        title: "Dark Pigmentation Areas",
        items: [
            { image: "/assets/Bodycare/1.jpg", title: "Underarms", content: "Use natural exfoliants to brighten skin." },
            { image: "/assets/Bodycare/1.jpg", title: "Knees & Elbows", content: "Moisturize daily to reduce dark patches." },
            { image: "/assets/Bodycare/1.jpg", title: "Dark Neck", content: "Lemon and honey help lighten skin tone." },
            { image: "/assets/Bodycare/1.jpg", title: "Dark Lips", content: "Scrub with sugar and honey for soft lips." },
            { image: "/assets/Bodycare/1.jpg", title: "Inner Thighs", content: "Aloe vera gel can help with discoloration." },
        ],
    },
    {
        title: "Hygienic Tips",
        items: [
            { image: "/assets/Bodycare/1.jpg", title: "Hand Washing", content: "Wash hands frequently to prevent infections." },
            { image: "/assets/Bodycare/1.jpg", title: "Oral Hygiene", content: "Brush twice daily for fresh breath and healthy gums." },
            { image: "/assets/Bodycare/1.jpg", title: "Daily Skincare", content: "Use a mild cleanser and moisturizer daily." },
            { image: "/assets/Bodycare/1.jpg", title: "Body Exfoliation", content: "Exfoliate weekly to remove dead skin cells." },
            { image: "/assets/Bodycare/1.jpg", title: "Hair Washing", content: "Keep hair clean and free from oil buildup." },
        ],
    },
];

const FullBodyCarePage = () => {
    return (
        <div className="container">
            <div className="body-care-container">
                <h2 className="page-title">Full Body Care Tips</h2>
                {bodyCareSections.map((section, index) => (
                    <div key={index} className="body-care-section">
                        <h3 className="section-title">{section.title}</h3>
                        <div className="body-care-grid">
                            {section.items.map((item, idx) => (
                                <div key={idx} className="body-care-box">
                                    <img src={item.image} alt={item.title} className="body-care-image" />
                                    <h4 className="body-care-title">{item.title}</h4>
                                    <p className="body-care-content">{item.content}</p>
                                </div>
                            ))}
                            <div className="body-care-box view-more">
                                <button className="view-more-btn">View More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FullBodyCarePage;

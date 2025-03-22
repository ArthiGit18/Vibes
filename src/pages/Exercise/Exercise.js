import React from "react";
import "./Exercise.css"

const workoutSections = [
    {
        title: "Simple Routine Workout",
        items: [
            { image: "/assets/Exercise/1.jpg", title: "Jumping Jacks", content: "A great full-body warm-up exercise for heart health." },
            { image: "/assets/Exercise/1.jpg", title: "Push-Ups", content: "Strengthens chest, shoulders, and arms with body weight." },
            { image: "/assets/Exercise/1.jpg", title: "Squats", content: "Boosts lower body strength and flexibility." },
            { image: "/assets/Exercise/1.jpg", title: "Lunges", content: "Improves balance and tones legs and glutes." },
            { image: "/assets/Exercise/1.jpg", title: "Plank", content: "Strengthens core muscles and improves posture." },
        ],
    },
    {
        title: "Pilates",
        items: [
            { image: "/assets/Exercise/1.jpg", title: "Roll-Up", content: "Improves core strength and spine flexibility." },
            { image: "/assets/Exercise/1.jpg", title: "The Hundred", content: "Engages abs, breathing, and endurance." },
            { image: "/assets/Exercise/1.jpg", title: "Leg Circles", content: "Tones thighs and strengthens core stability." },
            { image: "/assets/Exercise/1.jpg", title: "Rolling Like a Ball", content: "Enhances spine flexibility and balance." },
            { image: "/assets/Exercise/1.jpg", title: "Side-Lying Leg Lifts", content: "Targets glutes and outer thighs." },
        ],
    },
    {
        title: "Hard Bodybuilding Workout",
        items: [
            { image: "/assets/Exercise/1.jpg", title: "Bench Press", content: "Develops chest and upper body strength." },
            { image: "/assets/Exercise/1.jpg", title: "Deadlifts", content: "Strengthens back, legs, and core muscles." },
            { image: "/assets/Exercise/1.jpg", title: "Squat with Weights", content: "Builds leg and glute muscles efficiently." },
            { image: "/assets/Exercise/1.jpg", title: "Pull-Ups", content: "Improves upper body and grip strength." },
            { image: "/assets/Exercise/1.jpg", title: "Bicep Curls", content: "Targets arm muscles for definition." },
        ],
    },
    {
        title: "Dance Workout",
        items: [
            { image: "/assets/Exercise/1.jpg", title: "Zumba", content: "A fun cardio workout that burns calories." },
            { image: "/assets/Exercise/1.jpg", title: "Hip-Hop Dance", content: "Improves coordination and endurance." },
            { image: "/assets/Exercise/1.jpg", title: "Salsa Moves", content: "A great leg and core workout." },
            { image: "/assets/Exercise/1.jpg", title: "Belly Dance", content: "Strengthens abs and improves flexibility." },
            { image: "/assets/Exercise/1.jpg", title: "Aerobic Dance", content: "Enhances stamina and burns fat effectively." },
        ],
    },
];

const ExercisePage = () => {
    return (
        <div className="container">
            <div className="exercise-container">
                <h2 className="page-title">Exercise & Workouts</h2>
                {workoutSections.map((section, index) => (
                    <div key={index} className="workout-section">
                        <h3 className="section-title">{section.title}</h3>
                        <div className="workout-grid">
                            {section.items.map((item, idx) => (
                                <div key={idx} className="workout-box">
                                    <img src={item.image} alt={item.title} className="workout-image" />
                                    <h4 className="workout-title">{item.title}</h4>
                                    <p className="workout-content">{item.content}</p>
                                </div>
                            ))}
                            <div className="workout-box view-more">
                                <button className="view-more-btn">View More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExercisePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Exercise.css";

const FilterSection = () => {
    const [bodyParts, setBodyParts] = useState([]);
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBodyParts = async () => {
            try {
                const response = await axios.get(
                    "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
                    {
                        headers: {
                            "X-RapidAPI-Key": "5a539483dbmsh30a6e18d707e107p140b61jsn169c7ba3f3be",
                            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
                        }
                    }
                );
                setBodyParts(response.data);
            } catch (error) {
                console.error("Error fetching body parts:", error);
            }
        };

        fetchBodyParts();
    }, []);

    const handleSelect = (part) => {
        setSelected(part);
        navigate(`/exercisePage?bodyPart=${encodeURIComponent(part)}`);
    };

    return (
        <div className="container">
            <h3>Please Select a Body Part to Continue</h3>
            <div className="filter-options">
                {bodyParts.map(part => (
                    <button
                        key={part}
                        className={`filter-button ${selected === part ? "selected" : ""}`}
                        onClick={() => handleSelect(part)}
                    >
                        {part}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterSection;

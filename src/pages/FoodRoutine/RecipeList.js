import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, TextField, Switch, FormControlLabel } from "@mui/material";
import { useRef } from "react";
import "./Foods.css"; // Reuse the same styling used for HealthyFood

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [mldjFilter, setMldjFilter] = useState("");
    //   const [vegOnly, setVegOnly] = useState(false);
    const [vegNonvegFilter, setVegNonvegFilter] = useState(0);
    const recipeRefs = useRef({});
    const [highlightedId, setHighlightedId] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("https://sweet-appreciation-production.up.railway.app/api/food/list");
                let filtered = response.data;
    
                if (mldjFilter !== "") {
                    filtered = filtered.filter((item) => item.mldj === Number(mldjFilter));
                }
    
                if (vegNonvegFilter === 1 || vegNonvegFilter === 2) {
                    filtered = filtered.filter(item => item.vegNonveg === vegNonvegFilter);
                }
    
                setRecipes(filtered);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
    
        fetchRecipes();
    }, [mldjFilter, vegNonvegFilter]);

    useEffect(() => {
        axios.get("https://sweet-appreciation-production.up.railway.app/api/food/list")
            .then(response => {
                setRecipes(response.data);
                response.data.forEach(item => {
                    recipeRefs.current[item._id] = React.createRef();
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleScrollToRecipe = (event, selectedItem) => {
        if (selectedItem && recipeRefs.current[selectedItem._id]) {
            recipeRefs.current[selectedItem._id].current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            setHighlightedId(selectedItem._id);

            // Remove highlight after a short delay
            setTimeout(() => setHighlightedId(null), 2000);
        }
    };


    return (
        <div className="container">
            <div className="healthy-food-container">
                <h2 className="page-title">All Healthy Food Recipes</h2>

                {/* Filters */}
                <div className="filters" style={{ marginBottom: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    <label>
                        Meal Type:&nbsp;
                        <select value={mldjFilter} onChange={(e) => setMldjFilter(e.target.value)}>
                            <option value="">All</option>
                            <option value="1">Morning Breakfast</option>
                            <option value="2">Lunch</option>
                            <option value="3">Dinner</option>
                            <option value="7">Juices</option>
                        </select>
                    </label>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={vegNonvegFilter === 2}
                                onChange={() => setVegNonvegFilter((prev) => (prev === 2 ? 1 : 2))}
                                color="success"
                            />
                        }
                        label={vegNonvegFilter === 2 ? "Non-Veg" : "Veg"}
                    />

                    <Autocomplete
                        options={recipes}
                        getOptionLabel={(option) => option.name}
                        onChange={handleScrollToRecipe}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search Recipe"
                                variant="outlined"
                                size="small"
                                sx={{
                                    '& label': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'white',
                                    },
                                }}
                            />
                        )}
                        sx={{
                            width: 300,
                            marginBottom: "20px"
                        }}
                    />
                </div>

                {/* Recipes Grid */}
                {/* <div className="food-grid">
                    {recipes.map((item) => (
                        <div key={item._id} className="food-box">
                            <img
                                src={`http://localhost:5000${item.image}`}
                                alt={item.name}
                                className="food-image"
                            />
                            <h4 className="food-title">{item.name}</h4>
                            <div
                                className="food-content-ideas"
                                dangerouslySetInnerHTML={{
                                    __html: decodeHtml(item.description.slice(0, 60)) + "...",
                                }}
                            />
                        </div>
                    ))}
                </div> */}

                <div className="food-grid">
                    {recipes
                        .filter(item =>
                            vegNonvegFilter === 0 || item.vegNonveg === vegNonvegFilter
                        )
                        .map(item => (
                            <div
                                key={item._id}
                                ref={recipeRefs.current[item._id]}
                                className={`food-box ${highlightedId === item._id ? "highlighted" : ""}`}
                            >
                                <img src={`http://localhost:5000${item.image}`} alt={item.name} className="food-image" />
                                <h4 className="food-title">{item.name}</h4>
                                <div
                                    className="food-content-ideas"
                                    dangerouslySetInnerHTML={{ __html: item.description.slice(0, 60) + "..." }}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default RecipeList;

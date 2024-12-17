import React, { useState, useEffect } from "react";
import axios from 'axios';
import './viewItems.css';

function ViewItem() {
    const [recipes, setRecipes] = useState([]);
    const [feedbacks, setFeedbacks] = useState({});
    const [visibleFeedback, setVisibleFeedback] = useState(null);

    useEffect(() => {
        const getAddedItems = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://localhost:7105/api/User/recipes/user/${userId}`);
                setRecipes(response.data);
                console.log(`Response------>${recipes}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getAddedItems();
    }, []);

    const handleDelete = async (recId) => {
        try {
            if (window.confirm('Are you sure want to delete the item?')) {
                await axios.delete(`https://localhost:7105/api/User/recipe/${recId}`);
                setRecipes(recipes.filter(recipe => recipe.recipeid !== recId));
            }
        } catch (err) {
            console.log(`Error while deleting..${err}`);
        }
    };

    const toggleFeedback = async (recId) => {
        if (visibleFeedback === recId) {
            setVisibleFeedback(null); // Hide feedback
        } else {
            try {
                const response = await axios.get(`https://localhost:7105/api/User/reviews/${recId}`);
                setFeedbacks(prevFeedbacks => ({ ...prevFeedbacks, [recId]: response.data }));
                setVisibleFeedback(recId); // Show feedback
            } catch (err) {
                alert('No feedbacks found..!!');
                console.log(`Error fetching feedback..${err}`);
            }
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    {recipes.map((recipe) => (
                        <div key={recipe.recipeid} className="col-md-3 mb-4 mt-4">
                            <div className="card card1">
                                <img src={`data:image/jpeg;base64,${recipe.imagebase64}`} className="card-img-top" alt={recipe.name} />
                                <div className="card-body">
                                    <h3 className="card-title rec_Name">{recipe.name}</h3>
                                    <p className="card-text expl">About: {recipe.explanation}</p>
                                    <p className="card-text expl">Ingrediants: {recipe.ingrediants}</p>
                                    <button className="feedbtn" onClick={() => toggleFeedback(recipe.recipeid)}>
                                        {visibleFeedback === recipe.recipeid ? 'Hide Feedback' : 'Show Feedback'}
                                    </button>
                                    {visibleFeedback === recipe.recipeid && feedbacks[recipe.recipeid] && feedbacks[recipe.recipeid].map((feed) => (
                                        <p key={feed.id} className="card-text expl">{feed.comment}</p>
                                    ))}
                                </div>
                                <div className="card-body">
                                    <button className="btn btn-danger" onClick={() => handleDelete(recipe.recipeid)}>DELETE</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ViewItem;

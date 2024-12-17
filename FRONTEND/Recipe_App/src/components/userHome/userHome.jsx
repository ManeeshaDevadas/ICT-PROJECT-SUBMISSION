import React, { useState, useEffect } from 'react';
import './userHome.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserHome() {
  const userId = localStorage.getItem('userId');
  const [recipes, setRecipes] = useState([]);
  const [feedback, setFeedBack] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm('Are you sure want to logout?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  useEffect(() => {
    const getAddedItems = async () => {
      try {
        const response = await axios.get(`https://localhost:7105/api/User/recipes`);
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Initialize filtered recipes with all recipes
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAddedItems();
  }, []);

  const handleFeedbackChange = (recId, value) => {
    setFeedBack({ ...feedback, [recId]: value });
  };

  const handleFeedbackSubmit = async (event, recId) => {
    event.preventDefault();
    try {
      await axios.post(`https://localhost:7105/api/User/addReview`, {
        userId: userId,
        recipeid: recId,
        comment: feedback[recId]
      });
      alert('Feedback submitted successfully!');
      setFeedBack({});
    } catch (err) {
      console.log(`Error while submitting feedback..${err}`);
      alert('Failed to submit Feedback..!!');
    }
  };

  const handleSearch = () => {
    const filtered = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filtered.length > 0) {
      setFilteredRecipes(filtered);
    } else {
      alert('No items found..!!');
      setFilteredRecipes([]);
    }
  };

  return (
    <>
      <header className='bg'>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <h2 className='heading'>User Dashboard</h2>
            </div>
            <div className='col-8 btn-align'>
              <button style={{ marginLeft: 30 }} className='btns' onClick={logOut}>LOGOUT</button>
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a recipe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
      <h2 style={{ marginTop: 30, textAlign: 'center', fontWeight: 'bold', color: 'red' }}>Special Dishes..!!</h2>
      <div className="container">
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.recipeid} className="col-md-3 mb-4 mt-4">
              <div className="card card1">
                <img src={`data:image/jpeg;base64,${recipe.imagebase64}`} className="card-img-top" alt={recipe.name} />
                <div className="card-body">
                  <h3 className="card-title rec_Name">{recipe.name}</h3>
                  <p className="card-text expl">About: {recipe.explanation}</p>
                  <p className="card-text expl">Ingrediants: {recipe.ingrediants}</p>
                </div>
                <div className='card-body'>
                  <form onSubmit={(e) => handleFeedbackSubmit(e, recipe.recipeid)}>
                    <label className='card-text expl mb-2'>Feedback</label>
                    <input
                      type="text"
                      className="form-control"
                      value={feedback[recipe.recipeid] || ''}
                      placeholder="Enter a feedback"
                      aria-label="Feedback"
                      aria-describedby="basic-addon1"
                      onChange={(e) => handleFeedbackChange(recipe.recipeid, e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary mt-2">Submit Feedback</button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserHome;

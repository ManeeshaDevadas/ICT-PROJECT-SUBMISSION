import React, { useState } from "react";
import './addItem.css';
import axios from 'axios';
import { use } from "react";

function AddItem() {
  const [recipeName, setRecipeName] = useState('');
  const [incred, setIncred] = useState('');
  const [explan, setExplan] = useState('');
  const [recipeImg, setRecipeImg] = useState('');
  const [imgFile, setImgFile] = useState('');
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
    const reader = new FileReader();
    
    reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
      console.log(`Baseeee---->${reader.result}`);
      setRecipeImg(base64);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addAnItem = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('https://localhost:7105/api/User/addRecipe', {
        userid: userId,
        name: recipeName,
        ingrediants: incred,
        explanation: explan,
        imagebase64: recipeImg
      });
      console.log('Response:', response.data.userId);
      if (response.data.recipeId != null) {
        window.confirm('Item Added Successfully..!!');
        setRecipeName('');
        setIncred('');
        setExplan('');
        setImgFile('');
      } else {
        window.confirm('Failed to add item..!!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      window.confirm('Failed to add item..!!');
    }
  };

  return (
    <>
      <div className='row formAlign'>
        <div className='addForm'>
          <form onSubmit={addAnItem}>
            <legend style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Add An Item..!!</legend>
            <div className="mb-3">
              <label style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} htmlFor="recipeName" className="form-label">Recipe Name</label>
              <input type="text" value={recipeName} className="form-control" id="recipeName" onChange={(e) => setRecipeName(e.target.value)} required aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} htmlFor="ingrediants" className="form-label">Ingrediants</label>
              <input type="text" value={incred} className="form-control" onChange={(e) => setIncred(e.target.value)} required id="ingrediants" />
            </div>
            <div className="mb-3">
              <label style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} htmlFor="explanation" className="form-label">Explanation</label>
              <input type="text" value={explan} className="form-control" onChange={(e) => setExplan(e.target.value)} required id="explanation" />
            </div>
            <div className="mb-3">
              <label style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} htmlFor="formFile" className="form-label">Recipe Image</label>
              <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddItem;

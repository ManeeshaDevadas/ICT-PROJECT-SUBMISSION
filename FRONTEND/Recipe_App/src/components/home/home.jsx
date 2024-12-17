import React, { useState } from 'react';
import './home.css';
import AddItem from '../addItem/addItem';
import ViewItem from '../viewItems/viewItems';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [addFormShow, setAddFormShow] = useState(false);
  const [viewAddedItem, setViewAddedItem] = useState(false);
  const navigate = useNavigate();

  const viewAddedItems = () => {
    console.log('View working..!!');
    setAddFormShow(false);
    setViewAddedItem(true);
  };

  const addItems = () => {
    console.log('Add working..!!');
    setAddFormShow(true); 
    setViewAddedItem(false);
  };

  const logOut= () =>
  {
    if(window.confirm('Are you sure want to logout?'))
    {
      localStorage.clear();
      navigate('/login');
    }
  }

  return (
    <>
      <header className='bg1'>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <h2 className='heading'>Chef Dashboard</h2>
            </div>
            <div className='col-8 btn-align'>
              <button className='btns' onClick={addItems}>ADD DISH</button>
              <button style={{ marginLeft: 30 }} className='btns' onClick={viewAddedItems}>VIEW ADDED DISH</button>
              <button style={{ marginLeft: 30 }} className='btns' onClick={logOut}>LOGOUT</button>
            </div>
          </div>
        </div>
      </header>

      {addFormShow && <AddItem />}
      {viewAddedItem && <ViewItem />}

    </>
  );
}

export default Home;

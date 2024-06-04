import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserIcons from '../components/icons/UserIcons';
import { useNavigate } from 'react-router-dom';
import { clearUser, fetchUserDetails } from '../redux/userSlice';
import Navbar from '../components/Navbar';

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/sign-in');
    } else {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, navigate]);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(clearUser());
    navigate('/sign-in');
  };
  const handleClose = () => {
    navigate('/');
  };
  return (
    <>
      <Navbar />
      <div className='h-screen-center'>
        <div className='user-profile'>
          <span className='pro-close' onClick={handleClose}>X</span>
          {user?.profilePic ? (
            <div>
              <img src={user?.profilePic} className='user-profile-pic' alt='Profile Pic' />
            </div>
          ) : (
            <div className='user-profile-icons'>
              <UserIcons />
            </div>
          )}
          
          <p><mark><b>Following:</b> {user?.following?.length}</mark></p>
          <p><b>Name:</b> {user?.firstName} {user?.lastName}</p>
          <i> <b>User Name:</b> {user?.userName}</i>
          <p><b>Phone No:</b> {user?.phone}</p>
          <p><b>Email:</b> {user?.email}</p>
          <p><b>Joined:</b> {new Date(user?.createdAt).toLocaleDateString()}</p>
          <button className='logout-btn' onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

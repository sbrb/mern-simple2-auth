import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import UserIcons from './icons/UserIcons';
import Skeleton from 'react-loading-skeleton';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { fetchUserDetails } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const dispatch = useDispatch();

    const usersPerPage = 12;
    const pagesVisited = pageNumber * usersPerPage;
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData(token);
    }, [token]);

    const fetchData = (token) => {
        axios.get('http://localhost:8080/api/all-user', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const data = response.data;
                setUsers(data.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    };


    const handleFollow = (treatedUserId) => {
        axios.post(`http://localhost:8080/api/follow/${treatedUserId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (response.status === 200) {
                    const updatedUsers = users.map(user =>
                        user._id === treatedUserId ? { ...user, follow: true } : user
                    );
                    setUsers(updatedUsers);
                    toast.success(response.data.message);
                    dispatch(fetchUserDetails());
                } else {
                    toast.error('Error following user');
                }
            })
            .catch(error => {
                console.error('Error following user:', error);
                toast.error(error.response.data.message);
            });
    };


    const handleUnfollow = (treatedUserId) => {
        axios.post(`http://localhost:8080/api/unfollow/${treatedUserId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (response.status === 200) {
                    const updatedUsers = users.map(user =>
                        user._id === treatedUserId ? { ...user, follow: false } : user
                    );
                    setUsers(updatedUsers);
                    toast.success(response.data.message);
                    dispatch(fetchUserDetails());
                } else {
                    toast.error('Error unfollowing user');
                }
            })
            .catch(error => {
                console.error('Error unfollowing user:', error);
                toast.error(error.response.data.message);
            });
    };

    const pageCount = Math.ceil(users.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <div className="user-card-container">
                {loading ? (
                    Array.from({ length: usersPerPage }).map((_, index) => (
                        <div key={index} className="user-card">
                            <Skeleton height={220} width={220} />
                            <div className="user-details">
                                <div className='user-profile-icons'>
                                    <UserIcons />
                                </div>
                                <p className='sc-user-dit'></p>
                                <p className='sc-user-dit'></p>
                                <button className="unfollow-button sc-lood-btn" ></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        {users.slice(pagesVisited, pagesVisited + usersPerPage).map(user => (
                            <div key={user._id} className="user-card">
                                {user?.profilePic ? (
                                    <div>
                                        <img src={user?.profilePic} className='user-image' alt='Profile Pic' />
                                    </div>
                                ) : (
                                    <div className='user-profile-icons'>
                                        <UserIcons />
                                    </div>
                                )}

                                <div className="user-details">
                                    <p><b> {user?.firstName} {user?.lastName}</b></p>
                                    <i> {user?.userName}</i>
                                    <br />
                                    <br />
                                    {user?.follow ? (
                                        <button className="unfollow-button" onClick={() => handleUnfollow(user._id)}>Unfollow</button>
                                    ) : (
                                        <button className="follow-button" onClick={() => handleFollow(user._id)}>Follow</button>
                                    )}

                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
            <ToastContainer position="top-left" /> 
        </>
    );
}

export default AllUser;

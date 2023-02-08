import React, { useState, useEffect } from 'react';
import { likeGithubUser } from '../../api/user';
import HeartIcon from '../Heart/HeartIcon';

const User = ({id, login, avatar_url, html_url, repos_url, followers_url}) => {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const likedUsers = JSON.parse(localStorage.getItem('likedUsers')) || [];
        setIsLiked(likedUsers.includes(id));
    }, [id, setIsLiked]);
    
    const handleLikeClick = async() => {
        const likedUsers = JSON.parse(localStorage.getItem('likedUsers')) || [];
        const phoneNumber = localStorage.getItem('phoneNumber');

        if (isLiked) {
            // Remove the user from the likedUsers list
            const newLikedUsers = likedUsers.filter((userId) => userId !== id);
            localStorage.setItem('likedUsers', JSON.stringify(newLikedUsers));
            setIsLiked(false);
        } else {
            // Add the user to the likedUsers list
            likedUsers.push(id);
            localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
            setIsLiked(true);
        }

        await likeGithubUser(phoneNumber, login)
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{login}</td>
            <td>
                <img src={avatar_url} alt={`${login}'s avatar`} />
            </td>
            <td>
                <a href="{html_url}">{html_url}</a>
            </td>
            <td>
                <a href="{repos_url}">{repos_url}</a>
            </td>
            <td>
                <a href="{followers_url}">{followers_url}</a>
            </td>
            <td>
                <HeartIcon isLiked={isLiked} onLikeClick={handleLikeClick} />
            </td>
        </tr>
    );
};

export default User;
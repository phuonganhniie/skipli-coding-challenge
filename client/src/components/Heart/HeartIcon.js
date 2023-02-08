import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const HeartIcon = ({isLiked}) => {
    return (
        <FontAwesomeIcon 
            icon={faHeart} 
            color={isLiked ? 'red' : 'grey'} 
            size="2x"
        />
    );
}

export default HeartIcon;
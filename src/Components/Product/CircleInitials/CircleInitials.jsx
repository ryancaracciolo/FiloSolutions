import React from 'react';
import './CircleInitials.css'; // CSS file for styling

function CircleInitials({ businessName, size, fontSize }) {
  if (!businessName) {
    return null;
  }

  const getInitials = (name) => {
    // Split the name into words, filter out empty strings and common words like "The"
    const words = name
      .trim()
      .split(' ')
      .filter((word) => word && word.toLowerCase() !== 'the'); // Filter out empty strings and "the"

    // Take the first letter of the first two words
    const initials = words
      .slice(0, 2) // Take the first two words
      .map((word) => word[0].toUpperCase()) // Map each word to its first letter, uppercase
      .join(''); // Join them into a string

    return initials;
  };

  // Get initials based on the business name
  const initials = getInitials(businessName);

  return (
    <div style={{ width: size, height: size, fontSize: fontSize }} className="circle-initials">
      {initials}
    </div>
  );
}

export default CircleInitials;

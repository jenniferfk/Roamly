import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const AuthButton = ({ onClick, text }:ButtonProps) => {
  return (
    <button onClick={onClick} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4">
      {text}
    </button>
  );
};

export default AuthButton;

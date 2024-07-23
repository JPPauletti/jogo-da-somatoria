import React from 'react';

const Carta = ({ carta }) => {

  const imagemCoringa = 'https://sports.tribune.net.ph/wp-content/uploads/2023/08/bb90906b4a3a1cc054a122ae4ba92468_h-jokers-card-joker-card-clipart-transparent-background_518-800.jpg'; 

  const imagemCarta = carta.value === 'JOKER' 
    ? imagemCoringa 
    : carta.image;

  return (
    <img src={imagemCarta} alt={`${carta.value} de ${carta.suit}`} />
  );
};

export default Carta;

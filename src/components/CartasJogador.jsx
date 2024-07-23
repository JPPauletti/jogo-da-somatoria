import React from 'react';
import Carta from './Carta';
import '../styles/style.css';

const CartasJogador = ({ cartas }) => {
  return (
    <div className="cartas-jogador">
      {cartas.map((carta, index) => (
        <Carta key={index} carta={carta} />
      ))}
    </div>
  );
};

export default CartasJogador;

import React from 'react';

const Mesa = ({ puxarCarta, jogoFinalizado }) => {
  return (
    <div onClick={!jogoFinalizado ? puxarCarta : null}>
      <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Monte de Cartas" />
    </div>
  );
};

export default Mesa;

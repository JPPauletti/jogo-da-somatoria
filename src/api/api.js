import axios from "axios";

export const criarBaralho = async () => {
  const resposta = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1&jokers_enabled=true"
  );
  return resposta.data.deck_id;
};

export const puxarCartaDoBaralho = async (idBaralho) => {
  const resposta = await axios.get(
    `https://deckofcardsapi.com/api/deck/${idBaralho}/draw/?count=1`
  );
  return resposta.data.cards[0];
};

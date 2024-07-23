import React, { useEffect } from "react";
import { criarBaralho } from "../api/api";

const CarregarBaralho = ({ setIdBaralho }) => {
  useEffect(() => {
    const carregar = async () => {
      const id = await criarBaralho();
      setIdBaralho(id);
    };
    carregar();
  }, [setIdBaralho]);

  return null;
};

export default CarregarBaralho;

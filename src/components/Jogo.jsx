import React, { useState, useEffect } from "react";
import Mesa from "./Mesa";
import CartasJogador from "./CartasJogador";
import CarregarBaralho from "./CarregarBaralho";
import { puxarCartaDoBaralho } from "../api/api";
import { calcularPontuacao } from "../utils/utils";
import "../styles/style.css";

const Jogo = () => {
  const [idBaralho, setIdBaralho] = useState(null);
  const [cartasMaria, setCartasMaria] = useState([]);
  const [cartasJoaquim, setCartasJoaquim] = useState([]);
  const [vez, setVez] = useState("Maria");
  const [vencedor, setVencedor] = useState(null);
  const [mensagemFinal, setMensagemFinal] = useState("");
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (cartasMaria.length + cartasJoaquim.length === 10) {
      determinarVencedor();
      setJogoFinalizado(true);
    }
  }, [cartasMaria, cartasJoaquim]);

  const puxarCarta = async () => {
    if (jogoFinalizado || carregando) return;

    setCarregando(true);

    try {
      const carta = await puxarCartaDoBaralho(idBaralho);
      if (carta.value === "JOKER") {
        if (vez === "Maria") {
          setCartasMaria((prevCartas) => [...prevCartas, carta]);
          setMensagemFinal(
            "Maria pegou o coringa! Portanto, Joaquim é o vencedor!"
          );
          setVencedor("Joaquim");
        } else {
          setCartasJoaquim((prevCartas) => [...prevCartas, carta]);
          setMensagemFinal(
            "Joaquim pegou o coringa! Portanto, Maria é a vencedora!"
          );
          setVencedor("Maria");
        }
        setJogoFinalizado(true);
      } else {
        if (vez === "Maria") {
          setCartasMaria((prevCartas) => [...prevCartas, carta]);
          setVez("Joaquim");
        } else {
          setCartasJoaquim((prevCartas) => [...prevCartas, carta]);
          setVez("Maria");
        }
      }
    } catch (error) {
      console.error("Erro ao puxar carta:", error);
    } finally {
      setCarregando(false);
    }
  };

  const determinarVencedor = () => {
    const novaPontuacaoMaria = calcularPontuacao(cartasMaria);
    const novaPontuacaoJoaquim = calcularPontuacao(cartasJoaquim);

    if (novaPontuacaoMaria > novaPontuacaoJoaquim) {
      setVencedor("Maria");
      setMensagemFinal(`Maria venceu, parabéns!`);
    } else if (novaPontuacaoMaria < novaPontuacaoJoaquim) {
      setVencedor("Joaquim");
      setMensagemFinal(`Joaquim venceu, parabéns!`);
    } else {
      setVencedor("Empate");
      setMensagemFinal(`O jogo terminou em empate!`);
    }
  };

  return (
    <div className="jogo">
      <CarregarBaralho setIdBaralho={setIdBaralho} />
      <div className="container">
        <div>
          <h2 className="texto-esquerda">Maria</h2>
          <div className="cartas-maria">
            <CartasJogador cartas={cartasMaria} />
          </div>
        </div>
        <div className="mesa">
          {idBaralho && <Mesa puxarCarta={puxarCarta} jogoFinalizado={jogoFinalizado} />}
        </div>
        <div>
          <div className="cartas-joaquim">
            <CartasJogador cartas={cartasJoaquim} />
          </div>
          <h2 className="texto-direita">Joaquim</h2>
        </div>
      </div>
      {vencedor && (
        <div>
          <h2>{mensagemFinal}</h2>
          {vencedor !== "Empate" && !mensagemFinal.includes("coringa") && (
            <p>
              Pontuação Final de {vencedor}:{" "}
              {vencedor === "Maria" ? calcularPontuacao(cartasMaria) : calcularPontuacao(cartasJoaquim)}
            </p>
          )}
        </div>
      )}
      {vencedor && (
        <button onClick={() => window.location.reload()}>Reiniciar Jogo</button>
      )}
    </div>
  );
};

export default Jogo;

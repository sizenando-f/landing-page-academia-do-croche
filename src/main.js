import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

const elementoData = document.getElementById("data-atual");

const hoje = new Date();

const opcoesDeFormato = { day: "2-digit", month: "2-digit", year: "numeric" };
const dataFormatada = hoje.toLocaleDateString("pt-BR", opcoesDeFormato);

if (elementoData) {
  elementoData.textContent = dataFormatada;
}

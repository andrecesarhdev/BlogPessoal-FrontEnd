/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";

// consumindo api com axios 
const api = axios.create({
  baseURL: 'https://projeto-blogpessoal-b1m4.onrender.com/'
})
// função generica pra fazer um pedido de post 
export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url,dados)
  setDados(resposta.data)
}
export const login = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url,dados)
  setDados(resposta.data)
}
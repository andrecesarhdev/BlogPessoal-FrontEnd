/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardTemas/CardTema";

function ListaTemas() {
  //constante navigate, que usa o hook useNavigate(). Com ela, consigo redirecionar o usuário para outras páginas da aplicação sempre que necessário
  const navigate = useNavigate();

  //Criei o estado isLoading, do tipo boolean, com valor inicial false, usando o hook useState
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //O estado temas, inicializado como um array vazio do tipo Tema. Usei Generics do TypeScript para garantir que o estado só armazene objetos dessa interface
  const [temas, setTemas] = useState<Tema[]>([]);

  // Usei useContext(AuthContext) para acessar os valores do contexto, desestruturando o estado usuario e a função handleLogout fornecidos pelo provedor AuthProvider
  const { usuario, handleLogout } = useContext(AuthContext);

  //A constante token, que recebe o JWT do usuário autenticado. Esse token será enviado em requisições a endpoints protegidos, garantindo que apenas usuários autenticados acessem os recursos da aplicação.
  const token = usuario.token;

  //Usei o hook useEffect para monitorar mudanças no estado token do usuário.
  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  // O hook useEffect para chamar a função buscarTemas() sempre que houver uma alteração no número de itens do estado temas.
  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  //A função buscarTemas, responsável por buscar todos os temas no Backend e atualizar o estado temas com os resultados.
  async function buscarTemas() {
    //try/catch para tratar erros ao enviar a requisição GET para o backend
    try {
      // O estado isLoading, indica que o carregamento está em andamento.
      setIsLoading(true);

      // A função buscar da Service, passando três argumentos:
      // A URL do endpoint (/temas), que retorna a lista de temas;
      // A função setTemas, que atualiza o estado com os dados retornados;
      // O objeto headers, contendo a propriedade Authorization, que envia o token JWT do usuário logado
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && temas.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Tema foi encontrado!
            </span>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-2 
             lg:grid-cols-3 gap-8"
          >
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default ListaTemas;

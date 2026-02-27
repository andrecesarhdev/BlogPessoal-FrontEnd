import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
  tema: Tema;
}
function CardTema({ tema }: CardTemaProps) {
  return (
    <div className=" border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between">
      <header className="py-2 px-6 bg-gray-300 text-black font-bold text-2xl">
        Tema
      </header>
      <p className="p-8 text-3xl bg-slate-100 h-full">{tema.descricao}</p>

      <div className=" flex ">
        <Link
          to={`/editartema/${tema.id}`}
          className="w-full text-white bg-gray-500
                    hover:bg-gray-900 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletartema/${tema.id}`}
          className="'text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardTema;

import type  Postagem from "./Postagem";

export default interface Usuario{
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  postagem?: Postagem[] | null;
}
// // O atributo postagem representa o relacionamento entre as Classes Usuario e Postagem, criado no Backend. Para refletir isso no Frontend, utilizamos um array, que armazenará todas as postagens associadas a cada usuário.
// O símbolo de pipe (|) indica que a propriedade pode ter mais de um tipo de dado, funcionando como um “OU” lógico.
// A tipagem null indica que a propriedade pode ser nula, ou seja, o usuário pode não ter postagens associadas.
// O Operador de Encadeamento Opcional (?) junto do atributo postagem sinaliza que o preenchimento deste campo é opcional. Quando criamos um novo objeto baseado nesta Model, esse atributo pode ser omitido. Caso seja preenchido, ele será um array de objetos da Model Postagem ou null, refletindo corretamente a relação entre o usuário e as suas postagens.
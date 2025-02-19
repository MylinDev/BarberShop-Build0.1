import { useEffect, useState, useRef } from 'react';
import './style.css';   //React praticamente mistura HTML com JavaScript
import Trash from '../../assets/trash-svgrepo-com.png';
import api from '../../services/api';

//React hooks

function Home() {
  const [users, setUsers] = useState([]); //para eu ver as alterações na tela
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
  const inputTelefone = useRef();

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuarios');
      console.log('Usuários recebidos:', usersFromApi.data); // Log para verificar os dados recebidos
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async function createUsers() {
    try {
      const newUser = {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
        telefone: inputTelefone.current.value,
      };
      console.log('Criando usuário:', newUser); // Log para verificar os dados enviados
      await api.post('/usuarios', newUser);
      getUsers(); // Atualiza a lista de usuários após a criação
      // Limpa os campos de entrada
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';
      inputTelefone.current.value = '';
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }

  async function deleteUsers(id) {
    try {
      console.log('Deletando usuário com ID:', id); // Log para verificar o ID do usuário a ser deletado
      await api.delete(`/usuarios/${id}`);
      getUsers(); // Atualiza a lista de usuários após a exclusão
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

  useEffect(() => {
    getUsers(); // Executa tudo ao abrir a página
  }, []);

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type='text' ref={inputName} />
        <input placeholder="Idade" name="idade" type='number' ref={inputAge} />
        <input placeholder="E-mail" name="email" type='email' ref={inputEmail} />
        <input placeholder="Telefone" name="telefone" type='text' ref={inputTelefone} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {users.length > 0 ? (
        users.map(user => (
          <div key={user.id} className='card'>   
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
              <p>Telefone: <span>{user.telefone}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="Delete" className="trash-icon" />
            </button>
          </div>
        ))
      ) : (
        <p>Nenhum usuário cadastrado.</p>
      )}
    </div>
  );
}

export default Home;

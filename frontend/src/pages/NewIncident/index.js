import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from "../../services/api";
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {

    const history = useHistory();
    const ongId = localStorage.getItem("ongId");

    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [value, setValue] = useState('');

    async function handleSubmit(env) {
        env.preventDefault();
        try {
          await api.post(
            "incidents",
            {
              title,
              description,
              value
            },
            {
              headers: {
                Authorization: ongId
              }
            }
          );
          history.push("/profile");
        } catch (error) {
          alert("Error ao cadastrar caso");
        }
      }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descrevo o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para a home
            </Link>

                </section>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Titulo do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setdescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
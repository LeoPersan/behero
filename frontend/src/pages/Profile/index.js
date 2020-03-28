import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import {vermelho} from './styles.scss';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if (ongName == null) {
            history.push('/');
        }
    },[ongName,history]);

    useEffect(()=> {
        api.get('/profile',{
            headers:{Authorization:ongId}
        }).then((response) =>{
            setIncidents(response.data);
        })
    },[ongId]);

    async function handlerLogout(e) {
        e.preventDefault();
        try {
            localStorage.clear();
            history.push('/');
        } catch (error) {
            alert('Erro no Logout!');
        }
    }

    async function handleDeleteIncident(id) {
        try {
            api.delete(`/incidents/${id}`,{
                headers:{Authorization:ongId}
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso');
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadatrar novo caso
                </Link>
                <button onClick={handlerLogout} type="button">
                    <FiPower size={18} color={vermelho} />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
                        <button type="button">
                            <FiTrash2 onClick={() => handleDeleteIncident(incident.id)} size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
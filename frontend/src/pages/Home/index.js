/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";

import { Container } from "./styles";

import api from "../../services/api";

import Main, { DevItem, Info } from "../../components/Main";

import DevForm from "../../components/DevForm";

export default function Home() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      const data = response.data.map(dev => ({
        ...dev,
        listTechs: dev.techs.join(", ")
      }));

      setDevs(data);
    }
    loadDevs();
  }, []);

  async function handleSubmit(data) {
    const response = await api.post("/devs", data);

    const dataDev = {
      ...response.data,
      listTechs: response.data.techs.join(", ")
    };

    setDevs([...devs, dataDev]);
  }

  return (
    <Container>
      <DevForm onSubmit={handleSubmit} />

      <Main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id}>
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <Info>
                  <strong>{dev.name}</strong>
                  <span>{dev.listTechs}</span>
                </Info>
              </header>
              <p>{dev.bio}</p>
              <a
                href={`https://github.com/${dev.github_username}`}
                target="_blank"
              >
                Perfil
              </a>
            </DevItem>
          ))}
        </ul>
      </Main>
    </Container>
  );
}

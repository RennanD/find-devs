/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";

import { Container } from "./styles";

import api from "../../services/api";

import Sidebar, { Block, Group } from "../../components/Sidebar";
import Main, { DevItem, Info } from "../../components/Main";

export default function Home() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [username, setUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          setLatitude(latitude);
          setLongitude(longitude);
        },
        err => {
          console.log(err);
        },
        {
          timeout: 30000
        }
      );
    }
    getLocation();
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      const data = response.data.map(dev => ({
        ...dev,
        techs: dev.techs.join(", ")
      }));

      setDevs(data);
    }
    loadDevs();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/devs", {
      github_username: username,
      techs,
      latitude,
      longitude
    });

    const data = {
      ...response.data,
      techs: response.data.techs.join(", ")
    };

    setUsername("");
    setTechs("");

    setDevs([...devs, data]);
  }

  return (
    <Container>
      <Sidebar>
        <strong>Cadastrar</strong>
        <form>
          <Block>
            <label htmlFor="github_username">Usuário do Github</label>
            <input
              type="text"
              name="github_username"
              id="github_username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Block>

          <Block>
            <label htmlFor="techs">Tecnologias</label>
            <input
              type="text"
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </Block>

          <Group>
            <Block>
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </Block>

            <Block style={{ marginTop: 0 }}>
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </Block>
          </Group>

          <button type="submit" onClick={handleSubmit}>
            Salvar
          </button>
        </form>
      </Sidebar>

      <Main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id}>
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <Info>
                  <strong>{dev.name}</strong>
                  <span>{dev.techs}</span>
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

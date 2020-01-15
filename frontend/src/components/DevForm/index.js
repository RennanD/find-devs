import React, { useEffect, useState } from "react";

import Sidebar, { Block, Group } from "../../components/Sidebar";

export default function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [username, setUsername] = useState("");
  const [techs, setTechs] = useState("");

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

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username: username,
      techs,
      latitude,
      longitude
    });

    setUsername("");
    setTechs("");
  }

  return (
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
  );
}

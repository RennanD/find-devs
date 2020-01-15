import React from "react";

import { Container } from "./styles";

import Sidebar, { Block, Group } from "../../components/Sidebar";
import Main from "../../components/Main";

export default function Home() {
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
            />
          </Block>

          <Block>
            <label htmlFor="techs">Tecnologias</label>
            <input type="text" name="techs" id="techs" required />
          </Block>

          <Group>
            <Block>
              <label htmlFor="latitude">Latitude</label>
              <input type="text" name="latitude" id="latitude" required />
            </Block>

            <Block style={{ marginTop: 0 }}>
              <label htmlFor="longitude">Longitude</label>
              <input type="text" name="longitude" id="longitude" required />
            </Block>
          </Group>

          <button type="submit">Salvar</button>
        </form>
      </Sidebar>
      <Main></Main>
    </Container>
  );
}

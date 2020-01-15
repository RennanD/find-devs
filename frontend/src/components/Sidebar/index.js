import styled from "styled-components";

import { darken } from "polished";

const Sidebar = styled.aside`
  width: 320px;
  background: #fff;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  padding: 30px 20px;

  strong {
    font-size: 20px;
    text-align: center;
    display: block;
    color: #333;
  }

  form {
    margin-top: 30px;

    button {
      width: 100%;
      border: 0;
      margin-top: 30px;
      background: #7159c1;
      padding: 15px 20px;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.5s;

      &:hover {
        background: ${darken(0.03, "#7159c1")};
      }
    }
  }
`;

export const Block = styled.div`
  & + & {
    margin-top: 20px;
  }

  label {
    color: #acacac;
    font-size: 14px;
    font-weight: bold;
    display: block;
  }

  input {
    width: 100%;
    height: 32px;
    font-size: 14px;
    color: #666;
    border: 0;
    border-bottom: 1px solid #eee;
  }
`;

export const Group = styled.div`
  margin-top: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

export default Sidebar;

import axios from "axios";

import Dev from "../models/Dev";

import { findConnections, sendMessege } from "../../websocket";

import parseArray from "../../utils/parseArray";

class DevController {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  }

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
      const devTechs = parseArray(techs);

      const { name, login, avatar_url, bio } = response.data;

      dev = await Dev.create({
        name: name ? name : login,
        github_username,
        avatar_url,
        bio,
        techs: devTechs,
        location
      });
      const sendSocketTo = findConnections({ latitude, longitude }, devTechs);

      sendMessege(sendSocketTo, "newDev", dev);
    }

    return res.json(dev);
  }
}

export default new DevController();

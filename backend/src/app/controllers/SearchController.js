import Dev from "../models/Dev";
import parseArray from "../../utils/parseArray";

class SearchController {
  async index(req, res) {
    const { techs, latitude, longitude } = req.query;

    const searchTechs = parseArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: searchTechs
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    if (!devs.length)
      return res.status(404).json({ error: "Nenhum Dev encontrado." });

    return res.json(devs);
  }
}

export default new SearchController();

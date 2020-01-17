import Dev from "../models/Dev";
import parseArray from "../../utils/parseArray";

class SearchController {
  async index(req, res) {
    const { techs, latitude, longitude } = req.query;

    const searchTechs = parseArray(techs);

    console.log(searchTechs);

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
    return res.json(devs);
  }
}

export default new SearchController();

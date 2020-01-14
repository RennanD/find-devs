export default function parseArray(array) {
  return array.split(",").map(tech => tech.trim());
}

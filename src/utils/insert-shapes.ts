export function insertShapes(text: string) {
  const map = {
    "--TRIANGLE--": `▲ (1")`,
    "--CIRCLE--": `● (2")`,
    "--SQUARE--": `■ (3")`,
    "--PENTAGON--": `⬟ (6")`,
  };
  return text.replace(
    /(--TRIANGLE--|--CIRCLE--|--SQUARE--|--PENTAGON--)/g,
    (matched) => map[matched]
  );
}

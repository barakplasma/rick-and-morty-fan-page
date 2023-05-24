export const Graph = ({
  characters
}: {
  characters: { name: string; popularity: number }[];
}) => {
  const factor = 10;
  const totalHeight = 600;
  return (
    <svg
      className="chart"
      width="1000"
      height="400"
      aria-labelledby="title"
      role="img"
      viewBox={`0 0 100 ${totalHeight + 200}`}
    >
      <title id="title">shows a graph of characters popularity</title>
      {Array(totalHeight / 20 + 1)
        .fill(0)
        .map((_, i) => i * 20)
        .map((l) => (
          <g key={l}>
            <text
              x={characters.length * 4 * factor}
              y={l + 5}
              fontSize=".8rem"
              fill="white"
            >
              {60 - l / 10}
            </text>
            <line
              x1="0"
              y1={l}
              x2={characters.length * 4 * factor}
              y2={l}
              stroke="white"
            />
          </g>
        ))}
      {characters.map((c, i) => {
        return (
          <g className="bar" key={c.name}>
            <title>{`${c.name} was in ${c.popularity} episodes`}</title>
            <rect
              fill={`rgb(${i * 100}, 15, 50)`}
              width={factor * 2}
              height={c.popularity * factor}
              x={i * factor * 4}
              y={totalHeight - c.popularity * factor}
            ></rect>
            <text
              transform="rotate(90)"
              x={600}
              y={i * -(factor * 4) - 6}
              fill="white"
            >
              {c.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

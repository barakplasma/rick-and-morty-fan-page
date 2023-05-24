import "./styles.css";
import { residentsOfLocation } from "./Client";
import { Graph } from "./Graph";
import useSWR from "swr";

export default function App() {
  const { data, isLoading } = useSWR("1", residentsOfLocation);

  return (
    <div className="App">
      <h1>Rick and Morty Stats</h1>
      <h3>
        by <a href="https://github.com/barakplasma">barakplasma</a>
      </h3>
      <section>
        <h2>Least popular Characters</h2>
        {isLoading && "loading character episode info"}
        {!isLoading && data && (
          <table>
            <thead>
              <tr>
                <th>Character Name</th>
                <th>Origin & Dimension</th>
                <th>Status</th>
                <th>Species</th>
                <th>Gender</th>
                <th>Popularity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((character) => {
                return (
                  <tr key={character.id}>
                    <td>{character.name}</td>
                    <td>{character.origin.name}</td>
                    <td>{character.status}</td>
                    <td>{character.species}</td>
                    <td>{character.gender}</td>
                    <td>{character.episode.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
      <section>
        <h2>Selected Character Popularity Graph</h2>
        <Graph
          characters={[
            { name: "Abradolf Lincler", popularity: 3 },
            { name: "Arcade Alien", popularity: 5 },
            { name: "Morty Smith", popularity: 51 },
            { name: "Birdperson", popularity: 8 },
            { name: "Mr. Meeseeks", popularity: 6 }
          ]}
        />
      </section>
    </div>
  );
}

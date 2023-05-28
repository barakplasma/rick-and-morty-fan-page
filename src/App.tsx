import "./styles.css";
import { residentsOfLocation, charactersPopularity } from "./Client";
import { Graph } from "./Graph";
import useSWR from "swr";

export default function App() {
  const { data, isLoading } = useSWR("1", residentsOfLocation);
  const { data: popularityCounts, isLoading: isPopularityLoading } = useSWR(
    [
      "Abradolf Lincler",
      "Arcade Alien",
      "Morty Smith",
      "Birdperson",
      "Mr. Meeseeks"
    ],
    charactersPopularity
  );

  const leastPopularCharacter = data?.slice(-1)[0];
  return (
    <div className="App">
      <h1>Rick and Morty Stats</h1>
      <h3>
        by <a href="https://github.com/barakplasma">barakplasma</a>
      </h3>
      <section>
        <h2>Least popular Characters</h2>
        {isLoading && "loading character episode info"}
        {!isLoading && leastPopularCharacter && (
          <table>
            <tbody>
              <tr>
                <td rowSpan={7}>
                  <img
                    style={{ height: "12rem" }}
                    src={leastPopularCharacter.image}
                    alt="character avatar"
                  />
                </td>
              </tr>
              <tr>
                <th>Character Name</th>
                <td>{leastPopularCharacter.name}</td>
              </tr>
              <tr>
                <th>Origin & Dimension</th>
                <td>{leastPopularCharacter.origin.name}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{leastPopularCharacter.status}</td>
              </tr>
              <tr>
                <th>Species</th>
                <td>{leastPopularCharacter.species}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{leastPopularCharacter.gender}</td>
              </tr>
              <tr>
                <th>Popularity</th>
                <td>{leastPopularCharacter.episode.length}</td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
      <section>
        <h2>Selected Character Popularity Graph</h2>
        {!isPopularityLoading && popularityCounts && (
          <Graph characters={popularityCounts} />
        )}
      </section>
    </div>
  );
}

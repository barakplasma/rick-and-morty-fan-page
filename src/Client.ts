export const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ICharacter {
  episode: Array<unknown>;
  name: string;
  id: number;
  image: string;
  status: string;
  species: string;
  origin: { name: string };
  gender: string;
}

export const residentsOfLocation = async (location: string) => {
  const earth = await fetcher(
    "https://rickandmortyapi.com/api/location/" + location
  );
  const characters = await Promise.allSettled<ICharacter>(
    earth.residents.map((l: string) => fetcher(l))
  );
  const unPopularCharacters = characters.reduce((acc, cur) => {
    if (cur.status === "fulfilled" && cur.value.episode.length < 2) {
      acc.push(cur.value);
    }
    return acc;
  }, [] as ICharacter[]);
  unPopularCharacters.sort((a, b) => a.name.localeCompare(b.name));
  return unPopularCharacters;
};

const getCharacter = async (name: string) => {
  return await fetcher(
    `https://rickandmortyapi.com/api/character/?name=${name}`
  );
};

export const charactersPopularity = async (characters: string[]) => {
  const charactersData = await Promise.allSettled(characters.map(getCharacter));
  return charactersData.flatMap(
    (c) =>
      c.status !== "rejected" && {
        name: c.value.results[0].name,
        popularity: c.value.results.reduce(
          (acc: number, cur: { episode: [] }) => acc + cur.episode.length,
          0
        )
      }
  );
};

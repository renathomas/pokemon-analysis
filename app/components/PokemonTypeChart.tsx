"use client";
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import Loading from "./Loading";
import SingleVsDual from "./SingleVsDual ";
import { useSearchTextForPokemonCardContext } from "../contexts/searchTextForPokemonCard";
import ErrorPage from "./Error";
import Image from "next/image";

interface PokemonResponse {
  name: string;
  url: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

function toUpperCaseFirstLetter(word: string): string {
  if (!word) return word; // Handle empty string case
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const PokemonTypeChart = () => {
  const { searchTextForPokemonCard } = useSearchTextForPokemonCardContext();
  const [pokemonTypes, setPokemonTypes] = useState<{ [key: string]: number }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [singleVsDual, setSingleVsDual] = useState<{
    single: number;
    dual: number;
  }>({ single: 0, dual: 0 });

  const getPokemonTypes = async (data: PokemonResponse[]) => {
    const pokemonTypes: { [key: string]: number } = {};
    let singleTypeCount = 0;
    let dualTypeCount = 0;

    await Promise.all(
      data.map(async (pokemon: PokemonResponse, id) => {
        const response = await fetch(`/api/pokemon/${id + 1}`);
        if (!response.ok)
          throw new Error(
            `${response.status} ${response.statusText} (${response.url})`
          );
        const types: PokemonType[] = await response.json();
        const typeCount = types.length;

        if (typeCount === 1) {
          singleTypeCount++;
        } else if (typeCount === 2) {
          dualTypeCount++;
        }

        types.forEach((type: PokemonType) => {
          pokemonTypes[toUpperCaseFirstLetter(type.type.name)] =
            (pokemonTypes[toUpperCaseFirstLetter(type.type.name)] || 0) + 1;
        });
      })
    );
    setPokemonTypes(pokemonTypes);
    setSingleVsDual({ single: singleTypeCount, dual: dualTypeCount });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/pokemon/`);
      if (!response.ok)
        throw new Error(
          `${response.status} ${response.statusText} (${response.url})`
        );
      const pokemonList = await response.json();
      const filtered = pokemonList.filter((pokemon: PokemonResponse) =>
        pokemon.name
          .toLowerCase()
          .includes(searchTextForPokemonCard.toLowerCase())
      );
      await getPokemonTypes(filtered);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [searchTextForPokemonCard]);

  if (loading) return <Loading />;

  if (error) return <ErrorPage err={error} />;

  // Check if pokemonTypes has data
  const hasData = Object.keys(pokemonTypes).length > 0;

  return (
    <div className="p-4 w-full h-full  flex">
      {hasData ? (
        <div className="flex justify-around lg:flex-row flex-col w-full">
          <BarChart data={pokemonTypes} />
          <SingleVsDual data={singleVsDual} />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <div className="text-[24px] flex text-[#555] w-full justify-center items-center font-bold mt-50px p-5 ">
            <Image
              src="/warning.png"
              alt="waring icon"
              className="mr-3"
              width={48}
              height={48}
            />
            <p className="mt-1">No Pokémon Types Found </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonTypeChart;

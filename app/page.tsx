import PokemonTypeChart from "./components/PokemonTypeChart";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-122px)] h-full flex flex-col items-center justify-center">
      <PokemonTypeChart />
    </div>
  );
}

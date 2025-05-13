const BattleGuide = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4 text-blue-600">
        Beyblade Battle Simulator: Quick Guide
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">How Wins Are Calculated</h3>

        <div className="mb-4">
          <h4 className="text-medium text-gray-700 mb-1">1. 3 Possible Outcomes</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              <span className=" text-sm font-medium">KO (Knock-Out)</span> - Strong attack beats
              weak defense
            </li>
            <li>
              <span className=" text-sm font-medium">Burst</span> - High attack can burst weak
              resistance
            </li>
            <li>
              <span className=" text-sm font-medium">Out-Spin</span> - Better stamina wins if battle
              lasts
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-1">2. Key Factors</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              <span className="text-sm font-medium">Attack (ATK)</span> vs{' '}
              <span className="font-medium">Defense (DEF)</span> → KO chance
            </li>
            <li>
              <span className="text-sm font-medium">Stamina (STA)</span> → Out-spin chance
            </li>
            <li>
              <span className="text-sm font-medium">Weight</span> → Heavier = harder to KO
            </li>
            <li>
              <span className="text-sm font-medium">Spin (R/L)</span> → Opposite spin = more KOs
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-1">3. Final Win %</h4>
          <p className="text-sm text-gray-600">
            Simulator runs <span className="font-medium">10,000 battles</span> and averages results.
          </p>
          <div className="mt-2 p-3 bg-gray-50 rounded-md">
            <p className="font-medium text-gray-700 text-md">Example:</p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Aero Pegasus (Attack)</span> vs{' '}
              <span className="font-medium">Black Shell (Defense)</span>
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">65% vs 35% win rate</span> (Aero wins more by stamina)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-md font-semibold mb-2 text-blue-700">Quick Tips</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✅</span>
            <span className="text-gray-700">
              <span className="font-medium">Attack Types</span> beat low-defense opponents
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✅</span>
            <span className="text-gray-700">
              <span className="font-medium">Defense Types</span> survive longer but lose to stamina
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✅</span>
            <span className="text-gray-700">
              <span className="font-medium">Weight helps</span> resist knockouts
            </span>
          </li>
        </ul>
        <p className="mt-3 text-center text-gray-600 italic">
          Tweak stats in the simulator and see who wins! 🚀
        </p>
      </div>
    </div>
  );
};

export default BattleGuide;

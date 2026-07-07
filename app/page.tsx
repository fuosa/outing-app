export default function Home() {
  const spots = [
    {
      id: 1,
      name: "ブーランジェリー○○",
      category: "パン屋",
      emoji: "🍞",
      location: "東京都渋谷区",
      memo: "クロワッサンが絶品。トイレあり・清潔✅",
      color: "orange"
    },
    {
      id: 2,
      name: "○○温泉",
      category: "温泉",
      emoji: "♨️",
      location: "神奈川県箱根町",
      memo: "露天風呂が最高。トイレ綺麗✅",
      color: "blue"
    },
    {
      id: 3,
      name: "○○BBQ場",
      category: "BBQ",
      emoji: "🔥",
      location: "千葉県富津市",
      memo: "海が見えて最高。トイレ普通",
      color: "green"
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">
            🗺️ お出かけ記録
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            記録したスポット
          </h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            ＋ 追加
          </button>
        </div>

        <div className="space-y-4">
          {spots.map((spot) => (
            <div key={spot.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {spot.emoji} {spot.category}
                  </span>
                  <h3 className="font-semibold text-gray-800 mt-2">
                    {spot.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {spot.location}
                  </p>
                </div>
                <span className="text-2xl">⭐️</span>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                {spot.memo}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
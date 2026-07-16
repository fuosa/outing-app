"use client"

import { useState , useEffect} from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("パン屋")
  const [location, setLocation] = useState("")
  const [spots, setSpots] = useState<any[]>([])

  useEffect(() => {
    fetchSpots()
  }, [])

  const fetchSpots = async () => {
    const { data, error } = await supabase
      .from("spots")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setSpots(data)
  }
  const categoryEmojis: { [key: string]: string } = {
    "パン屋": "🍞",
    "温泉": "♨️",
    "BBQ": "🔥",
    "グルメ": "🍽️",
    "離島": "🏝️",
    "その他": "📍",
  }
  const handleAddSpot = async () => {
    if (name === "") return

    const { error } = await supabase.from("spots").insert({
      name: name,
      category: category,
      emoji: categoryEmojis[category],
      location: location,
      memo: "",
    })

    if (error) {
      console.error(error)
      return
    }

    setName("")
    setLocation("")
    setIsFormOpen(false)
    fetchSpots()
  }
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
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            ＋ 追加
          </button>
        </div>

        {isFormOpen && (
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              新しいスポットを追加
            </h3>
            <input
              type="text"
              placeholder="スポット名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2"
            />
            <input
              type="text"
              placeholder="場所"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2"
            >
              <option value="パン屋">🍞 パン屋</option>
              <option value="温泉">♨️ 温泉</option>
              <option value="BBQ">🔥 BBQ</option>
              <option value="グルメ">🍽️ グルメ</option>
              <option value="離島">🏝️ 離島</option>
              <option value="その他">📍 その他</option>
            </select>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAddSpot}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm flex-1"
              >
                追加する
              </button>
              <button
                onClick={() => setIsFormOpen(false)}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

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
"use client"

import { useState , useEffect} from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("パン屋")
  const [editingId, setEditingId] = useState<number | null>(null)
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
  const handleDeleteSpot = async (id: number) => {
    const confirmed = window.confirm("このスポットを削除しますか？")
    if (!confirmed) return

    const { error } = await supabase.from("spots").delete().eq("id", id)

    if (error) {
      console.error(error)
      return
    }

    fetchSpots()
  }
  const handleEditStart = (spot: any) => {
    setEditingId(spot.id)
    setName(spot.name)
    setLocation(spot.location)
    setCategory(spot.category)
  }
  const handleUpdateSpot = async () => {
  if (name === "") return

  const { error } = await supabase
    .from("spots")
    .update({
      name: name,
      category: category,
      emoji: categoryEmojis[category],
      location: location,
    })
    .eq("id", editingId)

    if (error) {
      console.error(error)
      return
    }

    setName("")
    setLocation("")
    setEditingId(null)
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
          <div className="rounded-2xl p-4 shadow-sm mb-4 border-2 bg-white border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">✨</span>
              <h3 className="font-semibold text-gray-800">
                新しいスポットを追加
              </h3>
            </div>
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
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm flex-1 font-medium"
              >
                追加する
              </button>
              <button
                onClick={() => {
                  setIsFormOpen(false)
                  setName("")
                  setLocation("")
                }}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {spots.map((spot) => (
            <div key={spot.id}>
              {editingId === spot.id ? (
                <div className="rounded-2xl p-4 shadow-sm border-2 bg-amber-50 border-amber-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">✏️</span>
                    <h3 className="font-semibold text-gray-800">
                      スポットを編集中
                    </h3>
                  </div>
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
                      onClick={handleUpdateSpot}
                      className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm flex-1 font-medium"
                    >
                      変更を保存する
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null)
                        setName("")
                        setLocation("")
                      }}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-4 shadow-sm">
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
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditStart(spot)}
                        className="text-gray-300 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteSpot(spot.id)}
                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    {spot.memo}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
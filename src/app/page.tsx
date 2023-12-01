import Link from "next/link"

export default function Home() {
  return (
    <main className="w-full flex bg-stone-900 flex-col items-center justify-center min-h-screen p-24">
      <div className="w-full md:w-6/12 text-center p-8">
        <h1 className="text-9xl font-vina text-left shadow text-white">Prestoo</h1>
        <p className="text-right underline text-blue-500">Share your amazing presentations and get amazing feedback <span className="text-4xl">.</span></p>
      </div>
      <div className="flex flex-row justify-center gap-8 items-center">
        <a href="/presentation/prepare" className="py-4 px-4 text-2xl text-white bg-blue-900 font-extrabold rounded-lg shadow-[0.1em]">Start a Presentation</a>
        <Link href="/auth/signup" className="py-4 px-4 text-xl text-zinc-800 bg-white font-extrabold rounded-lg">Sign Up</Link>
      </div>
    </main>
  )
}

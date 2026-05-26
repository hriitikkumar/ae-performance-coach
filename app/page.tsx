"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [insight, setInsight] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!transcript.trim()) return;
    setStatus("loading");
    setInsight("");
    setError("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const text = await res.text();
      if (!text) {
        throw new Error("No response from server — the request may have timed out.");
      }

      let data: { insight?: string; error?: string };
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Unexpected server response. Please try again.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setInsight(data.insight ?? "");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  const isLoading = status === "loading";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        {/* Header */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-2">
            Gushwork · AEO Sales
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            AE Performance Coach
          </h1>
          <p className="mt-2 text-zinc-400 text-sm">
            Paste a sales call transcript. Get one sharp coaching insight —
            straight to your inbox.
          </p>
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="transcript"
            className="text-xs font-medium text-zinc-400 uppercase tracking-widest"
          >
            Call Transcript
          </label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste the full call transcript here…"
            rows={14}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleAnalyze}
          disabled={isLoading || !transcript.trim()}
          className="self-start px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {isLoading ? "Analyzing…" : "Analyze Call"}
        </button>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <span className="inline-block h-4 w-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            Reviewing your call against the rubric…
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="rounded-xl border border-red-800 bg-red-950/40 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Insight */}
        {status === "success" && insight && (
          <div className="rounded-xl border border-indigo-800/50 bg-indigo-950/30 p-6">
            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">
              Coaching Insight
            </p>
            <p className="text-zinc-100 leading-relaxed text-[15px]">
              {insight}
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              Insight also sent to hritik01kumar@gmail.com
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

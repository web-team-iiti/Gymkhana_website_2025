"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteScore } from "../actions";
import { FaTrash, FaEdit, FaFilePdf, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";

export default function ManageScoresClient({ initialScores }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Group scores by event
  const groupedScores = initialScores.reduce((acc, score) => {
    if (!acc[score.event_id]) {
      acc[score.event_id] = {
        event_id: score.event_id,
        event_name: score.event_name,
        scores: []
      };
    }
    acc[score.event_id].scores.push(score);
    return acc;
  }, {});

  const groupedArray = Object.values(groupedScores);
  const [expandedEventId, setExpandedEventId] = useState(
    groupedArray.length > 0 ? groupedArray[0].event_id : null
  );

  const toggleEvent = (eventId) => {
    setExpandedEventId(prev => prev === eventId ? null : eventId);
  };

  const handleDelete = async (eventId, contingentId, eventName, contingentName) => {
    if (!window.confirm(`Are you sure you want to delete the score for ${contingentName} in ${eventName}?\n\nThis will permanently delete the score and the uploaded judging sheet.`)) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await deleteScore(eventId, contingentId);
      if (result.error) {
        setError(result.error);
      } else {
        router.refresh(); // Refresh page to fetch latest data from DB
      }
    } catch (err) {
      setError("An unexpected error occurred while deleting.");
    } finally {
      setLoading(false);
    }
  };

  if (initialScores.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-950 rounded-xl border border-gray-800 text-sm">
        You haven't submitted any scores yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="mb-4 p-4 rounded-xl font-medium text-sm flex items-center gap-3 bg-red-500/10 text-red-400 border border-red-500/20">
          <FaExclamationCircle size={18} />
          {error}
        </div>
      )}

      {groupedArray.map(group => {
        const isExpanded = expandedEventId === group.event_id;
        return (
          <div key={group.event_id} className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
            {/* Accordion Header */}
            <button 
              onClick={() => toggleEvent(group.event_id)}
              className="w-full flex items-center justify-between p-4 sm:p-5 bg-gray-900 hover:bg-gray-800 transition-colors border-b border-transparent data-[expanded=true]:border-gray-800"
              data-expanded={isExpanded}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-bold text-sm border border-blue-500/20`}>
                  {group.scores.length}
                </span>
                <h2 className="text-lg font-bold text-white text-left">{group.event_name}</h2>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Accordion Content */}
            {isExpanded && (
              <div className="p-4 bg-gray-950 animate-in slide-in-from-top-2 fade-in duration-200">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-800">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900 text-gray-400 border-b border-gray-800">
                      <tr>
                        <th className="p-4">Contingent</th>
                        <th className="p-4 text-center">Score</th>
                        <th className="p-4 text-center">Judging Sheet</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {group.scores.map((score, idx) => (
                        <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                          <td className="p-4 text-gray-200 font-medium">{score.contingent_name}</td>
                          <td className="p-4 text-center font-bold text-yellow-500 text-lg">{score.score}</td>
                          <td className="p-4 text-center">
                            <a href={score.judging_sheet_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors font-semibold">
                              <FaFilePdf /> View PDF
                            </a>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link href="/dashboard/club_head/ibcc" className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors" title="Edit (Re-submit)">
                                <FaEdit size={16} />
                              </Link>
                              <button 
                                onClick={() => handleDelete(score.event_id, score.contingent_id, score.event_name, score.contingent_name)}
                                disabled={loading}
                                className="inline-flex items-center justify-center p-2 text-red-400 hover:text-white hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
                                title="Delete"
                              >
                                <FaTrash size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="grid grid-cols-1 gap-3 md:hidden">
                  {group.scores.map((score, idx) => (
                    <div key={idx} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col gap-3 relative overflow-hidden">
                      <div className="flex justify-between items-start gap-2 border-b border-gray-800/50 pb-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-gray-500 uppercase">Contingent</span>
                          <span className="font-bold text-white text-base break-words">{score.contingent_name}</span>
                        </div>
                        <div className="bg-gray-950 border border-gray-700 px-2.5 py-1 rounded-lg shrink-0">
                          <span className="font-bold text-yellow-500">{score.score} pts</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <a href={score.judging_sheet_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-white bg-blue-500/10 px-3 py-2 rounded-lg transition-colors text-xs font-bold border border-blue-500/20">
                          <FaFilePdf size={12} /> View Sheet
                        </a>
                        <div className="flex items-center gap-2">
                          <Link href="/dashboard/club_head/ibcc" className="px-3 py-2 text-gray-300 hover:text-white bg-gray-800 rounded-lg transition-all text-xs font-bold border border-gray-700 flex items-center gap-1.5">
                            <FaEdit size={12} /> Edit
                          </Link>
                          <button 
                            onClick={() => handleDelete(score.event_id, score.contingent_id, score.event_name, score.contingent_name)}
                            disabled={loading}
                            className="px-3 py-2 text-red-400 hover:text-white bg-red-500/10 rounded-lg transition-all border border-red-500/20 text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <FaTrash size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

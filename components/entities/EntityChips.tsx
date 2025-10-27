'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, TrendingUp } from 'lucide-react';

interface Entity {
  id: string;
  name: string;
  slug: string;
  type: string;
  ticker?: string;
  logo?: string;
  mentionCount: number;
  sentiment?: number;
  relevance?: number;
}

interface EntityChipsProps {
  reportId: string;
  className?: string;
}

export function EntityChips({ reportId, className = '' }: EntityChipsProps) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntities();
  }, [reportId]);

  const fetchEntities = async () => {
    try {
      console.log('🔍 Fetching entities for report:', reportId);
      const response = await fetch(`/api/reports/${reportId}/entities`);
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Entities received:', data.entities);
        setEntities(data.entities || []);
      } else {
        console.error('❌ Failed to fetch entities:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch entities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex gap-2 mb-4 ${className}`}>
        <div className="animate-pulse flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (entities.length === 0) {
    console.log('🔍 No entities to display for report:', reportId);
    return (
      <div className={`flex items-center gap-2 text-xs text-muted-foreground ${className}`}>
        <TrendingUp className="w-3.5 h-3.5" />
        <span>No entities detected in this report</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 font-medium mr-1.5">
        <TrendingUp className="w-3 h-3" />
        <span>ENTITIES:</span>
      </div>

      {entities.map((entity) => (
        <Link
          key={entity.id}
          href={`/entities/${entity.slug}`}
          className="group inline-flex items-center gap-1.5 px-2 py-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 transition-all duration-200 hover:shadow-md hover:scale-105"
        >
          {entity.logo ? (
            <img
              src={entity.logo}
              alt={entity.name}
              className="w-3 h-3 rounded object-cover"
            />
          ) : (
            <Building2 className="w-3 h-3" />
          )}

          <span className="font-medium text-[11px]">{entity.name}</span>

          {entity.ticker && (
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">
              {entity.ticker}
            </span>
          )}

          {/* Mention count badge */}
          {entity.mentionCount > 1 && (
            <span className="flex items-center justify-center min-w-[16px] h-3.5 px-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-[9px] font-bold group-hover:from-blue-700 group-hover:to-indigo-700 transition-colors">
              {entity.mentionCount}
            </span>
          )}

          {/* Sentiment indicator (optional) */}
          {entity.sentiment !== undefined && entity.sentiment !== null && (
            <span
              className={`w-2 h-2 rounded-full ${
                entity.sentiment > 0.3
                  ? 'bg-green-500'
                  : entity.sentiment < -0.3
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
              }`}
              title={`Sentiment: ${entity.sentiment.toFixed(2)}`}
            />
          )}
        </Link>
      ))}
    </div>
  );
}

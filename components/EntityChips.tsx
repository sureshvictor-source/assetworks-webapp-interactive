'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  TrendingDown,
  User,
  Package,
  Globe,
  Coins,
  DollarSign,
  BarChart3,
  Hash
} from 'lucide-react';

interface Entity {
  id: string;
  name: string;
  type: string;
  ticker?: string;
  slug: string;
  mentionCount?: number;
  sentimentScore?: number;
  logo?: string;
}

interface EntityChipsProps {
  entities: Entity[];
  reportId?: string;
  className?: string;
  onEntityClick?: (entity: Entity) => void;
  showSentiment?: boolean;
  showMentionCount?: boolean;
  maxDisplay?: number;
}

const EntityChips: React.FC<EntityChipsProps> = ({
  entities,
  reportId,
  className = '',
  onEntityClick,
  showSentiment = true,
  showMentionCount = false,
  maxDisplay = 10,
}) => {
  const [displayedEntities, setDisplayedEntities] = useState<Entity[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const toDisplay = showAll ? entities : entities.slice(0, maxDisplay);
    setDisplayedEntities(toDisplay);
  }, [entities, showAll, maxDisplay]);

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'COMPANY':
        return Building2;
      case 'PERSON':
        return User;
      case 'PRODUCT':
        return Package;
      case 'CRYPTOCURRENCY':
        return Coins;
      case 'CURRENCY':
        return DollarSign;
      case 'STOCK':
      case 'ETF':
      case 'INDEX':
        return BarChart3;
      case 'COUNTRY':
        return Globe;
      default:
        return Hash;
    }
  };

  const getSentimentColor = (sentiment?: number) => {
    if (!sentiment) return 'bg-gray-100 text-gray-700';
    if (sentiment > 0.3) return 'bg-green-100 text-green-700';
    if (sentiment < -0.3) return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const getSentimentIcon = (sentiment?: number) => {
    if (!sentiment) return null;
    if (sentiment > 0.3) return <TrendingUp className="w-3 h-3" />;
    if (sentiment < -0.3) return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const handleChipClick = (entity: Entity) => {
    if (onEntityClick) {
      onEntityClick(entity);
    }
  };

  if (!entities || entities.length === 0) {
    return null;
  }

  return (
    <div className={`entity-chips ${className}`}>
      <div className="flex flex-wrap gap-2 items-center">
        {displayedEntities.map((entity) => {
          const Icon = getEntityIcon(entity.type);
          const sentimentIcon = getSentimentIcon(entity.sentimentScore);

          return (
            <Link
              key={entity.id}
              href={`/entities/${entity.slug}`}
              onClick={(e) => {
                if (onEntityClick) {
                  e.preventDefault();
                  handleChipClick(entity);
                }
              }}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                transition-all duration-200 hover:scale-105 cursor-pointer
                ${getSentimentColor(entity.sentimentScore)}
              `}
            >
              {entity.logo ? (
                <img
                  src={entity.logo}
                  alt={entity.name}
                  className="w-4 h-4 rounded-full object-cover"
                />
              ) : (
                <Icon className="w-3.5 h-3.5" />
              )}

              <span className="font-medium">{entity.name}</span>

              {entity.ticker && (
                <span className="opacity-75">({entity.ticker})</span>
              )}

              {showSentiment && sentimentIcon && (
                <span className="ml-1">{sentimentIcon}</span>
              )}

              {showMentionCount && entity.mentionCount && entity.mentionCount > 1 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">
                  {entity.mentionCount}
                </span>
              )}
            </Link>
          );
        })}

        {entities.length > maxDisplay && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900
                     bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            +{entities.length - maxDisplay} more
          </button>
        )}

        {showAll && entities.length > maxDisplay && (
          <button
            onClick={() => setShowAll(false)}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900
                     bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default EntityChips;

// Export a loading skeleton component
export const EntityChipsLoader: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 animate-pulse"
        >
          <div className="w-3.5 h-3.5 bg-gray-300 rounded-full" />
          <div className="w-16 h-3 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};

// Export a hook to fetch entities for a report
export const useReportEntities = (reportId?: string) => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;

    const fetchEntities = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/reports/${reportId}/entities`);

        if (!response.ok) {
          throw new Error('Failed to fetch entities');
        }

        const data = await response.json();
        setEntities(data.entities || []);
      } catch (err) {
        console.error('Error fetching entities:', err);
        setError(err instanceof Error ? err.message : 'Failed to load entities');
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, [reportId]);

  return { entities, loading, error };
};
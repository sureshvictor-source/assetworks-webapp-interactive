'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  TrendingDown,
  Calendar,
  Globe,
  Users,
  DollarSign,
  BarChart3,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  Clock,
  Hash,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';

interface EntityData {
  entity: any;
  mentions: any[];
  insights: any[];
  summary: string;
  trends: any[];
  relatedEntities: any[];
}

export default function EntityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<EntityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const slug = params.slug as string;

  useEffect(() => {
    if (slug) {
      fetchEntityData();
    }
  }, [slug]);

  const fetchEntityData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/entities/${slug}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Entity not found');
        }
        throw new Error('Failed to fetch entity data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching entity:', err);
      setError(err instanceof Error ? err.message : 'Failed to load entity');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchEntityData();
    setRefreshing(false);
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'COMPANY':
        return Building2;
      case 'CRYPTOCURRENCY':
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

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num}`;
  };

  const getSentimentColor = (sentiment?: number) => {
    if (!sentiment) return 'text-gray-600';
    if (sentiment > 0.3) return 'text-green-600';
    if (sentiment < -0.3) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getSentimentLabel = (sentiment?: number) => {
    if (!sentiment) return 'Neutral';
    if (sentiment > 0.3) return 'Positive';
    if (sentiment < -0.3) return 'Negative';
    return 'Mixed';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading entity data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="mt-4 text-gray-900 font-semibold">
            {error || 'Failed to load entity'}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { entity, mentions, insights, summary, trends, relatedEntities } = data;
  const Icon = getEntityIcon(entity.type);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3">
                {entity.logo ? (
                  <img
                    src={entity.logo}
                    alt={entity.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                )}

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {entity.name}
                  </h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{entity.type}</span>
                    {entity.ticker && (
                      <>
                        <span>•</span>
                        <span className="font-mono">{entity.ticker}</span>
                      </>
                    )}
                    {entity.sector && (
                      <>
                        <span>•</span>
                        <span>{entity.sector}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={refreshData}
              disabled={refreshing}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-3">Summary</h2>
              <p className="text-gray-700">{summary || entity.description}</p>

              {entity.website && (
                <a
                  href={entity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 mt-4"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Key Metrics */}
            {(entity.marketCap || entity.revenue || entity.employees) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {entity.marketCap && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Market Cap</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatNumber(entity.marketCap)}
                      </p>
                    </div>
                  )}
                  {entity.revenue && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Revenue</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatNumber(entity.revenue)}
                      </p>
                    </div>
                  )}
                  {entity.employees && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Employees</p>
                      <p className="text-xl font-bold text-gray-900">
                        {entity.employees.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {entity.peRatio && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">P/E Ratio</p>
                      <p className="text-xl font-bold text-gray-900">
                        {entity.peRatio.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recent Insights */}
            {insights.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Recent Insights
                </h2>
                <div className="space-y-4">
                  {insights.slice(0, 5).map((insight: any) => (
                    <div
                      key={insight._id}
                      className={`p-4 rounded-lg border ${
                        insight.priority === 'high'
                          ? 'border-red-200 bg-red-50'
                          : insight.priority === 'critical'
                          ? 'border-purple-200 bg-purple-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {insight.title}
                          </h3>
                          <p className="text-sm text-gray-700 mt-1">
                            {insight.content}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            insight.type === 'RISK'
                              ? 'bg-red-100 text-red-700'
                              : insight.type === 'OPPORTUNITY'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {insight.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Mentions */}
            {mentions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Recent Mentions
                </h2>
                <div className="space-y-3">
                  {mentions.slice(0, 10).map((mention: any) => (
                    <div
                      key={mention._id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <p className="text-sm text-gray-700">{mention.context}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {format(new Date(mention.createdAt), 'MMM d, yyyy')}
                        </span>
                        {mention.sentiment !== undefined && (
                          <span className={`flex items-center ${getSentimentColor(mention.sentiment)}`}>
                            {mention.sentiment > 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : mention.sentiment < 0 ? (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            ) : null}
                            {getSentimentLabel(mention.sentiment)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Related */}
          <div className="space-y-6">
            {/* Sentiment Analysis */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Sentiment Analysis</h2>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getSentimentColor(entity.sentimentScore)}`}>
                  {getSentimentLabel(entity.sentimentScore)}
                </div>
                {entity.sentimentScore !== undefined && (
                  <p className="text-sm text-gray-600 mt-1">
                    Score: {(entity.sentimentScore * 100).toFixed(0)}%
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-4">
                  Based on {entity.mentionCount} mentions
                </p>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Activity</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Mentions</span>
                  <span className="font-semibold">{entity.mentionCount}</span>
                </div>
                {entity.firstMentioned && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">First Seen</span>
                    <span className="text-sm">
                      {format(new Date(entity.firstMentioned), 'MMM d, yyyy')}
                    </span>
                  </div>
                )}
                {entity.lastMentioned && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Seen</span>
                    <span className="text-sm">
                      {format(new Date(entity.lastMentioned), 'MMM d, yyyy')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Trending Topics */}
            {entity.trendingTopics && entity.trendingTopics.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Trending Topics</h2>
                <div className="flex flex-wrap gap-2">
                  {entity.trendingTopics.map((topic: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Entities */}
            {relatedEntities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Related Entities</h2>
                <div className="space-y-2">
                  {relatedEntities.slice(0, 5).map((related: any) => (
                    <Link
                      key={related.entity._id}
                      href={`/entities/${related.entity.slug}`}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {related.entity.name}
                        </span>
                        {related.entity.ticker && (
                          <span className="text-xs text-gray-500">
                            {related.entity.ticker}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {related.coMentionCount} mentions
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
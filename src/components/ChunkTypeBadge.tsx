import React from 'react';
import { ChunkCategory, CHUNK_TYPE_DEFINITIONS, inferChunkCategory } from '../types/chunkCategory';

interface ChunkTypeBadgeProps {
  category?: ChunkCategory;
  chunk?: {
    text: string;
    partOfSpeech?: string;
    grammarNote?: string;
    chunkType?: ChunkCategory;
  };
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export const ChunkTypeBadge: React.FC<ChunkTypeBadgeProps> = ({
  category,
  chunk,
  size = 'md',
  showDescription = false,
  clickable = false,
  onClick,
}) => {
  const finalCategory: ChunkCategory = category || (chunk ? inferChunkCategory(chunk) : 'general');
  const info = CHUNK_TYPE_DEFINITIONS[finalCategory] || CHUNK_TYPE_DEFINITIONS.general;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 space-x-1',
    md: 'text-xs px-2.5 py-1 space-x-1.5',
    lg: 'text-sm px-3.5 py-1.5 space-x-2',
  };

  return (
    <div className="inline-flex flex-col items-start">
      <span
        onClick={clickable ? onClick : undefined}
        className={`inline-flex items-center font-bold rounded-full border transition-all shadow-2xs ${info.badgePill} ${sizeClasses[size]} ${
          clickable ? 'cursor-pointer hover:opacity-85 hover:scale-105 active:scale-95' : ''
        }`}
        title={info.descriptionVi}
      >
        <span className="select-none">{info.icon}</span>
        <span className="tracking-wide">{info.labelVi}</span>
        <span className="text-[0.85em] opacity-75 font-mono hidden sm:inline">({info.labelEn})</span>
      </span>

      {showDescription && (
        <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed max-w-md">
          {info.descriptionVi}
        </p>
      )}
    </div>
  );
};

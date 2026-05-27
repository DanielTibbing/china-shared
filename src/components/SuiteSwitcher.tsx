import React from 'react';

export type SuiteApp = 'jobs' | 'pods' | 'practice' | 'reader' | 'news';

interface SuiteLink {
  key: SuiteApp;
  label: string;
  url: string;
}

const SUITE_LINKS: SuiteLink[] = [
  { key: 'jobs', label: 'Jobs Board', url: 'https://danieltibbing.github.io/china-jobs' },
  { key: 'pods', label: 'Podcast Hub', url: 'https://danieltibbing.github.io/china-pods' },
  { key: 'practice', label: 'Language Study', url: 'https://danieltibbing.github.io/chinese-practice/' },
  { key: 'reader', label: 'Reader Feed', url: 'https://danieltibbing.github.io/china-reader' },
  { key: 'news', label: 'News Aggregator', url: 'https://danieltibbing.github.io/china-news' }
];

interface SuiteSwitcherProps {
  activeApp?: SuiteApp;
}

export function SuiteSwitcher({ activeApp }: SuiteSwitcherProps) {
  return (
    <div className="global-nav bg-gray-50 dark:bg-slate-950 border-b border-gray-200/80 dark:border-slate-800/80 py-2 text-xs font-semibold text-gray-500 dark:text-slate-400 transition-colors duration-300">
      <div className="global-nav-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a
          href="https://danieltibbing.github.io/"
          className="global-nav-brand flex items-center gap-1.5 text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider font-extrabold text-[10px]"
        >
          <span>China Suite</span>
        </a>
        <div className="global-nav-links flex gap-4 overflow-x-auto select-none no-scrollbar">
          {SUITE_LINKS.map(link => {
            const isActive = activeApp === link.key;
            return (
              <a
                key={link.key}
                href={link.url}
                className={
                  isActive
                    ? "global-nav-link is-active text-indigo-600 dark:text-indigo-400 font-bold border-b border-indigo-600 dark:border-indigo-400 pb-0.5"
                    : "global-nav-link hover:text-gray-700 dark:hover:text-slate-200 transition-colors pb-0.5"
                }
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

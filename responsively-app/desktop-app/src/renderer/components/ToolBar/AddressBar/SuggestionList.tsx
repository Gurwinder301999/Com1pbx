import {useCallback, useEffect, useMemo, useState} from 'react';
import cx from 'classnames';

export interface HistoryItem {
  title: string;
  url: string;
  lastVisited: number;
}

interface Props {
  match: string;
  onEnter: (url?: string) => void;
}

const SuggestionList = ({match, onEnter}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [history] = useState<HistoryItem[]>(window.electron.store.get('history'));

  const suggestions = useMemo(() => {
    return history
      .filter((item) => {
        return `${item.title}-${item.url}`.toLowerCase().includes(match.toLowerCase());
      })
      .slice(0, 10);
  }, [match, history]);

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onEnter(suggestions[activeIndex] != null ? suggestions[activeIndex].url : undefined);
        return;
      }
      if (e.key === 'ArrowUp') {
        if (activeIndex === 0) {
          return;
        }
        setActiveIndex(activeIndex - 1);
      }
      if (e.key === 'ArrowDown') {
        if (activeIndex === suggestions.length - 1) {
          return;
        }
        setActiveIndex(activeIndex + 1);
      }
    },
    [activeIndex, suggestions, onEnter]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <div className="absolute z-20 flex w-full flex-col items-start rounded-b-lg border border-t-0 border-line-soft bg-panel pb-2 text-fg shadow-elevated">
      {suggestions.map(({title, url}, idx) => (
        <button
          onClickCapture={() => {
            onEnter(url);
          }}
          className={cx(
            'pointer-events-auto flex w-full items-center gap-2 py-1.5 pr-8 pl-2 text-left transition-colors hover:bg-hover focus:outline-none focus-visible:bg-hover',
            {'bg-card': activeIndex === idx}
          )}
          type="button"
          key={url}
        >
          <span>
            <img
              src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=64`}
              className="w-4 rounded-md"
              alt=""
              aria-hidden="true"
            />
          </span>
          <span className="flex flex-row gap-1 overflow-hidden">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</span>
            <span aria-hidden="true">—</span>
            <span className="max-w-2/5 overflow-hidden text-ellipsis whitespace-nowrap text-accent">
              {url}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default SuggestionList;

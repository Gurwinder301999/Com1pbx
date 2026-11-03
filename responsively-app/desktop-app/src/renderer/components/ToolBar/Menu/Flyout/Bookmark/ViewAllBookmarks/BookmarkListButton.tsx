import {IBookmarks} from 'renderer/store/features/bookmarks';
import {Icon} from '@iconify/react';

export interface Props {
  bookmark: IBookmarks;
  handleBookmarkClick: (address: string) => void;
  setCurrentBookmark: (bookmark: IBookmarks) => void;
  setOpenFlyout: (bool: boolean) => void;
}

const BookmarkListButton = ({
  bookmark,
  handleBookmarkClick,
  setCurrentBookmark,
  setOpenFlyout,
}: Props) => {
  return (
    <div className="group flex h-[40px] w-full items-center rounded-md text-fg transition-colors focus-within:bg-hover hover:bg-hover">
      <button
        type="button"
        className="min-w-0 flex-1 truncate rounded-md px-2 py-1 text-left text-[13px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => handleBookmarkClick(bookmark.address)}
        title={bookmark.address}
      >
        {bookmark.name}
      </button>
      <button
        type="button"
        aria-label={`Edit ${bookmark.name}`}
        title="Edit bookmark"
        className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 hover:bg-hover hover:text-fg focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => {
          setCurrentBookmark(bookmark);
          setOpenFlyout(true);
        }}
      >
        <Icon icon="ic:sharp-edit" />
      </button>
    </div>
  );
};

export default BookmarkListButton;

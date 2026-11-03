import {useDispatch} from 'react-redux';
import Button from 'renderer/components/Button';
import {IBookmarks} from 'renderer/store/features/bookmarks';
import {setAddress} from 'renderer/store/features/renderer';
import {useState} from 'react';
import BookmarkListButton from './BookmarkListButton';
import BookmarkFlyout from './BookmarkFlyout';

export interface Props {
  bookmarks: IBookmarks[];
  handleBookmarkFlyout: () => void;
}

const ViewAllBookmarks = ({bookmarks, handleBookmarkFlyout}: Props) => {
  const [currentBookmark, setCurrentBookmark] = useState<IBookmarks>({
    id: '',
    name: '',
    address: '',
  });
  const [openFlyout, setOpenFlyout] = useState(false);
  const dispatch = useDispatch();

  const areBookmarksPresent = bookmarks.length > 0;

  const handleBookmarkClick = (address: string) => {
    dispatch(setAddress(address));
    handleBookmarkFlyout();
  };

  return (
    <div>
      <div className="absolute top-0 right-[316px] z-50 flex max-h-[min(60vh,520px)] min-h-min w-[min(280px,calc(100vw-32px))] flex-col overflow-y-auto rounded-lg border border-line bg-panel p-1 text-fg shadow-elevated focus:outline-none">
        {bookmarks.map((bookmark) => {
          return (
            <div key={bookmark.id}>
              <BookmarkListButton
                bookmark={bookmark}
                handleBookmarkClick={handleBookmarkClick}
                setCurrentBookmark={setCurrentBookmark}
                setOpenFlyout={setOpenFlyout}
              />
            </div>
          );
        })}
        {!areBookmarksPresent && (
          <Button className="w-60 py-2" disabled disableHoverEffects>
            No bookmarks found{' '}
          </Button>
        )}
      </div>
      <div className="absolute right-[560px]">
        {openFlyout && (
          <BookmarkFlyout
            bookmark={currentBookmark}
            onChange={setCurrentBookmark}
            onClose={() => setOpenFlyout(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ViewAllBookmarks;

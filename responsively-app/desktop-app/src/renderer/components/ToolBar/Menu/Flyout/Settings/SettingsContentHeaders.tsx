import {FC, useId} from 'react';

interface ISettingsContentHeaders {
  acceptLanguage: string;
  setAcceptLanguage: (arg0: string) => void;
}

export const SettingsContentHeaders: FC<ISettingsContentHeaders> = ({
  acceptLanguage = '',
  setAcceptLanguage,
}) => {
  const id = useId();

  return (
    <>
      <h2 className="text-base font-semibold text-fg">Request Headers</h2>
      <div className="my-4 flex flex-col space-y-4 text-sm">
        <div className="flex flex-col space-y-2">
          <label htmlFor={id} className="flex flex-col">
            Accept-Language
            <input
              data-testid="settings-accept_language-input"
              type="text"
              id={id}
              placeholder="example: en-US"
              className="mt-2 rounded-lg border border-line bg-input px-3 py-2 text-sm text-fg placeholder:text-muted focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent"
              value={acceptLanguage}
              onChange={(e) => setAcceptLanguage(e.target.value)}
            />
          </label>
          <p className="text-sm text-muted">
            HTTP request Accept-Language parameter (default: language from OS locale settings)
          </p>
        </div>
      </div>
    </>
  );
};

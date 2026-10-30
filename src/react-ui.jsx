import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Button from 'react-bootstrap/esm/Button.js';
import Table from 'react-bootstrap/esm/Table.js';

function Specifications({ columns, rows, caption, footnote }) {
  const [message, setMessage] = useState('');

  async function copySpecifications() {
    const text = [columns.join('\t'), ...rows.map((row) => row.cells.join('\t'))].join('\n');

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      setMessage('Specifications copied.');
    } catch {
      setMessage('Could not copy. Please select the table text instead.');
    }
  }

  return (
    <>
      <div className="spec-table-wrap">
        <Table className="spec-table" data-react-ui="specifications">
          <caption className="visually-hidden">{caption}</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr id={row.id || undefined} key={row.cells[0]}>
                <th scope="row">{row.cells[0]}</th>
                <td>{row.cells[1]}</td>
                <td>{row.cells[2]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <p className="spec-footnote">{footnote}</p>
      <div className="spec-actions">
        <Button
          type="button"
          variant="link"
          className="text-link underlined-link copy-specifications"
          onClick={copySpecifications}
        >
          COPY SPECIFICATIONS
          <svg className="icon" aria-hidden="true">
            <use href="#arrow-right" />
          </svg>
        </Button>
        <span className="copy-feedback" role="status" aria-live="polite">
          {message}
        </span>
      </div>
    </>
  );
}

const container = document.querySelector('#react-specifications');
const fallbackTable = container?.querySelector('table');
const fallbackFootnote = container?.querySelector('.spec-footnote');

if (container && fallbackTable && fallbackFootnote) {
  const normalize = (element) => element.textContent.replace(/\s+/g, ' ').trim();
  const columns = [...fallbackTable.querySelectorAll('thead th')].map(normalize);
  const rows = [...fallbackTable.querySelectorAll('tbody tr')].map((row) => ({
    id: row.id,
    cells: [...row.children].map(normalize),
  }));
  const caption = normalize(fallbackTable.querySelector('caption'));
  const footnote = normalize(fallbackFootnote);

  createRoot(container).render(
    <Specifications columns={columns} rows={rows} caption={caption} footnote={footnote} />,
  );
}

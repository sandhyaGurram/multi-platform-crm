import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function ZohoSheet() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const baseUrl = API_URL.replace(/\/+$/, "");
      const response = await fetch(`${baseUrl}/api/zoho/data`);

      if (!response.ok) {
        throw new Error(`Failed to load records (${response.status})`);
      }

      const data = await response.json();

      if (data.status !== "success" || !Array.isArray(data.records)) {
        throw new Error(data.message || "Invalid response from Zoho Sheets.");
      }

      setRecords(data.records);
    } catch (err) {
      setError(err.message || "Unable to load Zoho Sheet data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const columns = records.length
    ? Object.keys(records[0]).filter((key) => key !== "row_index")
    : [];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Zoho Sheet Data</h1>
          <p className="mt-1 text-sm text-gray-500">
            Live records retrieved from your existing Zoho spreadsheet.
          </p>
        </div>

        <button
          onClick={fetchRecords}
          disabled={loading}
          className="rounded-lg bg-[#a51e27] px-4 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Loading..." : "Refresh Data"}
        </button>
      </div>

      <div className="mb-4 rounded-lg border bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">Records loaded</p>
        <p className="mt-1 text-2xl font-bold text-gray-800">
          {records.length}
        </p>
      </div>

      {loading && (
        <div className="rounded-lg border bg-white p-8 text-center">
          Loading Zoho Sheet records...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p>{error}</p>
          <button
            onClick={fetchRecords}
            className="mt-3 rounded bg-red-700 px-4 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && records.length === 0 && (
        <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
          No records found in the Zoho Sheet.
        </div>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full whitespace-nowrap text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="border-b px-4 py-3 font-semibold text-gray-700"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={record["ORDER-ID"] || index}
                    className="hover:bg-gray-50"
                  >
                    {columns.map((column) => (
                      <td
                        key={column}
                        className="border-b px-4 py-3 text-gray-700"
                      >
                        {record[column] == null || record[column] === ""
                          ? "—"
                          : String(record[column])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t px-4 py-3 text-sm text-gray-500">
            Showing {records.length} records from Zoho Sheets.
          </div>
        </div>
      )}
    </div>
  );
}

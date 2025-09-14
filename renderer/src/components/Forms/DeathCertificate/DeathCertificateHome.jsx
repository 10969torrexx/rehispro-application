import React, { useState, useEffect } from "react";
import { DeathCertServices } from "@services";
import { toast } from "react-toastify";
import { Search } from "lucide-react"; 

export default function DeathCertificateHome() {
  const [list_of_death, setListOfDeath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await DeathCertServices.listDeathCertificate();
        if (response && response.success && response.data) {
          setListOfDeath(response.data);
        } else {
          const errorMsg =
            response?.message || "Failed to load death certificates";
          setError(errorMsg);
          toast.error(errorMsg);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch death certificates";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  // 🔎 Filter
  const filteredData = list_of_death.filter((record) =>
    `${record.first_name} ${record.middle_name || ""} ${record.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 📖 Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      {/* Search & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            className="border pl-9 pr-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase text-xs">
                ID
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase text-xs">
                Deceased Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase text-xs">
                Sex
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase text-xs">
                Date of Death
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase text-xs">
                Place of Death
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase text-xs">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{record.id}</td>
                <td className="px-4 py-3">{`${record.first_name} ${
                  record.middle_name ? record.middle_name.charAt(0) + "." : ""
                } ${record.last_name}`}</td>
                <td className="px-4 py-3">{record.sex}</td>
                <td className="px-4 py-3">{record.date_of_death}</td>
                <td className="px-4 py-3">
                  {record.place_of_death
                    ? `${record.city}, ${record.province}`
                    : "N/A"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleView(record)}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-6 text-center text-gray-500 text-sm"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span className="text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </span>
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedRecord && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[420px] max-h-[90vh] overflow-y-auto relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Death Certificate Details
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {`${selectedRecord.first_name} ${
                  selectedRecord.middle_name || ""
                } ${selectedRecord.last_name}`}
              </p>
              <p>
                <b>Sex:</b> {selectedRecord.sex}
              </p>
              <p>
                <b>Age:</b> {selectedRecord.age_years}
              </p>
              <p>
                <b>Date of Death:</b> {selectedRecord.date_of_death}
              </p>
              <p>
                <b>Place of Death:</b>{" "}
                {`${selectedRecord.place_of_death}, ${selectedRecord.city}, ${selectedRecord.province}`}
              </p>
              <p>
                <b>Manner of Death:</b>{" "}
                {selectedRecord.manner_of_death || "N/A"}
              </p>
              <p>
                <b>Civil Status:</b> {selectedRecord.civil_status || "N/A"}
              </p>
              <p>
                <b>Disposal:</b> {selectedRecord.disposal_type || "N/A"}
              </p>
              <p>
                <b>Registrar:</b> {selectedRecord.registrar_name || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

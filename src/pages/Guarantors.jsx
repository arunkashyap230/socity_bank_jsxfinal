import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const statusClass = { Active: "status-active", Pending: "status-pending" };

const Guarantors = () => {
  const [search, setSearch] = useState("");
  const guarantorData = useSelector((state) => state.guarantors.items);

  const filtered = useMemo(
    () =>
      guarantorData.filter((item) => {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.memberId.toLowerCase().includes(q)
        );
      }),
    [search, guarantorData],
  );

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Guarantor Management</h1>
          <p className="page-subtitle">
            Manage guarantors linked to loan applications.
          </p>
        </div>
        <button className="btn btn-primary">Add Guarantor</button>
      </div>

      <div className="card">
        <div className="filters-row" style={{ marginBottom: "1rem" }}>
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by guarantor, id, member id"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="table-header-row">
                <th>Guarantor ID</th>
                <th>Name</th>
                <th>Member ID</th>
                <th>Phone</th>
                <th>Relation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="td-primary">{item.id}</td>
                  <td className="td-default">{item.name}</td>
                  <td className="td-default">{item.memberId}</td>
                  <td className="td-muted">{item.phone}</td>
                  <td className="td-muted">{item.relation}</td>
                  <td>
                    <span className={`status-chip ${statusClass[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Guarantors;

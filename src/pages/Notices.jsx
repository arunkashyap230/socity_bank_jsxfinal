import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotice } from "../store/slices/noticesSlice";

const statusClass = {
  Published: "status-completed",
  Draft: "status-pending",
  Archived: "status-failed",
};

const Notices = () => {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.notices.items);
  const [form, setForm] = useState({ title: "", date: "", status: "Draft" });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNotice({
        id: `N-${100 + notices.length + 1}`,
        title: form.title,
        date: form.date,
        status: form.status,
      }),
    );
    setForm({ title: "", date: "", status: "Draft" });
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Notice Management</h1>

      <div className="grid-2-lg">
        <form className="card" style={{ padding: "1rem" }} onSubmit={onSubmit}>
          <h3 className="card-title" style={{ marginBottom: "0.75rem" }}>
            Create Notice
          </h3>
          <div className="form-group">
            <label>Title</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="input"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              className="input"
              value={form.status}
              onChange={(e) =>
                setForm((p) => ({ ...p, status: e.target.value }))
              }
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Archived</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Save Notice
          </button>
        </form>

        <div className="card" style={{ padding: "1rem" }}>
          <h3 className="card-title" style={{ marginBottom: "0.75rem" }}>
            Notice List
          </h3>
          <div className="gap-stack">
            {notices.map((item) => (
              <div key={item.id} className="tx-item">
                <div className="tx-item-left">
                  <p className="td-primary">{item.id}</p>
                  <p>{item.title}</p>
                </div>
                <div className="tx-item-right">
                  <p className="td-muted">{item.date}</p>
                  <span className={`status-chip ${statusClass[item.status]}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notices;

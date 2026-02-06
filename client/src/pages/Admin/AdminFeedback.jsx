// src/pages/Admin/AdminFeedback.jsx (REPLACE)
import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import styles from "./AdminFeedback.module.css";

// MUI
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// Icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const AdminFeedback = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("newest"); // newest | oldest | high | low

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    setError("");
    try {
      const res = await API.get("/events");
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setEvents([]);
      setError(err?.response?.data?.message || "Failed to load events");
    } finally {
      setLoadingEvents(false);
    }
  };

  const fetchFeedbacks = async (eventId) => {
    setLoadingFeedbacks(true);
    setError("");
    try {
      const res = await API.get(`/feedback/event/${eventId}`);
      setFeedbacks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFeedbacks([]);
      setError(err?.response?.data?.message || "Failed to load feedback");
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    setSelectedEvent(eventId);
    setSearch("");
    setMinRating(0);
    setSort("newest");
    if (eventId) fetchFeedbacks(eventId);
    else setFeedbacks([]);
  };

  const stats = useMemo(() => {
    const total = feedbacks.length;
    if (!total) return { total: 0, avg: 0, five: 0, fourPlus: 0 };
    const sum = feedbacks.reduce((a, f) => a + (Number(f.rating) || 0), 0);
    const avg = sum / total;
    const five = feedbacks.filter((f) => Number(f.rating) === 5).length;
    const fourPlus = feedbacks.filter((f) => Number(f.rating) >= 4).length;
    return { total, avg, five, fourPlus };
  }, [feedbacks]);

  const filtered = useMemo(() => {
    let list = [...feedbacks];

    // min rating
    if (minRating > 0) {
      list = list.filter((f) => Number(f.rating) >= minRating);
    }

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((f) =>
        `${f?.user_id?.name || ""} ${f?.user_id?.email || ""} ${f?.comments || ""}`
          .toLowerCase()
          .includes(q)
      );
    }

    // sort
    list.sort((a, b) => {
      const da = new Date(a?.createdAt || 0).getTime();
      const db = new Date(b?.createdAt || 0).getTime();
      const ra = Number(a?.rating) || 0;
      const rb = Number(b?.rating) || 0;

      if (sort === "newest") return db - da;
      if (sort === "oldest") return da - db;
      if (sort === "high") return rb - ra || db - da;
      if (sort === "low") return ra - rb || db - da;
      return 0;
    });

    return list;
  }, [feedbacks, search, minRating, sort]);

  const ratingChipClass = (rating) => {
    if (rating >= 4) return styles.chipGood;
    if (rating === 3) return styles.chipMid;
    return styles.chipBad;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.title}>Event Feedback</h2>
            <p className={styles.subText}>
              View ratings and feedback submitted by students
            </p>
          </div>

          <div className={styles.headerActions}>
            <Tooltip title="Refresh events">
              <span>
                <IconButton
                  onClick={fetchEvents}
                  disabled={loadingEvents}
                  className={styles.iconBtn}
                  aria-label="Refresh"
                >
                  <RefreshRoundedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <TextField
            select
            size="small"
            label="Select Event"
            value={selectedEvent}
            onChange={handleEventChange}
            className={styles.select}
            disabled={loadingEvents}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventNoteRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">
              {loadingEvents ? "Loading events..." : "Choose an event"}
            </MenuItem>
            {events.map((event) => (
              <MenuItem key={event._id} value={event._id}>
                {event.title}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            size="small"
            label="Search feedback"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
            disabled={!selectedEvent}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            size="small"
            label="Min rating"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className={styles.smallSelect}
            disabled={!selectedEvent}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StarRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={5}>5+</MenuItem>
            <MenuItem value={4}>4+</MenuItem>
            <MenuItem value={3}>3+</MenuItem>
            <MenuItem value={2}>2+</MenuItem>
            <MenuItem value={1}>1+</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="Sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={styles.smallSelect}
            disabled={!selectedEvent}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="high">Highest rating</MenuItem>
            <MenuItem value="low">Lowest rating</MenuItem>
          </TextField>

          <button
            className={styles.refreshBtn}
            type="button"
            onClick={() => selectedEvent && fetchFeedbacks(selectedEvent)}
            disabled={!selectedEvent || loadingFeedbacks}
          >
            Refresh Feedback
          </button>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Feedback</div>
            <div className={styles.statValue}>{stats.total}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Average Rating</div>
            <div className={styles.statValue}>
              {stats.total ? stats.avg.toFixed(1) : "0.0"}
              <span className={styles.statUnit}>/5</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>5★ Count</div>
            <div className={styles.statValue}>{stats.five}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>4★ and above</div>
            <div className={styles.statValue}>{stats.fourPlus}</div>
          </div>
        </div>

        {/* Body */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>Feedback List</div>

            {selectedEvent && (
              <div className={styles.panelMeta}>
                Showing <strong>{filtered.length}</strong> of{" "}
                <strong>{feedbacks.length}</strong>
              </div>
            )}
          </div>
          {/* <Divider /> */}

          <div className={styles.panelBody}>
            {!selectedEvent && (
              <div className={styles.empty}>Select an event to view feedback.</div>
            )}

            {selectedEvent && loadingFeedbacks && (
              <div className={styles.empty}>Loading feedback...</div>
            )}

            {selectedEvent && !loadingFeedbacks && error && (
              <div className={styles.empty} style={{ color: "crimson" }}>
                {error}
              </div>
            )}

            {selectedEvent && !loadingFeedbacks && !error && feedbacks.length === 0 && (
              <div className={styles.empty}>No feedback submitted yet.</div>
            )}

            {selectedEvent && !loadingFeedbacks && !error && feedbacks.length > 0 && (
              <div className={styles.grid}>
                {filtered.map((fb) => {
                  const name = fb.user_id?.name || "Student";
                  const initial = name?.[0]?.toUpperCase() || "S";
                  const rating = Number(fb.rating) || 0;

                  return (
                    <div key={fb._id} className={styles.card}>
                      <div className={styles.cardTop}>
                        <div className={styles.userBox}>
                          <Avatar className={styles.avatar}>{initial}</Avatar>
                          <div className={styles.userText}>
                            <div className={styles.name}>{name}</div>
                            <div className={styles.email}>
                              {fb.user_id?.email || "—"}
                            </div>
                          </div>
                        </div>

                        <Chip
                          size="small"
                          label={`⭐ ${rating}/5`}
                          className={`${styles.ratingChip} ${ratingChipClass(rating)}`}
                        />
                      </div>

                      <div className={styles.comment}>
                        {fb.comments || "—"}
                      </div>

                      <div className={styles.cardBottom}>
                        <span className={styles.date}>
                          {new Date(fb.createdAt).toLocaleString()}
                        </span>
                        <span className={styles.badge}>
                          {rating >= 4 ? "Positive" : rating === 3 ? "Neutral" : "Needs attention"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;

import styles from "./EventCard.module.css";
import Chip from "@mui/material/Chip";

// Icons
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const pickCover = (event) => {
  // If later you add event.cover_url, it will automatically use it.
  if (event?.cover_url) return event.cover_url;

  // fallback covers by category
  const cat = (event?.category || "").toLowerCase();
  if (cat.includes("sport"))
    return "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80";
  if (cat.includes("tech") || cat.includes("hack"))
    return "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80";
  if (cat.includes("cultur") || cat.includes("music") || cat.includes("dance"))
    return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80";

  return "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80";
};

const prettyDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString();
};

const EventCard = ({ event, onClick, uiStatus }) => {
  const cover = pickCover(event);
  const category = (event?.category || "").trim();
  const statusLabel = uiStatus || "upcoming";

  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.cover} style={{ backgroundImage: `url(${cover})` }}>
        <div className={styles.badges}>
          {category ? (
            <Chip size="small" label={category} className={styles.badgeType} />
          ) : (
            <Chip size="small" label="event" className={styles.badgeType} />
          )}

          <Chip
            size="small"
            label={statusLabel}
            className={`${styles.badgeStatus} ${
              statusLabel === "completed"
                ? styles.completed
                : statusLabel === "live"
                ? styles.live
                : styles.upcoming
            }`}
          />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.title}>{event?.title || "Untitled Event"}</div>
        <div className={styles.desc}>
          {event?.description || "No description provided."}
        </div>

        <div className={styles.meta}>
          <CalendarMonthRoundedIcon fontSize="small" />
          <span>{prettyDate(event?.start_date)}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

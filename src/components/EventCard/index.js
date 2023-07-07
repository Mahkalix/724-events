import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import { useData } from "../../contexts/DataContext";
import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => {
  const { data } = useData();

  const defaultImageSrc = data?.events?.[17]?.cover || "";
  const defaultImageAlt = data?.events?.[17]?.description || "";
  const defaultTitle = data?.events?.[17]?.title || "";

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img
          data-testid="card-image-testid"
          src={imageSrc || defaultImageSrc}
          alt={imageAlt || defaultImageAlt}
        />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title || defaultTitle}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default EventCard;

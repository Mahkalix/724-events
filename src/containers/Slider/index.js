import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (data && data.focus && data.focus.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === data.focus.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [data]);

  if (!data || !data.focus || data.focus.length === 0) {
    return null; // ou retourner un message indiquant que les données sont absentes
  }
  return (
    <div className="SlideCardList">
      {data?.focus?.map((event, idx) => (
        <div key={`${event.title}-${idx}`}>
          <div
            className={`SlideCard SlideCard--${
              activeIndex === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {data?.focus?.map((_, radioIdx) => (
                <input
                  key={`dot-${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={idx === radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

import { useState, useEffect } from "react";
import { CustomError, Diary } from "./types";
import { createDiary, getAllDiaries } from "./diaryService";

interface DiaryProps {
  diary: Diary;
}

const DiaryTab = ({ diary }: DiaryProps) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      visibility: {diary.visibility} <br />
      weather: {diary.weather}
    </div>
  );
};

const notificationStyle = {
  color: "red",
};

const App = () => {
  // const [newDiary, setNewDiary] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newComment, setNewComment] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const Notification = ({ notification }: { notification: string | null }) => {
    return notification ? (
      <div style={notificationStyle}>{notification}</div>
    ) : null;
  };

  const diaryCreation = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await createDiary({
        date: newDate,
        visibility: newVisibility,
        weather: newWeather,
        comment: newComment,
      });

      setDiaries(diaries.concat(data));
    } catch (error: unknown) {
      const typedError = error as CustomError;

      if (typedError.response && typedError.response.data !== undefined) {
        // If the error has a response and data, use that message
        setNotification(`${typedError.response.data}`);
      } else if (typedError instanceof Error) {
        // For other errors, use the error message directly
        setNotification(`${typedError.message}`);
      } else {
        // Fallback for any other unexpected errors
        setNotification("Something went wrong.");
      }

      setTimeout(() => {
        setNotification("");
      }, 5000);
    }

    setNewDate("");
    setNewVisibility("");
    setNewWeather("");
    setNewComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification notification={notification} />
      <form onSubmit={diaryCreation}>
        date{" "}
        <input
          type="date"
          id="start"
          name="trip-start"
          value={newDate}
          min="1990-01-01"
          max="2111-12-31"
          onChange={(event) => setNewDate(event.target.value)}
        ></input>{" "}
        <br />
        {/* <input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)}
        ></input>{" "} */}
        <div>
          visibility: great{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility("great")}
          />
          good{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility("good")}
          />
          okay{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility("ok")}
          />
          poor{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility("poor")}
          />
        </div>
        <div>
          weather: sunny{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather("sunny")}
          />
          rainy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather("rainy")}
          />
          cloudy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather("cloudy")}
          />
          stormy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather("stormy")}
          />
          windy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather("windy")}
          />
        </div>
        comment{" "}
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        ></input>{" "}
        <br />
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <DiaryTab key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default App;

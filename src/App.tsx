import { useRef, useState } from "react";
import alarmSound from "./assets/alarm-sound.mp3";

const options = [5, 10, 15, 20, 25, 30, 35, 40];

export default function App() {
  const [intervalSec, setIntervalSec] = useState(10);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const alarmAudio = useRef(new Audio(alarmSound));

  const triggerAlarm = () => {
    window.api?.sendNotification("Hora de levantar!", "Faça uma pausa agora.");
    alarmAudio.current.currentTime = 0;
    alarmAudio.current.play();
  };

  const startTimer = () => {
    triggerAlarm();
    if (running) return;

    timerRef.current = setInterval(() => {
      triggerAlarm();
    }, intervalSec * 60 * 1000);

    setRunning(true);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRunning(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <h2 style={styles.heading}>Risetime ⏱️</h2>

        <label style={styles.label}>Escolha o intervalo para levantar</label>
        <select
          value={intervalSec}
          onChange={(e) => setIntervalSec(Number(e.target.value))}
          disabled={running}
          style={styles.input}
        >
          {options.map((sec) => (
            <option key={sec} value={sec}>
              {sec} minutos
            </option>
          ))}
        </select>

        <div style={styles.buttons}>
          <button
            onClick={startTimer}
            disabled={running}
            style={{
              ...styles.button,
              background: "linear-gradient(90deg, #ff00cc, #3333ff)",
            }}
          >
            Iniciar
          </button>
          <button
            onClick={stopTimer}
            disabled={!running}
            style={{
              ...styles.button,
              background: "linear-gradient(90deg, #999, #555)",
            }}
          >
            Parar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "radial-gradient(ellipse at center, #1b0c2d 0%, #120318 100%)",

    width: "100%",
    display: "flex",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "2rem",
  },
  panel: {
    backgroundColor: "#1a0c2f",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 0 40px #ff00cc55",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center" as const,
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "2rem",
    color: "#ff00cc",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "#aaa",
    textAlign: "left" as const,
  },
  input: {
    background: "#2b1b42",
    border: "1px solid #ff00cc",
    padding: "12px",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "1rem",
    marginBottom: "2rem",
    width: "100%",
  },
  buttons: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    flex: 1,
    padding: "12px",
    borderRadius: "6px",
    color: "#fff",
    border: "none",
    fontWeight: "bold" as const,
    cursor: "pointer",
    boxShadow: "0 0 10px #ff00cc77",
  },
};

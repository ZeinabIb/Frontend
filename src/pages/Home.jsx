import React, { useEffect, useRef, useState } from "react";
import blackhole from "../assets/blackhole.mp4";
import interstellar from "../assets/interstellar.mp3";
import { Icon } from "@mdi/react";
import { mdiVolumeMute, mdiVolumeHigh } from "@mdi/js";
import "./styles/font.css";
import { Link } from "react-router-dom";
const Home = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    return () => {
      // Cleanup when the component is unmounted
      audio.pause();
      audio.currentTime = 0;
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleToggleAudio = () => {
    const audio = audioRef.current;

    if (audio.paused) {
      fadeAudioIn(audio);
      setIsMuted(false);

      localStorage.setItem("isAudioPlaying", "true");
    } else {
      fadeAudioOut(audio);
      setIsMuted(true);

      localStorage.setItem("isAudioPlaying", "false");
    }
  };

  const fadeAudioIn = (audio) => {
    const fadeInterval = setInterval(() => {
      if (audio.volume < 0.9) {
        audio.volume = Math.min(0.9, audio.volume + 0.1);
      } else {
        clearInterval(fadeInterval);
        audio.play();
      }
    }, 200);
  };

  const fadeAudioOut = (audio) => {
    const fadeInterval = setInterval(() => {
      if (audio.volume > 0) {
        audio.volume = Math.max(0, audio.volume - 0.1);
      } else {
        clearInterval(fadeInterval);
        audio.pause();
      }
    }, 300);
  };

  return (
    <>
      <div style={styles.bg}>
        <div style={styles.videoContainer}>
          <video style={styles.videoTag} autoPlay loop muted>
            <source src={blackhole} type="video/mp4" />
          </video>
          <div style={styles.overlay}></div>
        </div>
      </div>
      <div style={styles.content}>
        <h1 className="title">
          Operation <p style={styles.gold}>ArcLight</p>
        </h1>
        <div style={styles.text}>
          <h3>
            "Exploration is wired into our brains. If we can see the horizon, we
            want to know what's beyond."
          </h3>
          <h3>
            <p style={{ textDecoration: "underline", display: "inline" }}>
              Beyond the Stars:
            </p>{" "}
            Your Ticket to Extraterrestrial Adventures!
          </h3>
        </div>
        <button style={styles.audioButton} onClick={handleToggleAudio}>
          {isMuted ? (
            <Icon path={mdiVolumeMute} size={1} color="white" />
          ) : (
            <Icon path={mdiVolumeHigh} size={1} color="white" />
          )}
        </button>
        <div style={styles.buttonContainer}>
          <button style={styles.signInButton}>
            <Link style={{ color: "#ffcd59" }} to="/signup">
              Sign In
            </Link>
          </button>
          <button style={styles.signupButton}>
            <Link style={{ color: "black" }} to="/signup">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
      <audio ref={audioRef} controls style={{ display: "none" }}>
        <source src={interstellar} type="audio/mp3" />
      </audio>
    </>
  );
};

const styles = {
  videoContainer: {
    position: "absolute",
    zIndex: "-1",
  },

  videoTag: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  content: {
    margin: "50px",
    zIndex: "1",
    color: "white",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "80px",
    background: "linear-gradient(to bottom, transparent, black)",
  },

  bg: {
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "-1",
    backgroundColor: "black",
    height: "100vh",
  },
  audioButton: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "none",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  buttonContainer: {
    marginTop: "50px",
  },

  signInButton: {
    outline: "none",
    fontSize: "1.2rem",
    marginRight: "15px",
    fontWeight: "bold",
    backgroundColor: "black",
    padding: "10px 20px",
    border: "2px solid black",
    cursor: "pointer",
    boxShadow: "0px 0px 8px rgba(217,131,65, 1)",
  },

  signupButton: {
    outline: "none",
    fontSize: "1.2rem",
    backgroundColor: "#ffcd59",
    fontWeight: "bold",
    color: "black",
    padding: "10px 20px",

    cursor: "pointer",
  },
  text: {
    maxWidth: "700px",
    fontSize: "1.2rem",
  },
  gold: {
    color: "#ffcd59",
    display: "inline",
    textShadow: "2px 2px 2px rgba(217,131,65, 0.3)",
  },
};

export default Home;

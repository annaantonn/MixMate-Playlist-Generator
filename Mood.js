import React, { useState } from "react";
import data from "./data.js";

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState("");
  const [songList, setSongList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistNameInput, setPlaylistNameInput] = useState("");
  const [edit, setEdit] = useState(false);

  const handleSelectMood = (e) => {
    const mood = e.target.value;
    setSelectedMood(mood);
    setSongList(
      data
        .filter((song) => song.songMood === e.target.value)
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)
    );
    setPlaylistName(mood);
  };

  const handleResetMood = () => {
    setSelectedMood("");
    setEdit(false);
  };

  const handleGeneratePlaylist = () => {
    setSongList(
      data
        .filter((song) => song.songMood === selectedMood)
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)
    );
    setPlaylistName(selectedMood);
    setEdit(false);
  };

  const handlePlaylistNameInput = (e) => {
    setPlaylistNameInput(e.target.value);
  };

  const handleEditPlaylistName = () => {
    setEdit(true);
    setPlaylistNameInput(playlistName);
  };

  const handleSavePlaylistName = () => {
    setPlaylistName(playlistNameInput);
    setEdit(false);
  };

  return (
    <div className="Mood">
      {selectedMood ? (
        <div className="Playlist">
          <div className="PlaylistName">
            <h2>{playlistName}</h2>
          </div>
          {edit ? (
            <div className="PlaylistActions">
              <input
                type="text"
                value={playlistNameInput}
                onChange={handlePlaylistNameInput}
              />
              <button onClick={handleSavePlaylistName}>Save</button>
            </div>
          ) : (
            <div className="PlaylistActions">
              <button onClick={handleEditPlaylistName}>Rename</button>
            </div>
          )}
          <div className="PlaylistActions">
            <button onClick={handleGeneratePlaylist}>Regenerate</button>
            <button onClick={handleResetMood}>New Mood</button>
          </div>
          {songList.map((song) => (
            <div key={song.songId} className="Song">
              <img src={song.songImage} alt={song.songName} />
              <div className="SongInfo">
                <p className="SongName">{song.songName}</p>
                <p className="SongArtist">{song.songArtist}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="Buttons">
          <h2>Select mood to start</h2>
          <button value="Happy" onClick={handleSelectMood}>
            Happy
          </button>
          <button value="Sad" onClick={handleSelectMood}>
            Sad
          </button>
          <button value="Fast" onClick={handleSelectMood}>
            Fast
          </button>
          <button value="Slow" onClick={handleSelectMood}>
            Slow
          </button>
        </div>
      )}
    </div>
  );
}

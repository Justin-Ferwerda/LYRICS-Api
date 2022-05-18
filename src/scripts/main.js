// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

const renderToDom = (divId, textToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToRender;
};

const buttonOnDom = () => {
  const domString = '<button type="button" class="btn btn-outline-info">Console Log Lyrics</button>';
  renderToDom('#app', domString);
};

const userForm = () => {
  const domString = `<form>
      <div class="form-group">
        <label for="exampleInputEmail1">Artist Name</label>
        <input type="text" class="form-control" id="artist" aria-describedby="emailHelp" placeholder="Enter Artist Name">
      </div>
        <div class="form-group">
        <label for="exampleInputPassword1">Song Title</label>
        <input type="text" class="form-control" id="song" placeholder="Song Name">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`;
  renderToDom('#login-form-container', domString);
};

const eventListeners = () => {
  document.querySelector('#login-form-container').addEventListener('submit', (e) => {
    e.preventDefault();
    const getLyrics = () => new Promise((resolve, reject) => {
      axios.get(`https://api.lyrics.ovh/v1/${document.querySelector('#artist').value}/${document.querySelector('#song').value}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
    getLyrics();
    const lyricsOnDom = () => {
      getLyrics().then((response) => {
        document.querySelector('#app').innerHTML = response.lyrics.replaceAll('\n', '<br>');
      });
    };
    lyricsOnDom();
    document.querySelector('#console-btn').addEventListener('click', () => {
      console.warn(lyricsOnDom());
    });
  });
};

const startApp = () => {
  // USE WITH FIREBASE AUTH
  // checkLoginStatus();
  buttonOnDom();
  userForm();
  eventListeners();
};

startApp();

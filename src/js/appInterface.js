export default class AppInterface {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.registerEvents();
  }

  registerEvents() {
    const mainInput = document.querySelector('.footer__input');
    mainInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.createPost(e);
      }
    });

    const modalInput = document.querySelector('.form__input');
    modalInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.createPostWithManualCoords(e);
      }
    });
  }

  markupPost(time, text, coordinates) {
    return `
    <div class="tweets__post">
    <div class="post__header">${time}</div>
    <div class="post__body">
      <div class="post__text">${text}</div>
    </div>
    <div class="post__coordinates"><span class="post__icon"></span>${coordinates}</div>
    </div>
    `;
  }

  async createPost(e) {
    const newDate = new Date();
    const time = newDate.toLocaleString();
    const text = e.target.value;
    const newCoordinates = await this.coordinates();
    const modal = document.querySelector('.modal');
    let coordinates = '';
    let coordsLatitude = '';
    let coordsLongitude = '';
    if (newCoordinates) {
      coordsLatitude = newCoordinates.coords.latitude.toFixed(5);
      coordsLongitude = newCoordinates.coords.longitude.toFixed(5);
      coordinates = `${coordsLatitude}, ${coordsLongitude}`;
      const newPost = this.markupPost(time, text, coordinates);
      const tweetsContent = document.querySelector('.tweets__content');
      tweetsContent.insertAdjacentHTML('afterbegin', newPost);
      e.target.value = '';
    } else {
      modal.classList.remove('hidden');
    }
  }

  createPostWithManualCoords(e) {
    const mainInput = document.querySelector('.footer__input');
    const modal = document.querySelector('.modal');
    const newDate = new Date();
    const time = newDate.toLocaleString();
    if (this.validateCoordinates(e.target.value)) {
      const newPost = this.markupPost(time, mainInput.value, e.target.value);
      const tweetsContent = document.querySelector('.tweets__content');
      tweetsContent.insertAdjacentHTML('afterbegin', newPost);
      modal.classList.add('hidden');
      e.target.value = '';
      mainInput.value = '';
    } else {
      alert('Enter the coordinates of the following type: 00.00000, 0.00000');
    }
  }

  async coordinates() {
    try {
      return await this.getGeolocation();
    } catch (e) {
      return null;
    }
  }

  getGeolocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (data) => resolve(data),
          (data) => reject(data)
        );
      } else {
        reject(new Error("Your browser doesn't support Geolocation"));
      }
    });
  }

  validateCoordinates(value) {
    const regExp = /^\[?([-+]?\d{1,2}[.]\d+),\s*([-+]?\d{1,3}[.]\d+)\]?$/gm;
    return regExp.test(value);
  }
}

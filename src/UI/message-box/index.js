import './styles.scss';
import errorIconSVG from './assets/error-icon.svg';

const showMessage = (msg, delay = 2000) => {      
  const body = $('body');  
  body.append(`<div id="msg-box" class="qae-message-box-container"><div class="qae-message-box">${errorIconSVG}<span>${msg}</span></div></div>`);
  setTimeout(() => {
    $('#msg-box').remove();
  }, delay);
};

export default showMessage;

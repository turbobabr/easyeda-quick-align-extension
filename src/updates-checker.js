
import { fetchLocalFile } from './easy-fns';

export const checkForNewVersions = () => {

  fetchLocalFile('quickalign','manifest.json').then((data) => {
    console.log('fetched file:');
    console.log(data);
  });


  fetch('https://raw.githubusercontent.com/turbobabr/colorio/master/package.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data);
    });  
};
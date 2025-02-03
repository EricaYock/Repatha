// put your AEM publish address here
const AEM_HOST = 'https://author-p134711-e1334063.adobeaemcloud.com';

export default function decorate(block) {
  const slugDiv = block.querySelector('div:nth-child(1)');
  const slugID = document.createElement('div');
  slugID.id = 'slug';
  slugDiv.replaceWith(slugID);
  slugID.innerHTML = '${slugDiv.innerHTML}';
  const slugTemp = slugID.innerHTML.replace('<div data-aue-prop="text" data-aue-label="Slug" data-aue-type="text">|<div>|</div>', '');
  const slug = slugTemp.match(/\S+/g);

  const quoteDiv = block.querySelector('div:last-of-type');
  const adventureDiv = document.createElement('div');
  adventureDiv.id = 'adventure-${slug}';
  quoteDiv.replaceWith(adventureDiv);

  fetch(`${AEM_HOST}/graphql/execute.json/repatha/Repatha;slug=ISI`)
    .then((response) => response.json())
    .then((response) => {

      const repatha1 = response.data.importantSafetyInformationList.items[0].importantSafetyInformation.plaintext;
      document.getElementById(adventureDiv.id).innerHTML += `<p>${repatha1}</p>`;

      const repatha2 = response.data.importantSafetyInformationList.items[0].whatIsRepatha.plaintext;
      document.getElementById(adventureDiv.id).innerHTML += `<p>${repatha2}</p>`;

      const repatha3 = response.data.importantSafetyInformationList.items[0].whatAreThePossibleSideEffectsOfRepatha.plaintext;
      document.getElementById(adventureDiv.id).innerHTML += `<p>${repatha3}</p>`;
      /*
const tripItinerary= response.data.adventureList.items[0].itinerary.html;
document.getElementById(adventureDiv.id).innerHTML += "<section>" + "Itinerary: </br>" + tripItinerary + "</section>";
*/
    })
    .catch((error) => {
      console.log('Error fetching data:', error);
    });
}

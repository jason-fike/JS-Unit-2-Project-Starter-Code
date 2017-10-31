/*
  Please add all Javascript code to this file.
  GA JS-SF-8 Jason Fike
*/

/* IDEAS:
  - Make all #popUp DOM maniuplation into a module
*/

// Module Pattern

let changePopUp = (function() {
  let popUp = '#popUp';
  return {
    showLoader: function() {
      $(popUp).removeClass('hidden');
    },
    hideLoader: function() {
      $(popUp).addClass('hidden');
    },
    openArticle: function() {
      $(popUp).removeClass('loader hidden');
    },
    closeArticle: function() {
      $(popUp).addClass('loader hidden');
    }
  };
})();

// Sources
let source
// source = 'techcrunch';
// source = 'bloomberg';
// source = 'al-jazeera-english';

// Source DOM
$('#source1 a').text('Bloomberg');
$('#source2 a').text('TechCrunch');
$('#source3 a').text('Al Jazeera');

// Categories
let category
// category = 'Tech';
// category = 'Business';
// category = 'World News';

// API call and DOM manipulation function
function apiCallToDOM(source, category, sourceName) {
  fetch('https://newsapi.org/v1/articles?source=' + source + '&sortBy=top&apiKey=ee3ef4d9c5e9400d9772295627e981fb').then(function(response) {
    changePopUp.showLoader();
    if (response.ok) {
      return response.json();
    } else {
      console.log("Default API call isn't working");
    }
  }).then(function(data) {
    $('#main').html('');
    changePopUp.hideLoader();
    $('header li span').text(sourceName);
    for(i = 0; i < 4; i++) {
      console.log(data.articles[i]);
      let rank = i + 1;
      let content = `
        <article id="${i}" class="article">
          <section class="featuredImage">
            <img src="${data.articles[i].urlToImage}" alt="" />
          </section>
          <section class="articleContent">
            <a href="#"><h3>${data.articles[i].title}</h3></a>
            <h6>${category}</h6>
          </section>
          <section class="impressions">
            ${rank}
          </section>
          <div class="clearfix"></div>
        </article>
      `;
      $('#main').append(content);
    }
    $('article').on('click', function() {
      changePopUp.openArticle();
      let articleNumber = $(this).attr('id');
      console.log(articleNumber);
      $('#popUp .container h1').text(data.articles[articleNumber].title);
      $('#popUp .container p').text(data.articles[articleNumber].description);
      $('#popUp .container a').attr('href', data.articles[articleNumber].url);
      $('#popUp .closePopUp').on('click', function() {
        changePopUp.closeArticle();
      })
    });
  });
};

apiCallToDOM('bloomberg', 'Business', 'Bloomberg');

// Change Source, on click of source we need a differet GET request (maybe it's possible to make the API calls a variable and use the same get request but just pass in the different API), going to add articles to the DOM in the same way)

$('#source1').on('click', function() { 
  apiCallToDOM('bloomberg', 'Business', 'Bloomberg');
});

$('#source2').on('click', function() {
  apiCallToDOM('techcrunch', 'Tech', 'TechCrunch');
});

$('#source3').on('click', function() {
  apiCallToDOM('al-jazeera-english', 'World News', 'Al Jazeera');
});

// Click Feedr, on click, source goes back to default (API #1)

$('header h1').on('click', function() {
  apiCallToDOM('bloomberg', 'Business', 'Bloomberg');
});

// Search Bar

function search() {
  $('header ul').addClass('hidden');
  $('#search').addClass('active');
}

$('#search img').on('click', function() { // why won't it keep listening for the event
  search();
  $('#search img').on('click', function() {
    $('header ul').removeClass('hidden');
    $('#search').removeClass('active');
  });
});



// Notes
/*
// Loader page functions
function showLoader() {
  $('#popUp').removeClass('hidden');
}

function hideLoader() {
  $('#popUp').addClass('hidden');
}

// Open Article on click of article

function openArticle() {
  $('#popUp').removeClass('loader hidden');
}

// Close Article on click of X

function closeArticle() {
  $('#popUp').addClass('loader hidden');
}
*/

// Add articles to DOM (using template literals?), on successful GET request start adding content
/*

let content = `
  <article class="article">
    <section class="featuredImage">
      <img src="${images/article_placeholder_1.jpg}" alt="" />
    </section>
    <section class="articleContent">
      <a href="#"><h3>${Test.article.title}</h3></a>
      <h6>${Lifestyle}</h6>
    </section>
    <section class="impressions">
      ${526}
    </section>
    <div class="clearfix"></div>
  </article>
`;
*/

// News API Call on page load
/*
source = 'bloomberg';
category = 'Business';
fetch('https://newsapi.org/v1/articles?source=' + source + '&sortBy=top&apiKey=ee3ef4d9c5e9400d9772295627e981fb').then(function(response) {
  changePopUp.showLoader();
  if (response.ok) {
    return response.json();
  } else {
    console.log("Default API call isn't working");
  }
}).then(function(data) {
  changePopUp.hideLoader();
  $('header li span').text('Bloomberg');
  for(i = 0; i < 4; i++) {
    console.log(data.articles[i]);
    let rank = i + 1;
    let content = `
      <article id="${i}" class="article">
        <section class="featuredImage">
          <img src="${data.articles[i].urlToImage}" alt="" />
        </section>
        <section class="articleContent">
          <a href="#"><h3>${data.articles[i].title}</h3></a>
          <h6>${category}</h6>
        </section>
        <section class="impressions">
          ${rank}
        </section>
        <div class="clearfix"></div>
      </article>
    `;
    $('#main').append(content);
  }
  $('article').on('click', function() {
    changePopUp.openArticle();
    let articleNumber = $(this).attr('id');
    console.log(articleNumber);
    $('#popUp .container h1').text(data.articles[articleNumber].title);
    $('#popUp .container p').text(data.articles[articleNumber].description);
    $('#popUp .container a').attr('href', data.articles[articleNumber].url);
    $('#popUp .closePopUp').on('click', function() {
      changePopUp.closeArticle();
    })
  });
});
*/



// Failed attempts

// Hacker News API
/*
fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(function(firstResponse) {
  // Insert function for loader page here
  if (firstResponse.ok) {
    console.log(firstResponse);
    return firstResponse.json();
  } else {
    console.log("Hacker News API call isn't working");
  }
}).then(function(firstData) {
  console.log("this is initial data " + firstData); // getting list of story id's is working, but turning them into the story content is not
  /* Doesn't accomplish anything
  let dataArray = firstData; // Javascript is just inferring that it's and array?
  console.log(dataArray);
  // console.log(dataArray[0]); // If I make dataArray an array I have to do array inception and go to the first element of the dataArray to actually get to the array I want.
  
  for(i = 0; i < 4; i++) {
    fetch('https://hacker-news.firebaseio.com/v0/item/' + firstData[i] +'.json').then(function(secondResponse) {
      if (secondResponse.ok) {
        console.log(secondResponse);
        return secondResponse.json();
      } else {
        console.log("Hacker New Story lookup isn't working");
      }
    }).then(function(secondData) {
      console.log('this is secondary data ' + secondData);
    })
  };
});
*/
// Try a fetch request with just a single story and make sure I can get the data out. Once I get the desired data I can put that fetch request inside my nested for loop hopefully
/*
fetch('https://hacker-news.firebaseio.com/v0/item/8863.json').then(function(response) {
  if (response.ok) {
    console.log(response);
    return response.json();
  } else {
    console.log('something is wrong w/ hacker news')
  }
}).then(function(data) {
  console.log('this is the API response' + data);// for some reason this is returning an empty object
});
*/
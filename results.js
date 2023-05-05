var searchTermEl = document.querySelector("#result");
var resultsContainerEl = document.querySelector("#container");

function getQueryParam() {
    var queryString = document.location.search;
    queryString = queryString.split("&");
    if (queryString.length == 2) {
        var searchTerm = queryString[0].split("=")[1];
        var searchFormat = queryString[1].split("=")[1];
        return [searchTerm, searchFormat];
    } else {
        return queryString;
    }
    
}

function getSearchTerm() {
    var queryParam = getQueryParam();
    searchTermEl.innerText = queryParam[0];
}

function getSearchResults() {
    var queryParam = getQueryParam();
    var apiUrl;
    if (queryParam instanceof Array) {
        apiUrl = "https://www.loc.gov/" + queryParam[1] + "/?q=" + queryParam[0];
    } else {
        apiUrl = "https://www.loc.gov/all/?q=" + queryParam;
    }
    
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
              displayResults(data);

              if (response.headers.get('Link')) {
                //displayWarning(repo);
              }
            });
          } else {
            document.location.replace('./index.html');
          }
    })
}

function displayResults(results) {
    if (results.length == 0) {
        resultsContainerEl.innerText = "There are no results";
        return;
    }

    for (var i = 0; i < results.length; i++) {
        var resultEl = document.createElement('a');
        resultEl.classList = 'list-item flex-row justify-space-between align-center';
        resultEl.setAttribute('href', results[i].html_url);
        resultEl.setAttribute('target', '_blank');

        var titleEl = document.createElement('span');
        titleEl.textContent = results[i].title;
        resultEl.appendChild(titleEl);

        resultsContainerEl.appendChild(resultEl);
    }
}

getSearchTerm();
getSearchResults();
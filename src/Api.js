import React, {Component} from 'react'

class App extends Component {
  state = {
    data: {},
  }

  //retrieve JSON data from API for random wikipedia search when component is mounted
  componentDidMount() {
    //url for query to get 10 random wikipedia pages
    const url =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&grnlimit=10";

    //fetch JSON data from url
    fetch(url)
		  .then((result) => result.json())
			.then((result) => {
				this.setState({
					data: result,
				});
			});
  }

  //get title and url pages from API response on component mount
  componentDidUpdate() {
    //only perform if state data is not already set to data fetched from api
    if((Object.keys(this.state.data).length) !== 10){
      //get api fetch result from state
      const { data } = this.state;
			const resultArray = this.getWikiPages(data)
			this.setState({ data: resultArray });
    }
  }

  //get wiki pages list from data of API fetch result
  getWikiPages(data){
    const jsonDat = Object.entries(data);
    //console.log(jsonDat);

    //get "query" object of JSON response
		var queryResult = jsonDat.pop();
    //console.log(queryResult);
    
    //get "pages" object of query object
    var pages = queryResult.pop();
    //console.log(pages);

    //get array of objects in "pages" object
		var pageArray = Object.entries(pages);
    //console.log(pageArray);

    //get pages array object from entries array
		pages = pageArray.pop();
    //console.log(pages[1]);

    //get array of page objects from pages array
		pageArray = Object.entries(pages[1]);
		//console.log(pageArray);

    //new array for wiki page list items
    var resultArray = new Array(pageArray.length);
    
    //populate array with description list elements   
		for (var i = 0; i < pageArray.length; i++) {
			//get title and url from pages found with search, arrange in description list elements
			resultArray[i] = (
				<div>
					<dt>{pageArray[i][1].title}</dt>
					<dd>
						<a
							href={"http://en.wikipedia.org/?curid=" + pageArray[i][1].pageid}
							className="button"
						>
							Check it out
						</a>
					</dd>
				</div>
			);
    }
    //map results array as list items with keys
    const resultList = resultArray.map((result, index) => 
      <li key={index}>{result}</li>)
		//console.log(resultArray);
    return resultList
  }

  render () {
    //only render list if data.length = number of pages requested from API
    if((Object.keys(this.state.data).length) === 10){
      return <ul>{this.state.data}</ul>
    } else {
      return <h5 >Loading...</h5>
    }
  }
}

export default App
const RecipeList = function(props) {
  if(props.recipes.length === 0) {
    return (
		<div className='recipeList'>
		  <div className='card'>
		    <div className='card-header-title is-centered'>Oops! Recipes aren't loading.</div>
		  </div>
		</div>
	);
  }
  
  const recipeNodes = props.recipes.map(function(recipe) {
	let recipeUrl = `/recipe/${recipe._id}`;
    return (
	  <div key={recipe._id} className='card'>
		<a className='card-header-title is-centered' href={recipeUrl}>{recipe.name}</a>
	  </div>
	);
  });
  
  return (
  <React.Fragment>
    <div className='recipeList'>
	{recipeNodes}
	</div>
  </React.Fragment>
  );
};

const HomePage = function() {
  return (
    <div className='box'>
	  <h1 className='title is-1'>Welcome to Rosy's Recipes!</h1>
	  <p className='intro'>This site is dedicated to the one and only Rosalie Cooper, my great grandmother. She was one of the most incredible people I've ever had the pleasure of knowing, and her cooking shaped my childhood. I hope that by sharing her recipes here, I can keep my family's culinary legacy around for the next generation.</p>
	  <p className='intro'>-Ava Feldman</p>
	  <p><a className='button is-info is-small' href='/allRecipes'>All Recipes</a></p>
	</div>
  );
}

const FavoriteList = function(props) {
  if(props.recipes.length === 0) {
    return (
		<div className='card'>
		  <div className='card-header-title is-centered'>Oops! You don't have any favorites yet!</div>
		</div>
	);
  }
  let index = -1;
  const recipeNodes = props.recipes.map(function(recipe) {
	let recipeUrl = `/recipe/${recipe._id}`;
	index++;
    return (
	  <div key={recipe._id} className='card'>
		<a className='card-header-title is-centered' href={recipeUrl}> {recipe.name} </a>
	    <div className='card-content'>
		  <button className='button is-danger is-small' data-toremove={index}>Unfavorite</button>
	    </div>
	  </div>
	);
  });
  
  return (
  <React.Fragment>
    <div className='favorites'>
	{recipeNodes}
	</div>
  </React.Fragment>
  );
};

const Recipe = function(props) {
  const recipe = props.recipe;
  let key = 0;
  const deChunk = (chunk, tag) => {
    const comp = chunk.map((para) => {
	  return (
	    <p key={key++} className={tag}>{para}</p>
	  );
	});
    return comp;
  }
  
  return (
    <React.Fragment>
      <div className='box'><h1 className='title is-1'> {recipe.name} </h1></div>
	  <div className='recipeImg'> <img src={recipe.img} className='box' alt={recipe.name} /> </div>
	  <section className='box'> {deChunk(recipe.intro, 'para')} </section>
	  <section className='box'>
	    <h2 className='subtitle is-3'> Ingredients: </h2>
		{deChunk(recipe.ingredients, 'ingredient')}
	  </section>
	  <section className='box'>
	    <h2 className='subtitle is-3'> Procedure: </h2>
		{deChunk(recipe.procedure, 'step')}
	  </section>
	</React.Fragment>
  );
}

const loadFromServer = () => {
  sendAjax('GET', '/loadRecipes', null, (data) => {
    ReactDOM.render(
      <RecipeList recipes={data.recipes} />, document.querySelector('#recipe')
    );	
  });
};

const getAcct = () => {
  sendAjax('GET', '/getName', null, (data) => {
    ReactDOM.render(
	  <FavoriteList recipes={data.account.favorites} />, document.querySelector('#recipe')
	);
	let removeButtons = document.querySelectorAll('.removeFave');
	for (let button of removeButtons) {
		button.onclick = (e) => {
	      sendAjax('DELETE', '/removeFavorite', {toRemove: e.target.dataset.toremove}, (data) => {
            getAcct();
		  });
		}
	}
  });
}

const loadPage = () => {
  const dataStr = document.querySelector('#data').innerHTML;
  const data = dataStr.length > 0 ? JSON.parse(dataStr) : false;
  const favoriteButton = document.querySelector('#favoriteButton');
  favoriteButton.style.display = 'none';
  if (!data){
	ReactDOM.render(
	  <HomePage />, document.querySelector('#recipe')
	);
  } else if (data.name) {
	favoriteButton.style.display = 'inline';
	favoriteButton.onclick = () => {
	  sendAjax('POST', '/addFavorite', {recipID: data._id}, () => {
	    favoriteButton.innerHTML = 'Favorited!';
	  });
	};
    ReactDOM.render(
      <Recipe recipe={data} />, document.querySelector('#recipe')
    );
  } else if (data.list) {
	ReactDOM.render(
      <RecipeList recipes={[]} />, document.querySelector('#recipe')
    );  
    return loadFromServer();
  } else if (data.faves) {
	ReactDOM.render(
	  <FavoriteList recipes={[]} />, document.querySelector('#recipe')
	);
	return getAcct();
  }
}

const setup = function() {
  loadPage();
};



$(document).ready(function() {
  setup();
});
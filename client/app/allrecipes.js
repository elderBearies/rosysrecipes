let currentUser;

const RecipeList = function(props) {
  if(props.recipes.length === 0) {
    return (
		<div className='recipeList'>
		  <h3 className='emptyrecipe'>Oops! I haven't put recipes here yet!</h3>
		</div>
	);
  }
  
  const recipeNodes = props.recipes.map(function(recipe) {
	let recipeUrl = `/recipe/${recipe._id}`;
    return (
	  <div key={recipe._id} className='recipe'>
		<a href={recipeUrl}> {recipe.name} </a>
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
      <h1 className='title'> {recipe.name} </h1>
	  <img src={recipe.img} alt={recipe.name} />
	  <section className='intro'> {deChunk(recipe.intro, 'para')} </section>
	  <section className='ingredients'>
	    <h2 className='subTitle'> Ingredients: </h2>
		{deChunk(recipe.ingredients, 'ingredient')}
	  </section>
	  <section className='procedure'>
	    <h2 className='subTitle'> Procedure: </h2>
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
    currentUser = {...data.account};
	name = data.account.name;
  });
};

const loadPage = () => {
  const dataStr = document.querySelector('#data').innerHTML;
  const data = dataStr.length > 0 ? JSON.parse(dataStr) : false;
  console.log(data);
  if (!data){
	ReactDOM.render(
      <RecipeList recipes={[]} />, document.querySelector('#recipe')
    );  
    return loadFromServer();
  }
  ReactDOM.render(
    <Recipe recipe={data} />, document.querySelector('#recipe')
  );
  
}

const setup = function() {
  
  
  
  getAcct();
  loadPage();
};



$(document).ready(function() {
  setup();
});
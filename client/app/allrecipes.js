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

const loadFromServer = () => {
  sendAjax('GET', '/loadRecipes', null, (data) => {
    ReactDOM.render(
      <RecipeList recipes={data.recipes} />, document.querySelector('#allRecipes')
    );	
  });
};

const getAcct = () => {
  sendAjax('GET', '/getName', null, (data) => {
    currentUser = {...data.account};
	name = data.account.name;
  });
};

const setup = function(csrf) {
  
  ReactDOM.render(
    <RecipeList recipes={[]} />, document.querySelector('#allRecipes')
  );
  
  getAcct();
  loadFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken); 
  });
};



$(document).ready(function() {
  getToken();
});
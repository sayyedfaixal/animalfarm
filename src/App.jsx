import { useEffect, useState } from "react";
import Animals from "./Components/Animals";
import "./App.css"



function useAnimalSearch(){
  const [animals, setAnimals] = useState([]);
  /* this code is used to retrieve the last searched query form the localstorage and show whatever the user has searched last
  If this is not present, and if the input box is empty then the UI will have nothing to show but the "Oops! No animals in the farm"
  This is acting like a caching to the search
  */
  useEffect(() =>{
    const lastSearchedQuery = localStorage.getItem("lastSearchedQuery");
    search(lastSearchedQuery);
  }, []);

  const search = async (searchQuery) =>{
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({searchQuery})
      // URLSearchParams => is an inbuilt browser function which transform the query as e.g "searchQuery=dog" in the url
    )
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastSearchedQuery', searchQuery);
  };
  return {search, animals};
}


function App() {
  const {search, animals} = useAnimalSearch();

  return (
    <main>
      <h1 className="title">Animal Farm</h1>
      <input className="inputBox" type="text" placeholder="Search Animals" onChange={(e)=> search(e.target.value)}/>
      <ul>
        {
          animals.map(eachAnimal => (
            // <li key={eachAnimal.id}>
            //   <strong>{eachAnimal.type}</strong> {eachAnimal.name}
            // </li>
            // NOTE: eachAnimal.[property] -> this is comming from the server, if there's an error check the server for any syntax error in the properties
            <Animals key={eachAnimal.id}  animalType={eachAnimal.animalType} animalName={eachAnimal.name} animalAge ={eachAnimal.age} />
          ))
        }
        {animals.length ===0 && "Oops! No animals in the farm"}
      </ul>
    </main>
  )
}

export default App

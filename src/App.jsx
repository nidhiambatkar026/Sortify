import React from 'react';
import { USERS } from './config';
import { useEffect , useState } from 'react';


function App() {
  const[searchText, setSearchText] = useState("");
  const[filtredUsers, setFilteredUsers] = useState(USERS);
  const[filterCity, setFilterCity] = useState("");
  const[filterAge, setFilterAge] =useState("");
  const[sortOrder , setSortOrder] = useState("asc");

  useEffect(() => {
    if (!searchText) {
      setFilteredUsers(USERS);
      return;
  }

  const tempFilteredUsers = USERS.filter((user) => {
    if (user.name.toLocaleLowerCase().includes(searchText)) {
      return true;
    } else if(user.city.toLocaleLowerCase().includes(searchText)){
      return true;
    } else if(user.age.toString().includes(searchText)){
      return true;
    } else {
      return false;
    }
  });

  setFilteredUsers(tempFilteredUsers);
}, [searchText]);

useEffect(() => {
  if(!filterCity && !filterAge){
    setFilteredUsers(USERS);
    return;
  }

  const tempFilteredUsers = USERS.filter((user) => {
    if(
      filterCity && user.city === filterCity && filterAge && user.age === parseInt(filterAge)){
        return true;
      }
      if(filterAge && !filterCity && user.age === parseInt(filterAge)){
        return true;
      }
      if(filterCity && !filterAge && user.city === filterCity){
        return true;
      }
      return false;
    });

    setFilteredUsers(tempFilteredUsers);
  }, [filterCity, filterAge]);
  

  return (
    <div className="bg-slate-100 min-h-screen">
      <h1 className="text-center text-blue-500 text-4xl font-bold py-5">
      Search, Sort and Filter
      </h1>

      <input
      type="text"
      placeholder="Search "
      className="w-2/3 p-2 mt-10 bg-white block mx-auto rounded-lg text-2xl focus:outline-none border border-gray-200"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
      />

      
    </div>
  )
}

export default App
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

      {searchText ? (
        <p className="text-center mt-1">
          {filteredUsers.length === 0
          ? "Oops! No users found,.. Try another search...": `Found ${filteredUsers.length} users for search result...`}
        </p>
      ) :null}

      <div className="flex justify-around">
        <div>
          <span>Filter By City: </span>
          <select
          className="bg-white text-lg my-2 rounded-lg px-5"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          >
            <option value = "">All</option>
            {USERS.map((user) => {
              return (
                <option key={user.city} value={user.city}></option>
              );
            })}
            </select>
        </div>

        <div>
          <span>Filter By Age: </span>
        </div>
      </div>
    </div>
  )
}

export default App
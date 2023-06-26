import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState,useEffect } from 'react';
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";



function App(){
  const API_URL ='  http://localhost:3500/items';
  const [items,setItems]=useState(JSON.parse(localStorage.getItem("todo_list"))||[] );
  const[newItem,setNewItem]=useState('')
  const [search,setSearch]=useState('')
  const[isLoading,setIsLoading]=useState(true)




 

  const addItem=async(item)=>{
    const id=items.lengrh ? items[items.length-1].id+1:1;
    const addNewItem={id,checked:false,item}
    const listItems=[...items,addNewItem]
    setItems(listItems)

    const postOptions={
      method:'POST',
      headers:{
        'content-Type':'application/json'


      },
      body:JSON.stringify(addNewItem)
    }
   
  
  }

const handleCheck=(id)=>{
  const listItems = items.map((item)=>
  item.id===id?{ ...item,checked:!item.checked}:item)
    setItems(listItems)
}
const handleDelete=(id)=>{
 const listItems=items.filter((item)=>
 item.id!==id)
 setItems(listItems)
 localStorage.setItem("todo_list",JSON.stringify
 (listItems))

 }
 const handleSubmit =(e)=>{
  e.preventDefault()
  if(!newItem) return;
  console.log(newItem)
  addItem(newItem)
  setNewItem('')

}
    return(
        <div className="App">
          <Header title="To do list"/>
          <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
          
          />
          <SearchItem
          search={search}
          setSearch={setSearch}
          
          />
          <main>
        <Content
          items={items.filter(item => ((item.item).
           toLowerCase()). includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          />
          </main>
          <Footer
          length={items.length}
          />
        </div>
    );
}
export default App;

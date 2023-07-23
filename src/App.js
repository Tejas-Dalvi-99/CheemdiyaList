import { useState } from "react";

export default function App() {
  const [items , setItems] = useState([]); 

  function handleAddItems(item){
    setItems((items)=> [...items , item]); 
  }

  function handleDelete(id){
    setItems(items=>items.filter(item=>item.id !==id)); 
  }

  function handleCheckItem(id){
    setItems(items=>items.map(item=> item.id === id ? {...item, packed: !item.packed} : item))
  }

  function handleClearList(){
    if(items.length !== 0)
    {
    const confirm = window.confirm("Do you want to clear the list ?"); 
    if(confirm) setItems([]);
    }else{
      alert("You don't have items in your list !"); 
    } 
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItems={handleDelete} onCheckItems={handleCheckItem} onClearList={handleClearList}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo() {
  return (
    <>
      <h1><span className="heading-emoji">😱</span> Cheemdiya List <span className="heading-emoji">🙀</span></h1>
    </>
  );
}
function Form({onAddItems}) {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  

  function handleSubmit(e) {
    e.preventDefault();

    if(!itemName) return; 
    const newItem = {
      itemName, itemQuantity, packed: false, id: Date.now()
    }; 
    console.log(newItem); 
    onAddItems(newItem); 

    setItemName(""); 
    setItemQuantity(1); 
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What Items do you need to Pack 🐤? </h3>
        <select
          value={itemQuantity}
          onChange={(e) => setItemQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Items..."
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </>
  );
}
function PackingList({items, onDeleteItems, onCheckItems, onClearList}) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item item={item} onDeleteItems={onDeleteItems} key={item.id} onCheckItems={onCheckItems}/>
          ))}
        </ul>

      <div className="actions">
        <button onClick={onClearList}>Clear</button>
      </div>
      </div>
    </>
  );
}
function Stats({items}) {
  const totalItems=items.length; 
  const packedItems = items.filter((item)=>item.packed); 
  return (
    <>
      <footer className="stats">
        {totalItems ? <em>You Have {totalItems} Items in your list and you packed {packedItems.length===totalItems ? "all of them" : `${packedItems.length} of them`} <span><img src="https://ih1.redbubble.net/image.4986092081.8077/st,small,507x507-pad,600x600,f8f8f8.u1.jpg" className="banana-cat-heart" alt="heartcat"></img></span></em> : <em>Your List is Empty <span><img src="https://media.tenor.com/u8M7kk5ZXmwAAAAC/banana-cat-crying.gif" alt="cry" className="banana-cat"></img></span></em>}
      </footer>
    </>
  );
}

function Item({ item, onDeleteItems,onCheckItems }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={()=>onCheckItems(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.itemQuantity}-{item.itemName} <button onClick={()=>onDeleteItems(item.id)}>❌</button>
      </span>
    </li>
  );
}

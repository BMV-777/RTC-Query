import { useState } from "react";
import { useGetGoodsQuery,useAddProductMutation, useDeleteProductMutation } from "./redux";

function App() {
  
  const [count,setCount] =useState('')
  const [newProduct, setNewProduct] = useState('')
  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct, { isError }] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <h1>Loading...</h1>;
  
  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({name: newProduct}).unwrap()
    }
    setNewProduct('');
  }
  
  const handleDelete = async (id) => {
   await deleteProduct(id).unwrap();
  }

  
  return (
    <div>
      <div>
        <input
          type='text'
          value={newProduct}
          onChange={e => setNewProduct(e.target.value)}
        />
        <button type="button" onClick={handleAddProduct}>addProduct</button>
      </div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="''">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.id} onClick={() => handleDelete(item.id)} >{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

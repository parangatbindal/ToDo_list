import React ,{useEffect, useState} from 'react'
import "./style.css";

/* getting local storage data */
const getlocalData=()=>{
   const lists= localStorage.getItem("mytodolist");

    if(lists)
    {
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}
const Todoapp = () => {
    const [inputdata ,setInputdata] = useState("");
    const [items, setItems] = useState(getlocalData());
    const [iseditItem,setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItem=()=>{
        if(!inputdata)
        {
            alert("please input any data");
        }
        else if(inputdata && toggleButton)
        {
            setItems(items.map((currelm)=>{
                if(currelm.id===iseditItem)
                {
                    return {...currelm,name:inputdata}
                }
                else
                return currelm;
            }))
            setInputdata("")
            setIsEditItem(null);
            setToggleButton(false);
        }
        else
        {
            const newInputData={
                id: new Date().getTime().toString(),
                name:inputdata
            };
            setItems([...items,newInputData]);
            setInputdata("");
        }
    } 
        /* edit item in the list */
        const editItem=(index)=>{
            const edited_item= items.find((currelm)=>{
                return currelm.id===index;
            })

            setInputdata(edited_item.name)
            setIsEditItem(index);
            setToggleButton(true);
        }


         /* deleting elements from the list */

         const deleteitems=(index)=>{
                 const updatedlist= items.filter((currelm)=>{
                     return currelm.id != index;
                 })

                 setItems(updatedlist);
         }

         /* deleting all items at once */

         const removeAll=()=>{
           setItems([]);
         }

         /* setting local storage */
         useEffect(()=>{
            localStorage.setItem("mytodolist",JSON.stringify(items))
         },[items])

    return (
        <>
           <div className='main-div'>
               <div className='child-div'>
                   <figure >
                       <img src="./images/todo.svg" alt="todoimage" />
                       <figcaption>Add your List here ✌</figcaption>
                   </figure>
                   <div className='addItems'>
                       <input type="text" placeholder='✍ Add Items' 
                        className='form-control' value={inputdata} 
                        onChange={(event) => setInputdata(event.target.value)}/>

                        {
                            toggleButton?<i className="far fa-edit add-btn" onClick={addItem}></i>:
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        }
                       
                   </div>
                   {/* show ITEMS*/}

                      <div className='showItems'>
                      {
                          items.map((currelm)=>{
                              return(
                                <div className='eachItem' key={currelm.id}>
                              <h3>{currelm.name}</h3>
                              <div className='todo-btn'>
                              <i className="far fa-edit add-btn" onClick={()=>editItem(currelm.id)}></i>
                              <i className="far fa-trash-alt add-btn" onClick={()=>deleteitems(currelm.id)}></i>
                              </div>
                          </div>
                              )
                          })
                      }
                          
                      </div>

                   {/*Remove button */}
                   <div className='showItems'>
                       <button className='btn effect04' data-sm-link-text="Remove All" > <span onClick={()=>removeAll()}>CHECK LIST</span></button>
                   </div>
               </div>
           </div> 
        </>
    )
}

export default Todoapp

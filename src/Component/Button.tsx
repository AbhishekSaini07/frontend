import React, { useState } from "react";
// const MyButton = (props: {text: string})=>{
//     return <button>{props.text}</button>;
// }
interface MyButtonProps { // My Button Interface
    text: string | number | boolean;
    onClick?:()=> void;  //? is for optional
}
interface Book {
    name: string,
    price: number
}

const MyButton:React.FC<MyButtonProps> = (props)=>{
    const {text, onClick} = props; //deframe 
    // const [value,setValue] = useState(1); //impicit casting acc to default number
    const [value,setValue] = useState<Book>({
        name: 'One',
        price: 10
    });
    const [inpt,setInpt] = useState<string | undefined>("");
    const handelNameChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setInpt(e.target.value);
        

    }
    const handelSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(e);
    }
    return (<div>
        <h3>{value.name} and {value.price}</h3>
        <button onClick={()=> setValue({name: "abhi", price: value.price+1})}>{text}</button>
        <h2>{inpt}</h2>
        <form onSubmit={handelSubmit}>
             <input onChange={handelNameChange}  type="text" placeholder="Enter Your Name" value={inpt}/>
             <button type="submit">Submit</button>
             </form>
       
    </div>
    );
}
export default MyButton;
//https://randomuser.me/documentation#howto

import axios from "axios";
import {useState , useEffect} from "react"

export default function Home() {
    const [result, setResult] = useState([]);
    const endpoint = `https://randomuser.me/api?results=100`;
    
    useEffect(()=>{
        axios.get(endpoint).then((res)=> {
            setResult(res.data.results);
        });
    },[])

    return (
      <>
        {result.map((item,index)=> {

            return (
                <div key={index}>{item.gender}</div>
            )
        })}
      </>
    )
  }




export async function getServerSideProps(context) {
    // const endpoint = `https://randomuser.me/api/?results=5`;
    // const users = await axios.get(endpoint).then((res)=> res.data)

    return {
      props: {
      }, // will be passed to the page component as props
    };
  }
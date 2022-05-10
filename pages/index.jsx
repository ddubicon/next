//https://randomuser.me/documentation#howto

import axios from "axios";
import {useState , useEffect} from "react"

export default function Home({users}) {
    console.log(users.results)
    const [result, setResult] = useState(users.results);

    const endpoint = `https://randomuser.me/api?results=12`;
    const fetchData = async () =>{
        const res = await axios.get(endpoint).then(res =>res.data);
        const resultsData = await res.results;

        setResult(resultsData);
    }

    useEffect(()=>{
        setResult(result);
    },[])

    useEffect(()=>{
        console.log('asdf');
    },[result])


    return (
      <>
        {result.map((item,index)=> {

            return (
                <div key={index}>{item.gender}</div>
            )
        })}
        <button type="button" onClick={fetchData}>갱신</button>
      </>
    )
  }




export async function getServerSideProps(context) {
    const endpoint = `https://randomuser.me/api/?results=12`;
    const users = await axios.get(endpoint).then((res)=> res.data)

    return {
      props: {
          users,
      }, // will be passed to the page component as props
    };
  }
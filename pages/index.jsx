//https://randomuser.me/documentation#howto

import axios from "axios";
import {useState , useEffect} from "react"
import { useRouter } from 'next/router'

export default function Home({users, initPage}) {
  const router = useRouter();
    const [currentPage , setCurrentPage] = useState(router.query.page | 1);
    const [result, setResult] = useState([]);
    const [loadingState , setLoadingState] = useState(false);
    
    const fetchData = async () =>{
      const endpoint = `https://randomuser.me/api/?page=${currentPage}&results=10&seed=abc`;
      const res = await axios.get(endpoint).then(res =>{
        setLoadingState(false);
        return res.data;
      });
      
      setResult(res.results);
    }


    useEffect(()=>{
      console.log('a');
      fetchData();
      setLoadingState(true);
      if(currentPage != 1 ) {
        router.push(`${router.pathname}?page=${currentPage}`);
      }else{
        router.push(`${router.pathname}`);
      }
    },[currentPage])


    return (
      <>
      {loadingState ? (
        <div>loading...</div>
      ):(
        <div>
          {
            result.map((item,index)=> {
              return (
                  <div key={index}>{item.gender}</div>
              )
            })
          }
        </div>
        
      )}
        <div style={{display: "flex"}}>
          <button type="button" onClick={()=> setCurrentPage(1)}>1</button>
          <button type="button" onClick={()=> setCurrentPage(2)}>2</button>
          <button type="button" onClick={()=> setCurrentPage(3)}>3</button>
          <button type="button" onClick={()=> setCurrentPage(4)}> 4</button>
          <button type="button" onClick={()=> setCurrentPage(5)}>5</button>
        </div>
        {/* <button type="button" onClick={fetchData}>갱신</button> */}
      </>
    )
  }




export async function getServerSideProps(context) {

    // const initPage = context.query.page || 1;
    // const endpoint = `https://randomuser.me/api/?page=${initPage}&results=10&seed=abc`;
    // const users = await axios.get(endpoint).then((res)=> res.data)

    return {
      props: {
          // users,
          // initPage,
      }, // will be passed to the page component as props
    };
  }
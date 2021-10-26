import type { NextPage } from "next";
import "bootswatch/dist/cyborg/bootstrap.min.css";
import Header from "./components/Header";
import { useState, useEffect, useRef, ChangeEvent} from "react";
import HandleClickFetchData from "./utils/HandleClickFetchData";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState<string>('22 rue des olives');
  const inputRef = useRef<HTMLInputElement>(null); 
  const router = useRouter();


  useEffect(() => {
      inputRef.current?.focus()
  },[])

  const handleChangeInputValue = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleClickButton = () => { 
    let format_adress:string= "";
    // format la value de input (ss+ssss+ssss)
    inputValue.split(' ').filter((part, index) => { if (index === 0) { return format_adress = part} else return format_adress += "+" + part});
    HandleClickFetchData({adress : format_adress, router});
  }

  return (
    <div>
      <Header />
      <div className="card">
        <img
          className="card-img-top"
          src="https://picsum.photos/200/200"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">Fetch Adress</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            iure similique sapiente eligendi ut. Corrupti sapiente placeat
            dolorum accusamus dolorem tempore sed labore velit. Enim?
          </p>
          <input type="text" value={inputValue} ref={inputRef} onChange={handleChangeInputValue}/>
          <button type="button" onClick={handleClickButton} className="btn btn-fetch-data btn-primary">
            Fetch the data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React,{useRef, useState, useEffect, ChangeEvent, SetStateAction} from 'react'

function CodePostalAutoCompletion(props:{setCodePostal:any, codePostal:any}) {
    const [displayCodePostal, setDisplayCodePostal] = useState(false);
    const inputRef = useRef(null);
    const [inputCodePostalValue, setinputCodePostalValue] = useState<string>("");
    const [options, setOptions] = useState<any[]>([]);
    const [codePostal, setCodePostal] = useState<string>(props.codePostal); 

  useEffect(() => { 
    setCodePostal(props.codePostal)
  },[props.codePostal])

    const handleChangeInputCodePostalValue = async (e:ChangeEvent<HTMLInputElement>) => {
      setCodePostal(e.currentTarget.value)
        e.currentTarget.value !== "" && setDisplayCodePostal(true);
          setinputCodePostalValue(e.currentTarget.value)
          const p = await fetch(`https://api-adresse.data.gouv.fr/search/?q=""?postcode="${e.currentTarget.value}""`, { 
      })
      const res = await p.json();
      var postcodes:any = [];
      // todo: push uniquement une fois le meme postcode
      const res_1 = await res && res.features.map((item:any, index:any) => {
          if (!postcodes.includes(item.properties.postcode)){ 
              postcodes.push(item.properties.postcode + " - " + item.properties.city);
          }   
      })
      await res_1 && setOptions(postcodes);
      }

    
      const handleClickCodePostal = async (e:any) => {
        let split = e.currentTarget.innerHTML.split(' ');
        setCodePostal(split[0]); 
        codePostal && setinputCodePostalValue(codePostal);
        setDisplayCodePostal(!displayCodePostal);
        props.setCodePostal(split)
      }

    return (
        <p className="card-text">
        Code postal
        <input type="text" onClick={() => setDisplayCodePostal(!displayCodePostal)} ref={inputRef} value={codePostal} onChange={handleChangeInputCodePostalValue}/>
        {displayCodePostal && 
        <div className="result-autocompletion--codePostal">
            {options.map((v,i) => { 
                return <div key={i} onClick={(event) => handleClickCodePostal(event)} className="result-autocompletion--codePostal">
                  {v}
                </div>
            })
          }
          </div>
        }
    </p>
    )
}

export default CodePostalAutoCompletion

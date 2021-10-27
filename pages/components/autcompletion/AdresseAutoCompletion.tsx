import React,{useState, useEffect, ChangeEvent} from 'react'

function AdresseAutoCompletion(props:{setAdresse:any, postcode:string | undefined, adresse:any}) {

    const [adresse,setAdresse] = useState<string>(props.adresse);
    const [displayAdress, setDisplayAdress] = useState<boolean>(false);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => { 
        setAdresse(props.adresse);
    },[props.adresse, props.postcode])

    const handleChangeAdressValue = async (e:ChangeEvent<HTMLInputElement>) => {
        setAdresse(e.currentTarget.value)
        console.log(props.postcode?.length)
        let query = `https://api-adresse.data.gouv.fr/search/?q=${e.currentTarget.value}`;
        if (props.postcode && props.postcode.length == 5) { 
            query += `?postcode="${props.postcode}"`;
        }
          e.currentTarget.value !== "" && setDisplayAdress(true);
            const p = await fetch(query, { 
        })
        const res = await p.json();
        var adresses:any = [];
        // todo: push uniquement une fois le meme postcode
        const res_1 = await res && res.features.map((item:any, index:any) => {
            adresses.push({adresse: item.properties.name, 
            postcode: item.properties.postcode, 
            city: item.properties.city
        });
        })
        await res_1 && setOptions(adresses);
        }

        const handleClickAdresse = (event:any) => {
            setAdresse(event.currentTarget.innerHTML);
            let split = event.currentTarget.id.split(' ');
            props.setAdresse(split)
            setDisplayAdress(false);
        }   

    return (
        <div>
             <p className="card-text">
                Adresse
            <input type="text" value={adresse} onChange={handleChangeAdressValue}/>
            </p>
            {displayAdress && 
        <div className="result-autocompletion--codePostal">
            {options.map((v:any,i) => { 
                return <div id={`${v.postcode} ${v.city}`} key={i} onClick={(event) => handleClickAdresse(event)} className="result-autocompletion--codePostal">
                  {v.adresse}
                </div>
            })
          }
          </div>
        }
        </div>
    )
}

export default AdresseAutoCompletion

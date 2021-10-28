import React,{useRef, useState, useEffect, ChangeEvent} from 'react'; 
import AdresseAutoCompletion from './components/autcompletion/AdresseAutoCompletion';
import CodePostalAutoCompletion from './components/autcompletion/CodePostalAutoCompletion';
import VilleAutoCompletion from './components/autcompletion/VilleAutoCompletion';
import Header from './components/utils/Header';

function Autocompletion() {
    const [inputCodePostalValue, setinputCodePostalValue] = useState<string>();
    const [inputCityValue, setinputCityValue] = useState<string>('');
    const [inputAdressValue, setinputAdressValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null); 

    const [codePostal, setCodePostal] = useState<string>()
    const [ville, setVille] = useState<string>()
    const [cpVille, setCpVille] = useState<string>(''); 
    const [villeCp, setVilleCp] = useState<string>(''); 
    const [adresseVilleCp, setAdresseVilleCp] = useState<string>('')
    const [adresse, setAdresse] = useState<string>('');

    useEffect(() => {
        inputRef.current?.focus()
    },[])

    useEffect(() => { 
      setCodePostal(cpVille[0]); 
      setVille(cpVille[2])
      setAdresse('')
    },[cpVille])

    useEffect(() => { 
      setCodePostal(villeCp[2]); 
      setVille(villeCp[0])
      setAdresse('')
    },[villeCp])

    useEffect(() => { 
      setCodePostal(adresseVilleCp[0]); 
      setVille(adresseVilleCp[1])
      setAdresse(adresseVilleCp[2])
    },[adresseVilleCp])

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
            <h5 className="card-title">Formulaire d'auto-complétion</h5>
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              iure similique sapiente eligendi ut. Corrupti sapiente placeat
              dolorum accusamus dolorem tempore sed labore velit. Enim?
            </p>

            <CodePostalAutoCompletion codePostal={codePostal} setCodePostal={setCpVille} />

            <VilleAutoCompletion setVille={setVilleCp} ville={ville} />

            <AdresseAutoCompletion setAdresse={setAdresseVilleCp} postcode={codePostal} adresse={adresse}/>

          </div>
        </div>
      </div>
    )
}

export default Autocompletion

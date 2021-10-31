import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
} from "react";

function CodePostalAutoCompletion(props: {
  setCodePostal: any;
  codePostal: any;
}) {
  const [displayCodePostal, setDisplayCodePostal] = useState(false);
  const inputRef = useRef(null);
  const [options, setOptions] = useState<any[]>([]);
  const [codePostal, setCodePostal] = useState<string>(props.codePostal);

  // Si un clic sur une option de l'input adresse on récup via le parent le nouveau CP
  useEffect(() => {
    setCodePostal(props.codePostal);
  }, [props.codePostal]);

  const handleChangeInputCodePostalValue = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setCodePostal(e.currentTarget.value);
    e.currentTarget.value !== "" && setDisplayCodePostal(true);
    // fetch api avec uniquement postcode(requête adresse vide)
    const p = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=""?postcode="${e.currentTarget.value}""`,
      {}
    );
    const res = await p.json();
    var postcodes: any = [];
    // todo: push uniquement une fois le meme postcode
    const res_1 =
      (await res) &&
      // On récup les cp et on push cp - ville dans les options du completion
      res.features.map((item: any, index: any) => {
        if (!postcodes.includes(item.properties.postcode)) {
          postcodes.push(
            item.properties.postcode + " - " + item.properties.city
          );
        }
      });
    (await res_1) && setOptions(postcodes);
  };

  const handleClickCodePostal = async (e: any) => {
    let split = e.currentTarget.innerHTML.split(" ");
    setCodePostal(split[0]);
    setDisplayCodePostal(!displayCodePostal);
    // On renvoi au parent [0] cp et [1] ville 
    props.setCodePostal(split);
  };

  return (
    <p className="card-text">
      Code postal
      <input
        type="text"
        onClick={() => setDisplayCodePostal(!displayCodePostal)}
        ref={inputRef}
        value={codePostal}
        onChange={handleChangeInputCodePostalValue}
      />
      {displayCodePostal && (
        <div className="result-autocompletion--codePostal">
          {options.map((v, i) => {
            return (
              <div
                key={i}
                onClick={(event) => handleClickCodePostal(event)}
                className="result-autocompletion--codePostal"
              >
                {v}
              </div>
            );
          })}
        </div>
      )}
    </p>
  );
}

export default CodePostalAutoCompletion;

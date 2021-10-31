import React, { useState, useEffect, ChangeEvent } from "react";

function VilleAutoCompletion(props: { setVille: any; ville: any }) {
  const [ville, setVille] = useState<string>(props.ville);
  const [displayCity, setDisplayCity] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  // Si clic sur input adresse, reset value ville
  useEffect(() => {
    setVille(props.ville);
  }, [props.ville]);

  const handleChangeInputCityValue = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setVille(e.currentTarget.value);
    e.currentTarget.value !== "" && setDisplayCity(true);
    // on fetch api avec uniquement city = (requête q vide)
    const p = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=""?city="${e.currentTarget.value}""`,
      {}
    );
    const res = await p.json();
    var cities: any = [];
    const res_1 =
      (await res) &&
      // todo: push uniquement une fois le meme postcode
      res.features.map((item: any, index: any) => {
        if (!cities.includes(item.properties.postcode)) {
          // On push dans cities les options pour le completion format ville - cp
          cities.push(item.properties.city + " - " + item.properties.postcode);
        }
      });
    (await res_1) && setOptions(cities);
  };

  const handleClickCity = async (e: any) => {
    let split = e.currentTarget.innerHTML.split(" ");
    setVille(split[0]);
    setDisplayCity(!displayCity);
    // on push au parent ville [0] cp [1]
    props.setVille(split);
  };
  return (
    <div>
      <p className="card-text">
        Ville
        <input
          type="text"
          value={ville}
          onChange={handleChangeInputCityValue}
        />
      </p>
      {displayCity && (
        <div className="result-autocompletion--codePostal">
          {options.map((v, i) => {
            return (
              <div
                key={i}
                onClick={(event) => handleClickCity(event)}
                className="result-autocompletion--codePostal"
              >
                {v}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default VilleAutoCompletion;

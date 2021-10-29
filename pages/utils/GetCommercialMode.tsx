import { display_info, display_informations } from "../interfaces/interfaces";

//   Switch le le mode déplacement (sauf walking) et renvoit data à display sur la section
function GetCommercialMode(display_informations: display_informations, duration:number) {
  let displayInfos: display_info = {
    mode:'',
    colorLine:`#${display_informations.color}`,
    Line :display_informations.label,
    direction : display_informations.direction,
    label  :display_informations.name,
    duration : parseInt((duration / 60).toString()),
  };
  switch (display_informations.commercial_mode) {
    case "Bus":
        displayInfos.mode = "Bus"
        break;
    case "Métro": 
        displayInfos.mode = "Métro"
        break;
    case "Tramway":
        displayInfos.mode = "Tramway"
        break;
    }

  return displayInfos;
}

export default GetCommercialMode;

# CINEMAPS
Web application that let you choose between differents paths(public transport and walking) from a Parisian adress to a choosen near theater. 

![cinemaps_gif](https://user-images.githubusercontent.com/63792769/139593694-0d57b337-ad86-4e17-af5f-07067bea833f.gif)

Once your adress is selected you choose one of the 10 nearest displayed theater. Once the theater selected you select the path you prefer. The web app display the path on a map and give you the details.

Link to the [live version](https://cinemaps.vercel.app/).

### Built with 

[React.js](https://fr.reactjs.org/)\
[Next.js](https://fr.reactjs.org/)\
[Sass](https://sass-lang.com)

## APIs

[Adresse](https://adresse.data.gouv.fr/api-doc/adresse) - Public API for french adress\
[Navitia](http://doc.navitia.io/) - Public API for Ile-de-France public transport\
[Cinemas](https://data.culture.gouv.fr/explore/dataset/etablissements-cinematographiques/api/) - Public API for Cinemas in France\
[MovieDB](https://www.themoviedb.org/documentation/api?language=fr) - Public API for movies\
[GoogleMaps](https://developers.google.com/maps/documentation/javascript/overview?hl=fr) - GoogleMaps API

## Getting started
This is a project built with create-next-app

### Prerequisities & installation
Once the repo clone with

```
git clone https://github.com/jonathan-robin/cinemaps.git
```
if not already installed, install npm 
```
npm install npm@latest -g
```
then install the project packages
```
npm install
```
To run the dev server, run
```
npm run start
```

### Usage

Get free API keys for each API you want to use and put it in a ```.env``` file at the root.

## Contributing

Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Fork the Project\
Create your Feature Branch (```git checkout -b feature/AmazingFeature```)\
Commit your Changes (```git commit -m 'Add some AmazingFeature'```)\
Push to the Branch (```git push origin feature/AmazingFeature```)\
Open a Pull Request
## Contact
Jonathan ROBIN - contact@jonathan-robin.com\
https://www.jonathan-robin.com \
https://www.github.com/jonathan-robin

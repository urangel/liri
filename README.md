# liri-mode-app

## This program has four functions:
 - - -
It can retrieve upcoming shows for a specified artist with the concert-this command like this:
> node liri.js concert-this BANDNAME

where BANDNAME is the band you want to search for.

- - -

It can show you a list of relevant songs from spotify and give you a link to listen to it like this: 
> node liri.js spotify-this-song SONGNAME

where SONGNAME is the song you want to search for.

- - - 

It can give you movie information for a specified movie like this:
> node liri.js movie-this MOVIENAME

where MOVIENAME is the movie you want to search for. 

- - - 

Lastly, the do-what-it-says function allows you to run a command that the random.txt file specifies.
> node liri.js do-what-it-says

random.txt must contain the first command (either of the three specified above) and the query delimited by a comma.

Here is an example:

https://drive.google.com/file/d/11skhYBP1YyQLMEUQBGURH3fztbJfQa8E/view?usp=sharing

The end of the video displays how liri handles errors or lack of values when retreiving data. This allows for data to be retreived even if incomplete.

_Have fun with liri! :D_
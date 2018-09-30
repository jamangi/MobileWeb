# MobileWeb
Find and list limitations of web dev for mobile
https://jamangi.github.io/MobileWeb/home.html


## Grid
+ Put code inside window.onload to ensure it finds the html elements.
  + It's possible that the javascript below the html still renders first, or asynchronously.
+ Put all dependant code inside one file
  + The code can't communicate across window.onload functions.

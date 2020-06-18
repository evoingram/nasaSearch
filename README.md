[![Maintainability](https://api.codeclimate.com/v1/badges/b21fbbb38f5918d60ada/maintainability)](https://codeclimate.com/github/evoingram/nasaSearch/maintainability)

# [NASA Images Search Clone](https://nasasearchclone.now.sh/)

## Product Overview

* [Deployed Project](https://nasasearchclone.now.sh/)

* [Original Cloned Site](https://images.nasa.gov/)

# Project Description

This is a clone of images.NASA.gov, NASA's media library, improved over the original.

## Key Features

- search NASA's media library by media type
- view 100 most popular media files
- view 100 most recently uploaded media files
- filter search results by media type
- narrow search results by year taken
- list and thumbnail views of search results
- file-specific info on single-file details page such as file size, fformat, captions file name, links to different sizes of media file, NASA ID, center, date created, link to center website, description
- share single media file on social media

## Major Differences
### "Better" options are bolded.

| NASA version | Clone           |
| :------------- | :--------------- |
| **can download many file sizes**   | only original available (future feature)     |
| **EXIF data** | no EXIF data (future feature) |
| tooltips to display extra info in search results | **grid view to eliminate tooltips for accessibility** |
| displays textfield displaying file URL and link to same URL | **displays no textfield, only button to download file** |
| three share options | **nine share options** |
| displays breadcrumbs in top left AND right side of detail page | **displays same info on right side only of detail page** |
| displays keywords and links them to search  | **displays keywords, unlinked because search is always in header** |
| search results always have a left-hand sidebar which contains search features that are not available until after first search | **full-featured search function always in header & available from first search, left-hand sidebar eliminated** |
| Center website linked on 'Visit Center Website' text, center initials not linked | **no 'Visit Center Website' text, center initials linked** |

## Tech Stack

Front end deployed to `Vercel` and built using:

- [React](https://reactjs.org/): ReactJS is an open-source JavaScript library which is used for building user interfaces specifically. for single page applications. It's used for handling view layer for web and mobile apps. React also allows us to create reusable UI components.
- [Redux](https://redux.js.org/):  predictable state container for JavaScript apps.
- [Styled Components](https://styled-components.com/):  visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress.
- [Video React](https://video-react.js.org/):  a web video player built for the HTML5 world using React library.
- [Axios](https://github.com/axios/axios):  promise-based HTTP client for both browser and node.js.

# Available Scripts 

in the project directory, you can run: 

### `npm start`
### `npm build`
### `npm test`
### `npm eject`

# APIs

[NASA API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)
   
# Testing

Cypress testing will be completed in a future release.

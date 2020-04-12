# NASA Images Search Clone

work in progress

## Clone of images.NASA.gov image/audio/video library in React & Redux

## To Do

- [ ] plan & write tests

## Major Differences

- Can't download different image sizes, only 'original' size
- no EXIF data
- no tooltips because of accessibility; instead same info is in small area below each thumbnail
- no 'Visit Center Website' link because it's duplicative (link is dynamically created w/ center initials on single detail page)
- no textfield for full resolution URL; instead just displays as a link because it's duplicative
- NASA page is less compact w/ left-hand bar after you search; not w/ mine because it's duplicative; instead full-featured search function is in header
- w/i single detail page, keywords aren't linked to do an additional search because it's duplicative; use search header to search by center initials
- no breadcrumbs display in top left because it's duplicative (info listed on single detail page already)

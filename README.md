# NASA Images Search Clone

work in progress

## Clone of images.NASA.gov image/audio/video library in React & Redux

## To Do

- [ ] plan & write tests

## Major Differences

- Can't download different image sizes, only 'original' size (future feature, not part of MVP)
- no EXIF data (future feature, not part of MVP)
- no tooltips like NASA version because of accessibility; instead same info is in small area below each thumbnail.
- no 'Visit Center Website' link like in NASA version because it's duplicative; on clone, link is dynamically created w/ center initials on single detail page.
- no textfield for full resolution URL like in NASA version; instead just displays as a link because it's duplicative.
- NASA search feature is less compact with left-hand bar after you search, and some search features are not available until after you search the first time; with clone, a full-featured search function is in header and available from first search.
- within a single nasaid's detail page, keywords on the NASA version are linked to do an additional search, which is duplicative; in clone, you use search header to search by center initials or keyword and keywords are simply displayed unlinked on the detail page.
- in clone, there is no breadcrumbs display in top left because it's duplicative, and the info is listed on the single detail page already.

# 500px Coding Challenge

[Try it here!](http://500pxcodingchallenge.s3-website.us-east-2.amazonaws.com/)

This was a fun exercise and was my first time ever working with React. As a result it was maybe a little more challenging to complete in a quality way than for the average applicant.  

It was also definitely a fun challenge though - I learned A LOT over the course of my weekend which is valuable in and of itself. React is a really interesting framework and I intend to continue my learning over the coming weeks.

In particular, I think I will focus my time on developing a better intuition for encapsulation patterns in the context of React - I made an effort to keep my components modular and am reasonably satisfied with the results, but I think there's room for improvement. Similarly, I'd like to explore testing with React - I didn't have the time this weekend to implement testing.

## Development

I started by using [create-react-app](https://github.com/facebook/create-react-app) to generate a new project. Given my experience with React and the scope of this project, it seemed like an appropriate starting point. If I was working on a production project I would be more deliberate with these choices. Beyond create-react-app, I didn't require any other tools.

The **consumer_key** provided to access the API was saved as an environment variable and therefore hasn't been committed to this repository. If you pull & try to run this project, you'll have to address this. 

```
REACT_APP_500PX_API_KEY = [YOUR_CONSUMER_KEY]
```

Query parameters & data returned by the api were saved as state in App.js. This had the advantage of triggering a new query & render automatically any time those values changed. Photo data returned from the API is appended to previous photo data which allows for infinite scroll pagination. 

PhotoPage.js holds the view-logic for the page of photos. It tracks information about the browser resolution and calculates the best size of photo to display given that information, as well as display information about the modal. All of this is saved in state. Listeners set on window that listen for resizing events update the resolution attributes, which triggers a re-render with new photo sizes in some cases.

I made an effort to separate view components from functional components. PhotoTile.js, ModalPhoto.js, ModalDescription.js, etc don't even use Class syntax with a constructor - they are simple functions that retuns a block of html.

Styling is minimal by design - the app is largely white and dark grey, with blue used only for actions. I used a few icons downloaded from Google's [Material Design](https://material.io/icons) project for buttons. 

## Future Development

If given more time, I'd like to continue development of this project in a few ways:

##### Test Suite
Curious to spend some time learning how to test React code. 

##### Query Cusomization
It would be great if the user had a UI to fine-tune the query. The project was built to anticipate this at the application level so it would be fairly simple to implement.

##### Code Organization
I made an effort to modularize my code but my sense is that there are some more advanced patterns used in React projects that could make everything more maintainable.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thanks again for this fantastic opportunity. I really enjoyed using React for the first time and hope to continue developing that skillset. 

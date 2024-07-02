const laptop = new URL('./assets/resources.svg', import.meta.url)
const screens = new URL('./assets/screens.svg', import.meta.url)

const Content = () => {
  return (
    <>
      <section className="river">
        <img src={laptop} alt="Laptop with a play button" aria-hidden="true" />
        <article>
          <h1>
            <small>React + Contentful</small>
            Property Website using React Contentful 
          </h1>
          <p>
            Clone, edit, and customize this starter to build your own React app.
          </p>
          <div className="buttons">
            <button className="button-large">
              <a href="https://www.contentful.com/contentful-and-javascript-tutorial">
                Read more
              </a>
            </button>

            <button className="button-large button-secondary">
              <a href="https://github.com/contentful/react-starter">GitHub</a>
            </button>
          </div>
        </article>
      </section>
      <section className="river">
        <img src={screens} alt="React + Contentful" aria-hidden="true" />
        <article>
          <h2>Welcome to SRS Enterprises</h2>
        </article>
      </section>
    </>
  )
}

export default Content

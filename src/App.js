import useSWR from 'swr'
import { useState } from 'react'
import { Spinner } from '@contentful/f36-spinner'
import { createClient } from 'contentful'
import Notification from './Notification'
import Content from './Content'
 

/* 

MAKE REST API GET CALL TO Wordpress System to get the notifications data
https://test.venngroup.in/wp-json/wp/v2/notification

*/


  // Process the data from the Contentful REST API into a neater object
  // If you want to avoid this step, consider using the GraphQL API
  const entries = entryItems.items.map((entry) => {
    const { fields } = entry
    return {
      // Return the data 

    }
  })

  return { entries, tags }
}

function App() {
  const [selectedTags, setSelectedTags] = useState([])
  const { data, error } = useSWR('contentful', fetcher)

  if (error) {
    console.log(error)
    return <div>failed to load </div>
  }
  if (!data) return <Spinner size="large" />

  const { tags, entries } = data

  const onTagSelected = (e) => {
    const { name: tag, checked } = e.target
    const index = selectedTags.indexOf(tag)

    if (checked && index === -1) {
      selectedTags.push(tag)
    } else if (index !== -1) {
      // if the tag is already in the array, remove it
      selectedTags.splice(index, 1)
    }
    setSelectedTags(selectedTags.slice())
  }

  const checkboxes = tags.map((tag) => {
    return (
      <label htmlFor={tag} key={tag}>
        <input type="checkbox" onChange={onTagSelected} name={tag} id={tag} />
        {tag}
      </label>
    )
  })

  const properties = entries
    .filter((property) => {
      if (selectedTags.length === 0) return true
      const found = property.tags.some((r) => selectedTags.includes(r))
      return found
    })
    .map(({ name, image, alt, artist }, i) => {
      return (
        <Property
          key={i}
          name={name}
          image={image}
          alt={alt}
          artist={artist}
        ></Property>
      )
    })

  return (
    <main>
      <Content />
      <p className="tags">
        👉<b>Tags</b>:{checkboxes}
      </p>
      <div className="grid">{properties}</div>
    </main>
  )
}

export default App

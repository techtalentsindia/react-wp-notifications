const Property = ({ name, image, alt, developer }) => {
  return (
    <figure className="property">
      <img className="image-thumb" src={image} alt={alt} />
      <h4>{name}</h4>
      <p>
        <i>{developer}</i>
      </p>
    </figure>
  )
}

export default Property

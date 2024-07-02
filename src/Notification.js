const Notification = ({ title, links }) => {
  return (
    <figure className="notification">
      <img className="image-thumb" src={image} alt={alt} />
      <h4>{links}</h4>
      <p>
        <i>{title}</i>
      </p>
    </figure>
  )
}

export default Notification

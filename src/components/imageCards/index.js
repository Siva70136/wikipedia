import './index.css'
const ImageCard=(props)=>{
    const {data}=props
    return(
        <div className="image-card">
            <img src={data.urls.small} alt={data.description}  className="image"/>
            <div className="image-info">
            <p>{data.user.name}</p>
            <p>{data.alt_description}</p>
          </div>
        </div>
    )
}

export default ImageCard
import ReactPlayer from 'react-player'
const Video = () =>{
    return(
        <div className="video-container">
            <ReactPlayer
                className= 'video-box'
                url = {'https://www.youtube.com/watch?v=zL19uMsnpSU'}
                muted = {true}
                controls = {false}
                playing = {true}
            />
        </div>
    )
}

export default Video
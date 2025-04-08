import './App.css';
import { Userdata } from './Axios/crudtask';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from '../src/assets/video.mp4';

function App() {
  return (
    <div className="App position-relative min-vh-100" style={{ overflow: 'auto' }}>
      <video
        autoPlay loop muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1, 
        }}
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <Userdata />
      </div>
    </div>
  );
}

export default App;

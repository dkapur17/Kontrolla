import Router from 'next/router';


const ControlCard = (props) => {

  const { img, name, desc, route } = props;

  return (
    <div className="card bg-dark px-1 control-card m-2" style={{ width: "18rem" }} onClick={() => Router.push(route)}>
      <img src={img} className="card-img-top" alt="trackpad" />
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
        <p className="card-text text-center lead">{desc}</p>
      </div>
    </div>
  );

};

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center text-white bg-dark  ">
      <div className="d-flex flex-row justify-content-center my-5">
        <h1 className="display-1">Kontrolla</h1>
      </div>
      <div className='d-flex flex-wrap justify-content-center'>
        <ControlCard img="http://www.clker.com/cliparts/2/i/A/F/L/B/touchpad-laptop-icon-hi.png" name="Mouse Control" desc="Use your screen like a trackpad and control your system." route="/mouseControl" />
        <ControlCard img="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/High-contrast-input-keyboard.svg/1024px-High-contrast-input-keyboard.svg.png" name="Keyboard Control" desc="Use your keyboard to type on your system." route="/keyboardControl" />
      </div>
    </div>
  );
};

export default Home;
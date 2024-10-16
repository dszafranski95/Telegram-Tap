import { useEffect, useState } from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import { bear, coin, rocket, trophy, highVoltage, notcoin } from './images';

const App = () => {
  const [points, setPoints] = useState(29857775);
  const [energy, setEnergy] = useState(5149);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 12;
  const energyToReduce = 12;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
        {/* Play Games Button */}
        <div className="fixed top-0 left-0 w-full px-4 pt-3 z-10 flex flex-col items-center">
        <button
  className="bg-gradient-to-r from-[#ffd700] to-[#ffcc00] text-[#ff4500] text-2xl font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-filter backdrop-blur-md bg-opacity-30 border border-white/20"
  onClick={() => document.getElementById('modal_play_games').showModal()}
>
  PLAY GAMES
</button>

        </div>
          <div className="text-base mt-14 flex items-center">
            <img src={coin} width={80} height={80} alt="Coin Icon" />
            </div>
          <div className="mt-6 text-3d flex items-center">
  <span className="ml-2">{points.toLocaleString()}</span> <span className="ml-1"></span>
</div>


        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/2 flex items-center justify-start max-w-48">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ 6500</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-96 text-sm">
              <div className="menu-container w-full py-4 rounded-2xl flex justify-around">
                <button className="flex flex-col items-center gap-1" onClick={() => document.getElementById('modal_frens').showModal()}>
                  <img src={bear} width={24} height={24} alt="Bear Icon" />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#33bbff]"></div>
                <button className="flex flex-col items-center gap-1" onClick={() => document.getElementById('modal_earn').showModal()}>
                  <img src={bear} width={24} height={24} alt="Cupcake Icon" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#33bbff]"></div>
                <button className="flex flex-col items-center gap-1" onClick={() => document.getElementById('modal_boosts').showModal()}>
                  <img src={rocket} width={24} height={24} alt="Rocket Icon" />
                  <span>Boosts</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#33bbff]"></div>
                <button className="flex flex-col items-center gap-1" onClick={() => document.getElementById('modal_rewards').showModal()}>
                  <img src={bear} width={24} height={24} alt="Star Icon" />
                  <span>Rewards</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#33bbff]"></div>
                <button className="flex flex-col items-center gap-1" onClick={() => document.getElementById('modal_defense').showModal()}>
                  <img src={bear} width={24} height={24} alt="Shield Icon" />
                  <span>Defense</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-glass rounded-full mt-4 p-1 relative">
            <div
              className="bg-gradient-to-r from-[#00f0ff] to-[#00ff7f] h-4 rounded-full shadow-[0px_0px_15px_#00f0ff,0px_0px_20px_#00ff7f]"
              style={{ width: `${(energy / 6500) * 100}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
              {Math.round((energy / 6500) * 100)}%
            </div>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-14" onClick={handleClick}>
            <img src={notcoin} width={400} height={400} alt="notcoin" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                12
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <dialog id="modal_frens" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Frens Modal</h3>
          <p className="py-4">Information about Frens.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('modal_frens').close()}>Close</button>
          </div>
        </div>
      </dialog>

      <dialog id="modal_earn" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Earn Modal</h3>
          <p className="py-4">Details on how to earn rewards.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('modal_earn').close()}>Close</button>
          </div>
        </div>
      </dialog>

      <dialog id="modal_boosts" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Boosts Modal</h3>
          <p className="py-4">Explore the available boosts.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('modal_boosts').close()}>Close</button>
          </div>
        </div>
      </dialog>

      <dialog id="modal_rewards" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Rewards Modal</h3>
          <p className="py-4">Details about the rewards system.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('modal_rewards').close()}>Close</button>
          </div>
        </div>
      </dialog>

      <dialog id="modal_defense" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Defense Modal</h3>
          <p className="py-4">Information about defense mechanisms.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('modal_defense').close()}>Close</button>
          </div>
        </div>
      </dialog>

      
      <dialog id="modal_play_games" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Games Modal</h3>
          <p className="py-4">Information about defense mechanisms.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById('modal_play_games').close()}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default App;

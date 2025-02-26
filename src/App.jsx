import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const openToast = (msg, flag) => {
    return toast(msg, {
      type: flag,
      autoClose: 1500,
    });
  };
  const imgname = [
    {
      src: "A1.jpg",
    },
    {
      src: "A2.jpg",
    },
    {
      src: "A3.jpg",
    },
    {
      src: "A4.jpg",
    },
    {
      src: "A5.jpg",
    },
    {
      src: "A6.jpg",
    },
    {
      src: "A7.jpg",
    },
    {
      src: "A8.jpg",
    },
  ];

  const [firstRender, setfirstRender] = useState(true);
  const [cards, setcards] = useState([]);
  const [turns, setturns] = useState(16);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setdisabled] = useState(false);
  const [overlay, setoverlay] = useState(true);

  const shuffle = () => {
    let shuffledCards = [...imgname, ...imgname]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));

    setchoiceOne(null);
    setchoiceTwo(null);
    setcards(shuffledCards);
    setturns(16);
    setdisabled(false);
  };

  const choicehandler = (card) => {
    if (turns == 0) {
      openToast("Good game, no turns left", "error");
      setdisabled(true);
    } else {
      choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
    }
  };

  useEffect(() => {
    shuffle();
  }, []);

  useEffect(() => {
    if (firstRender) {
      setfirstRender(false);
      return;
    }
    const allmatched = cards.every((card) => card.matched === true);
    if (allmatched) {
      openToast("Congratulations, you have flipped all the cards", "true");
    }
  }, [choiceTwo]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisabled(true);
      if (choiceOne?.src === choiceTwo?.src) {
        setcards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCard();
      } else {
        setTimeout(() => {
          resetCard();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetCard = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setturns((prevTurn) => prevTurn - 1);
    setdisabled(false);
  };
  return (
    <div className="h-full w-full ">
      {/* Overlay for game instructions */}
      <div
        className={`fixed inset-0 bg-black/90 z-10 ${
          overlay ? "flex" : "hidden"
        } items-center justify-center`}
      >
        <div className="bg-white p-4 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-lg text-center text-md sm:text-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Instructions</h2>
          <p className="text-gray-600 mt-2">
            Read these steps carefully to play the game.
          </p>
          <ul className="mt-4 text-left  text-gray-700 space-y-2">
            <li>✅ Step 1: You will get 15 turns to win the game.</li>
            <li>✅ Step 2: Click on the back of the card to flip it.</li>
            <li>✅ Step 3: You have to find matching card.</li>
            <li>✅ Step 4: Click on new game to play again.</li>
          </ul>
          <button
            onClick={() => {
              setoverlay(false);
            }}
            className="mt-3 px-4 py-1 bg-black border-3 border-blue-600 text-white rounded-lg hover:bg-gray-900 cursor-pointer"
          >
            Got it!
          </button>
        </div>
      </div>

      {/* top heading starts */}
      <div className="text-center space-y-3">
        <h1 className="text-yellow-500 text-4xl text-center">Magic match</h1>
        <button
          onClick={() => {
            openToast("Cards shuffled successfully", "success");
            shuffle();
            setoverlay(true);
          }}
          className="px-2 py-1 bg-black/95 rounded-xl text-yellow-500 border-4 border-yellow-500 hover:bg-white hover:text-black text-md font-medium cursor-pointer duration-100 hover:shadow-yellow-500 hover:shadow-lg"
        >
          NEW GAME
        </button>
        <span className="text-yellow-500 text-md ml-3 font-medium ">
          {" "}
          (Turns left: {turns})
        </span>
      </div>
      {/* top heading ends */}

      {/* card section starts */}
      <div className="w-full  flex justify-center items-center">
        <div className="grid grid-cols-4 gap-2 sm:gap-1">
          {cards?.map((card) => {
            return (
              <Card
                card={card}
                key={card.id}
                choicehandler={choicehandler}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            );
          })}
        </div>
      </div>
      {/* card section ends */}

      {/* react toastify */}
      <div className="absolute top-0 right-0 text-xl font-medium">
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;

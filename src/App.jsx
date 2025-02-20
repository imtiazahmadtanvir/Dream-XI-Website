// import './App.css';
// import { useState } from 'react';
// import Available from './components/Available';
// import Banner from './components/Banner';
// import Navbar from './components/Navbar';
// import Players from './components/Players';
// import Footer from './components/Footer';
// import Subscribe from './components/Subscribe';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Selected from './components/Selected';

// function App() {
//   const [credit, setCredit] = useState(0);
//   const [activeButton, setActiveButton] = useState(1);
//   const [activeTab, setActiveTab] = useState(1);
//   const [selected, setSelected] = useState(0);
//   const [selectedPlayers, setSelectedPlayers] = useState([]);

//   const handleCountPlayers = (player_id, profile_image, name, batting_style, price) => {
//     const isPlayerSelected = selectedPlayers.some(player => player.player_id === player_id);

//     if (price > credit) {
//       toast.error('Not enough money to buy this player. Claim some credit.', {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "light",
//       });
//     } else if (isPlayerSelected) {
//       toast.error('Player already selected.', {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "light",
//       });
//     } else if (selected >= 6) {
//       toast.warn('You can only select up to 6 players.', {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "light",
//       });
//     } else {
//       setSelected((prev) => prev + 1);
//       setCredit(credit - price);
//       setSelectedPlayers((prev) => [
//         ...prev,
//         { player_id, profile_image, name, batting_style, price },
//       ]);
//       toast.success(`Congrats! ${name} is now in your squad.`, {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "light",
//       });
//     }
//   };

//   const removePlayer = (player_id) => {
//     const removedPlayer = selectedPlayers.find(player => player.player_id === player_id);
//     if (removedPlayer) {
//       setSelectedPlayers((prev) =>
//         prev.filter((player) => player.player_id !== player_id)
//       );
//       setSelected((prev) => prev - 1);
//       setCredit((prev) => prev + removedPlayer.price);
//       toast.warn(`${removedPlayer.name} has been removed.`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "light",
//       });
//     }
//   };

//   const HandleCredit = (totalCredit) => {
//     setCredit((prev) => prev + totalCredit);
//     toast.success(`Credit added to your account.`, {
//       position: "top-center",
//       autoClose: 3000,
//       theme: "light",
//     });
//   };

//   const handleActiveTab = (tabValue) => {
//     setActiveTab(tabValue);
//     setActiveButton(tabValue);
//   };

//   return (
//     <div className='w-full mt-0 bg-white min-h-screen'>
//       <header>
//         <Navbar credit={credit}></Navbar>
//         <Banner HandleCredit={HandleCredit}></Banner>
//       </header>

//       <main>
//         <Available
//           handleActiveTab={handleActiveTab}
//           selected={selected}
//           activeButton={activeButton}
//           handleActiveButton={setActiveButton}
//         />
//         {activeTab === 1 && <Players handleSelectedPlayers={handleCountPlayers} />}
//         {activeTab === 2 && (
         
//          <Selected
//             selectedPlayers={selectedPlayers}
//             handleActiveTab={handleActiveTab}
//             removePlayer={removePlayer}
//           />
//         )}
//       </main>
//       <footer className='mt-10'>
//         <Subscribe />
//         <Footer />
//       </footer>

//       <ToastContainer />
//     </div>
//   );
// }

// export default App;

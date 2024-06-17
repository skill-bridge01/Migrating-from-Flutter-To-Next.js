// export function Loading(){
//     return (
//         <div className="bg-white h-screen w-screen">
//             <div className="flex flex-col justify-center items-center px-12 gap-y-12 pt-40">
//                 <h2 className="mt-28 text-3xl text-center font-bold text-gray-800">
//                     Loading..........
//                 </h2>
//             </div>
//         </div>
//     )
// }

// const Loader = () => {
//     return (
//       <div className="loader" />
//     );
//   };
  
//   export default Loader;

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader} />
  );
};

export default Loader;
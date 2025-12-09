export default function Sidebar({selected,setSelected}:{selected:string,setSelected:(s:string)=>void}){
 const items=[{id:'dashboard',label:'Dashboard'},{id:'transactions',label:'Transactions'}]
 return <aside className='w-64 p-6 bg-white dark:bg-gray-800 h-screen'>
  <h2 className='text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100'>SolSoochy | ಸೊಲ್ಸೂಚಿ</h2>
  {items.map(i=><button key={i.id} onClick={()=>setSelected(i.id)}
   className={`block w-full text-left px-4 py-2 rounded mb-2 ${selected===i.id?'bg-indigo-600 text-white':'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
    {i.label}
  </button>)}
 </aside>
}

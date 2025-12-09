export default function BalanceCard({data}:{data:any}){
 return <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow'>
  <h3 className='text-lg font-semibold mb-2'>Balance</h3>
  <div className='text-3xl'>{data.sol.toFixed(4)} SOL</div>
 </div>
}

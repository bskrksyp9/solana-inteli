const BACKEND = import.meta.env.VITE_BACKEND_URL;
export async function getWalletBalance(a:string){ return (await fetch(`${BACKEND}/api/balance/${a}`)).json(); }
export async function getTransactions(a:string){ return (await fetch(`${BACKEND}/api/transactions/${a}`)).json(); }

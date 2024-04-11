import { ImSpinner9 } from "react-icons/im";

export const PaypalPaymentDetailSkeleton = () => {
  const ordenDetail = {
    link: '',
    Plan_elegido: '',
    Precio_total: '',
  }
  const orderUser = {
    Nombre: '',
    Email: '',
  }

  const PaypalResponse = {
    Estado: '',
    Nombre: '',
    Email: '',
  }
  return (
    <div className='flex flex-col md:flex-row p-2'>

      <div className='bg-neutral-800 p-4 rounded-lg z-20 md:w-3/5'>
        <h2 className='font-bold flex justify-center'>Resumen</h2>
        <div className='flex flex-row gap-2 '>

          <div className='flex flex-col text-sm p-2 w-3/5'>
            <h3 className='font-semibold bg-white text-emerald-600'>
              Orden
            </h3>
            <span className='animate-pulse bg-slate-600 h-4 w-full rounded-lg my-2'></span>

            <h3 className='font-semibold bg-white text-emerald-600'>Creado por</h3>
            {
              Object.entries(orderUser).map(([key, value]) => (
                <div key={key} className='p-1 flex justify-between gap-2 items-center'>
                  <span>{key}:</span>
                  <span className='animate-pulse h-4 bg-slate-500 w-2/5 rounded-lg text-sm font-extralight'></span>
                </div>
              ))
            }
            <h4 className='font-semibold bg-white text-emerald-600'>Detalles de la orden</h4>
            {
              Object.entries(ordenDetail).map(([key, value]) => (
                <div key={key} className='p-1 flex justify-between gap-2 items-center'>
                  <span>{key}:</span>
                  <span className='animate-pulse h-4 bg-slate-500 w-2/5 rounded-lg text-sm font-extralight'></span>
                </div>
              ))
            }

          </div>

          <div className='flex flex-col p-2 w-2/5'>
            <h4 className='font-semibold bg-white text-emerald-600'>Repuesta de paypal </h4>
            {
              Object.entries(PaypalResponse).map(([key, value]) => (
                <div key={key} className='flex justify-between gap-2 items-center p-1'>
                  <span>{key}:</span>
                  <span className='animate-pulse h-4 bg-slate-500 w-2/5 rounded-lg text-sm font-extralight'></span>
                </div>
              ))
            }

          </div>
        </div>
      </div>

      <div className=' px-5 md:2/5'>
        <h2 className='font-bold flex justify-center '>Repuesta de Paypal</h2>

        <div className="w-full mt-4">
       
          <div className='animate-pulse h-4 bg-slate-500 w-2/5 rounded-lg'></div>
          <div className='animate-pulse h-4 bg-slate-500 w-1/5 rounded-lg text-sm font-extralight mt-1' />
          <div className='animate-pulse h-4 bg-slate-500 w-1/5 rounded-lg text-sm font-extralight mt-1' />
          <div className='animate-pulse h-4 bg-slate-500 w-4/5 rounded-lg text-sm font-extralight mt-1' />
          <div className='animate-pulse h-4 bg-slate-500 w-2/5 rounded-lg text-sm font-extralight mt-1' />
          <div className='animate-pulse h-4 bg-slate-500 w-1/5 rounded-lg text-sm font-extralight mt-1' />
          <div className='animate-pulse h-4 bg-slate-500 w-1/5 rounded-lg text-sm font-extralight mt-1' />
          <div className='animate-pulse h-4 bg-slate-500 w-3/5 rounded-lg text-sm font-extralight mt-1' />

        </div>


      </div>

    </div>
  )
}



export const ModalLinkUserSkeleton = () => {
  const object = {
    Url: '',
    Hash: '',
    Clicks: '',
    Limite: ''

  };
  return (
    <div>

      <ul className=" lg:min-w-96 ">
        {
          Object.entries(object).map(([prop, value]) => (
            <li key={prop} className="p-2 flex justify-between w-full odd:bg-neutral-600 even:bg-neutral-500">
              <span>{prop}:</span>
              <span className="bg-slate-600 animate-pulse h-4 w-10 rounded-lg" />
            </li>
          ))
        }

      </ul>
      <div className="flex mx-2">
        <div className="h-10 bg-slate-600 animate-pulse m-2 w-1/2" />
        <div className="h-10 bg-slate-600 animate-pulse m-2 w-1/2" />

      </div>

      <div >
        <p className="flex justify-center">Precios</p>
        <div className="flex items-center">
          <div className="h-44 bg-slate-600 animate-pulse w-1/3" />
          <div className="h-52 bg-slate-600 animate-pulse w-1/3" />
          <div className="h-44 bg-slate-600 animate-pulse w-1/3" />
        </div>
      </div>
    </div>
  )
}

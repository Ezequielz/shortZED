

export const UserAdd = () => {
  return (
    <div className="p-2 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl my-2">

      <h3>Crear un usuario manualmente</h3>
      <div className=" flex items-center">
        <div className="grid md:grid-cols-2 gap-2 items-center">

          <input type="text" placeholder="Nombre de usuario" className="px-3 py-1.5 border bg-gray-200 rounded  text-slate-800" />


          <input type="text" placeholder="Email" className="px-3 py-1.5 border bg-gray-200 rounded  text-slate-800" />


          <input type="text" placeholder="Password" className="px-3 py-1.5 border bg-gray-200 rounded  text-slate-800" />

          <input type="file" placeholder="" className="px-3 py-1.5 border bg-gray-200 rounded  text-slate-800" />



        </div>
        <button className="px-4 py-2 rounded-xl  mx-2 bg-blue-800 hover:bg-blue-600 h-fit ">
          Crear
        </button>

      </div>




    </div>
  )
}

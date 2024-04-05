
export const PaypalDemoCredentials = () => {
  return (
    <div>
      <p>
        <strong className="text-red-500">NO UTILICE SU CUENTA PAYPAL OFICIAL</strong>
      </p>
      <div className="bg-red-500/30 p-2 text-sm">
        Esto es solo una demostración de cobro a travez de paypal, si ingresa con su cuenta principal, podria tener cargos y/o cobros indeceados
      </div>

      <div >
        <span className="border-b-2 border-amber-500">Utilice estas credenciales para simular un pago:</span>
        <div className=" p-2 rounded-lg my-2">
          <div className="flex flex-col">
            <strong className="bg-emerald-600/30 p-2">
              Cuenta con fondos:
            </strong>
            <span>
              Email: cuentatest1@gmail.com
            </span>
            <span>
              Password: 12345678
            </span>
          </div>
          <div className="flex flex-col">
            <strong className="bg-red-600/30 p-2">
              Cuenta SIN fondos:
            </strong>
            <span>
              Email: cuentatest2@gmail.com
            </span>
            <span>
              Password: 12345678
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

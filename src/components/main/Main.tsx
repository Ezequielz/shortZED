import { ShortForm } from "../forms/ShortForm"

export const Main = () => {
    return (
        <div className="p-4 relative  md:flex items-center mt-5 lg:pt-20">

            <div className="md:w-1/2 -mt-5 md:flex md:justify-center">
                <p className="text-balance tracking-wide lg:text-2xl mb-2 lg:p-5">Acorta y personaliza tus URLs para una mejor estética y accesibilidad. Impulsa la interacción y optimiza tu estrategia digital con enlaces memorables.</p>

            </div>
            <div className="md:w-1/2  md:flex md:justify-center lg:block">
                <ShortForm />
            </div>
        </div>
    )
}

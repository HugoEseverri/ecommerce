import React from 'react'
import tienda from "@/assets/img/tienda.jpg"
import Image from 'next/image'


function page() {
    return (
        <main className='bg-gray-100'>

            <div>
                <h1 className='text-2xl text-black p-5'>Contacto</h1>
                <hr className='bg-black h-0.5 m-5' />
            </div>
            <div className='flex flex-row-reverse items-center justify-around'>
                <div>
                    <Image
                        src={tienda}
                        alt="Tienda"
                        width={800}
                        height={350}
                        className="object-cover rounded-lg" 
                    />
                    <p className='text-xl leading-relaxed mb-6 text-black p-10 text-center'>¡Gracias por elegirnos!</p>
                </div>
                
                <div className='text-black text-xl p-10 w-[900px]'>
                    <h2 className='text-black text-3xl font-semibold mb-6'>Nosotros</h2>
                    <p className='text-lg leading-relaxed mb-6'>
                        La Historia de Mundo Tech.
                        <br />
                        Lo que comenzó como un sueño de un joven emprendedor en una pequeña tienda de barrio, hoy es una cadena de más de cinco sucursales que ofrecen productos Apple de la más alta calidad. En sus primeros días, la tienda era solo un rincón modesto, con unas pocas mesas llenas de accesorios y equipos Apple, pero con una visión clara: brindar a los fanáticos de la marca una experiencia única, accesible y personalizada.
                    </p>
                    <p className='text-lg leading-relaxed mb-6'>
                        Con el tiempo, la tienda se ganó la confianza de la comunidad local, gracias a su servicio al cliente excepcional y su conocimiento profundo sobre los productos Apple. Los clientes no solo acudían por las últimas novedades, sino también por el asesoramiento experto que brindaban los empleados, quienes se convirtieron en verdaderos conocedores del ecosistema Apple.
                    </p>
                    <p className='text-lg leading-relaxed mb-6'>
                        La demanda creció rápidamente, y en menos de tres años, el negocio se expandió con la apertura de su segunda sucursal, esta vez en un barrio más grande, con una infraestructura que permitía ofrecer un ambiente más cómodo y moderno para los clientes. A medida que la tienda ganaba renombre, más personas se sumaban a su base de clientes leales, lo que permitió abrir una tercera y cuarta sucursal, llevando los productos Apple más cerca de quienes los deseaban.
                    </p>
                    <p className='text-lg leading-relaxed mb-6'>
                        Hoy en día, la tienda cuenta con más de cinco sucursales en diversas ubicaciones, cada una de ellas equipada con el último hardware y software de Apple, así como con un equipo capacitado para ofrecer soporte técnico y servicio postventa. La expansión no solo ha permitido llegar a más personas, sino que también ha consolidado a la tienda como un referente en el mundo Apple, reconocido por su atención personalizada, su conocimiento profundo de los productos y su constante esfuerzo por brindar lo mejor a sus clientes.
                    </p>
                    <p className='text-lg leading-relaxed'>
                        Lo que comenzó como un pequeño emprendimiento impulsado por la pasión por la tecnología, hoy se ha convertido en un ejemplo de éxito empresarial, con la visión de seguir creciendo y ofreciendo la mejor experiencia Apple a todos sus usuarios.
                    </p>
                </div>
            </div>


        </main>
    )
}

export default page
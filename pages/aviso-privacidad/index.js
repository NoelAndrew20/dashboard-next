import StaticMeta from '@/components/atoms/StaticMeta';
import Navigation from '@/components/molecules/Navigation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const { useDarkMode } = require('@/context/DarkModeContext');

const AvisoPrivacidad = ({ title, description, image }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [fullText, setfullText] = useState(false);

  const content = (
    <>
      <div
        className={`transition-opacity ${
          fullText ? 'opacity-100' : 'opacity-50'
        }`}
      >
        <div className="mt-5">
          <p className="font-bold mt-3">
            Categorías de datos personales sujetos a tratamiento.
          </p>
          <p className="mt-3">
            Para cumplir con las finalidades del tratamiento señaladas en el
            presente aviso de privacidad (el “Aviso”), es necesario que
            Termomagnéticos y Control de Radiaciones, S.A de C.V. traten los
            siguientes datos personales: datos de identificación y
            autenticación, datos de contacto, datos fiscales, datos
            demográficos, datos de ubicación, datos laborales, así como
            información técnica, características (“Local storage”).
          </p>
          <p className="font-bold mt-3">Finalidades primarias del tratamiento.</p>
          <p className="mt-3">
            Termomagnéticos y Control de Radiaciones, S.A de C.V. tratará los
            datos personales descritos en el presente Aviso para llevar a cabo
            alguna o todas las actividades necesarias para el desarrollo y
            cumplimiento de las obligaciones que se originen y deriven de la
            relación jurídica con usted, que incluyen las siguientes
            finalidades:
          </p>
          <ul>
            <li>
              • Selección de proveedores para contacto, compra y venta de
              insumos.
            </li>
            <li>
              • Permitirle el acceso y permisos correspondientes a nuestra
              plataforma web.
            </li>
            <li>
              • Para integrar y/o actualización de expedientes, bases de datos y
              sistemas necesarios para llevar a cabo las operaciones en la
              plataforma web correspondientes.
            </li>
            <li>
              • Mantener la seguridad de los servicios de comunicaciones
              electrónicas, detectar fallos o errores técnicos en la transmisión
              de las comunicaciones electrónicas, así como cualquier tratamiento
              que sea necesario para la correcta prestación de nuestro servicio
              o cualquier otra normativa sectorial que resulte de aplicación.
            </li>
          </ul>
          <p className="mt-3">
            La negativa para el uso de sus datos personales para estas
            finalidades podrá ser un motivo para que le neguemos los servicios y
            productos que solicita o contrata con nosotros.
          </p>
          <p className="font-bold mt-3">
            Medios y procedimiento para ejercer los derechos ARCO.
          </p>
          <p className="mt-3">
            Usted tiene derecho a conocer qué datos personales tenemos de usted,
            para qué los utilizamos y las condiciones del uso que les damos
            (Acceso). Asimismo, es su derecho solicitar la corrección de su
            información personal en caso de que esté desactualizada, sea
            inexacta o incompleta (Rectificación); que la eliminemos de nuestros
            registros o bases de datos cuando considere que la misma no está
            siendo utilizada conforme a los principios, deberes y obligaciones
            previstas en la normativa (Cancelación); así como oponerse al uso de
            sus datos personales para fines específicos (Oposición). Estos
            derechos se conocen como derechos ARCO.
          </p>
          <p className="mt-3">
            Para el ejercicio de cualquiera de los derechos ARCO, usted deberá
            presentar un correo respectivamente por medio del correo
            electrónico: datprivconstanza@gmail.com.
          </p>
          <p className="mt-3">
            Los datos de contacto de la persona o departamento que dará trámite
            a las solicitudes para el ejercicio de los derechos ARCO, así como
            atender cualquier duda que pudiera tener respecto al tratamiento de
            su información son los siguientes
          </p>
          <p className="mt-3">
            • Departamento de Privacidad, con domicilio en 25 poniente número
            4307 - A, Colonia Belisario Domínguez, Puebla, C.P. 72180, Puebla,
            correo electrónico datprivconstanza@gmail.com.
          </p>
          <p className="mt-3">
            Usted puede revocar el consentimiento que, en su caso, nos haya
            otorgado para el tratamiento de sus datos personales. Sin embargo,
            es importante que tenga en cuenta que no en todos los casos podremos
            atender su solicitud o concluir el uso de forma inmediata, ya que es
            posible que por alguna obligación legal requiramos seguir tratando
            sus datos personales.
          </p>
          <p className="mt-3">
            Asimismo, usted deberá considerar que, para ciertos fines,{' '}
            <span className="font-bold">
              la revocación de su consentimiento implicará que no le podamos
              seguir prestando el servicio que nos solicitó, o la conclusión de
              su relación con nosotros.
            </span>
          </p>
          <p className="font-bold mt-3">Plataforma web.</p>
          <p className="mt-3">
            Termomagnéticos y Control de Radiaciones, S.Ade C.V. utilizan varias
            tecnologías para mejorar la eficiencia de nuestros sitios web y
            herramientas tecnológicas, incluyendo su experiencia cuando navega
            por dichos sitios o usa nuestra red. Entre estas tecnologías{' '}
            <span className="font-bold">no utiliza</span> el uso de cookies, si
            no se desarrolla un elemento denominado{' '}
            <span className="font-bold">“Local Storage”. </span> Este elemento
            permite guardar sus datos personales que son correo electrónico y
            nombre del usuario para brindarle un acceso a la plataforma. Esto
            nos permiten cumplir con las finalidades informadas en el presente
            Aviso.
          </p>
          <p className="font-bold mt-3">Modificaciones al aviso de privacidad</p>
          <p className="mt-3">
            El presente aviso de privacidad puede sufrir modificaciones, cambios
            o actualizaciones derivadas de nuevos requerimientos legales; de
            necesidades propias de Termomagnéticos y Control de Radiaciones, S.A
            de C.V., por los productos o servicios que ofrecemos; de nuestras
            prácticas de privacidad o por otras causas.
          </p>
          <p className="mt-3">
            Cualquier modificación al presente aviso de privacidad le será
            notificada a través de cualquiera de los siguientes medios: un
            mensaje enviado a su correo electrónico o de cualquier medio
            electrónico que utilice para celebrar operaciones con
            Termomagnéticos y Control de Radiaciones, S.A de C.V.
          </p>
          <p className="mt-3">Fecha de actualización: enero 2024.</p>
          <p className="font-bold mt-3">INAI</p>
          <p className="mt-3">
            Si usted considera que su derecho a la protección de sus datos
            personales ha sido lesionado por alguna conducta u omisión de
            nuestra parte, o presume alguna violación a las disposiciones
            previstas en la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares, su Reglamento y demás ordenamientos
            aplicables, podrá interponer su inconformidad o denuncia ante el
            Instituto Nacional de Transparencia, Acceso a la Información y
            Protección de Datos Personales (INAI). Para más información, le
            sugerimos visitar su página oficial de Internet www.inai.org.mx.
          </p>
          <p className="mt-3">
            -Termina Aviso de Privacidad de Termomagnéticos y Control de
            Radiaciones, S.A de C.V.-
          </p>
        </div>
      </div>
    </>
  );
  return (
    <div className={`${isDarkMode ? 'darkMode' : 'lightMode'} full-viewport`}>
      <StaticMeta title={title} description={description} image={image} />
      <Navigation />
      <div className="wrapper">
        <div
          className="back-link mt-2 text-blue-500 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <span className="back-arrow">&#8592;</span> Volver
        </div>
        <div className="w-[630px] mx-auto">
          <div className="flex justify-center">
            <h1 className="border-b border-primary border-red-500 inline-flex text-3xl mb-18 pt-10 font-bold text-center">
              Aviso de privacidad
            </h1>
          </div>
          <div className="mt-5">
            <p className="mt-3">
              Le informamos que Termomagnéticos y Control de Radiaciones, S.A de
              C.V. es responsable de recabar y dar tratamiento o utilizar los
              datos personales que Usted les proporcione, con domicilio para oír
              y recibir cualquier tipo de notificaciones el ubicado en 25
              poniente número 4307 - A, Colonia Belisario Domínguez, Puebla,
              C.P. 72180, Puebla.
            </p>

            {!fullText && (
              <React.Fragment>
                <p className="opacity-40">
                  <span className="font-bold">
                    Categorías de datos personales sujetos a tratamiento.
                  </span>
                </p>
                <p className="opacity-40">
                  Para cumplir con las finalidades del tratamiento señaladas en
                  el presente aviso de privacidad (el “Aviso”), es necesario que
                  Termomagnéticos y Control de Radiaciones, S.A de C.V. traten
                  los siguientes datos personales:
                </p>
                <button
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setfullText(true)}
                >
                  Continuar leyendo
                </button>
              </React.Fragment>
            )}
            {fullText && content}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvisoPrivacidad;

export const getServerSideProps = async () => {
  const title = 'Constanza';
  const description = 'Dashboard de Alertas';
  const image = 'images/icon/logo-400.png';
  return {
    props: {
      title,
      description,
      image,
    },
  };
};

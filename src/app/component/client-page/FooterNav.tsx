import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

export default function FooterNav() {
  return (
    <nav className="bg-sky-950 text-white py-12 px-20">
      <div className="flex gap-28">
        <div>
          <div className="flex flex-col w-40">
            <h1 className="text-xl font-bold mb-2">Institucional</h1>
            <a>Anuncie aqui</a>
            <a className="my-2">Quem somos</a>
            <a className="mb-4">Show de Prêmios</a>

            <h1 className="text-xl font-bold my-2">Políticas</h1>
            <a>Termos de serviço</a>
            <a className="my-2">Política de privacidade</a>
          </div>
        </div>
        <div>
          <div className="flex flex-col w-40">
            <h1 className="text-xl font-bold mb-2">Ajuda</h1>
            <a>Trocas e devolução</a>
            <a className="my-2">Entrega</a>
            <a>Prazos</a>
            <a className="my-2">Pagamentos</a>
            <a>Estorno/Cancelamentos</a>
          </div>
        </div>
        <div className="flex flex-col w-40">
          <h1 className="text-xl font-bold mb-2">Atendimento</h1>
          <button className="bg-green-500 text-white py-4 px-28 mt-2 rounded-xl text-center flex items-center justify-center">
            Whatsapp
          </button>
          <button className="bg-sky-900 text-white py-4 px-28 mt-2 rounded-xl text-center flex items-center justify-center whitespace-nowrap">
            Central de atendimento
          </button>
          <p className="whitespace-nowrap mt-2">
            Segunda à sexta das 8:00h às 17:00h
          </p>
        </div>
        <div className="ml-6">
          <div className="mb-2 flex flex-col">
            <h1 className="text-xl font-bold">Acompanhe nossas redes sociais</h1>
            <div className="flex gap-4 my-2">
              <FaInstagramSquare  className="text-5xl"/>
              <FaFacebookSquare className="text-5xl"/>
            </div>
          </div>
          <div className="my-2">
            <h1 className="text-xl font-bold my-2">GeoMarket</h1>
            <p className="text-sm mt-6">
              CNPJ: 00.000.000/0001-00 Avenida Mercantil, 000, SALA 01, Bairro,
              Cidade/estado - CEP 000.000.000-00
            </p>
          </div>
        </div>
      </div>
      <div
        className="mt-2 text-center w-full"
        id="creditos"
      >
        <p>GeoMarket | 2024 Todos os direitos reservados</p>
      </div>
    </nav>
  );
}

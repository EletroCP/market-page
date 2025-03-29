"use client"

import { SetStateAction, useEffect, useState } from "react"
import axios from "axios";

interface Endereco {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

interface infosForm {
  service: string;
  fieldDescription: string;
  fieldType: string;
  landSize: string;
  data: string;
  adress: { zipCode: string, state: string, city: string, road: string};
  contact: string;
};


export default function SearchForService() {
  const [thisOption, setThisOption] = useState(0);
  const [selectError, setSelectError] = useState(true);
  const [selectStateError, setSelectStateError] = useState(true);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [selectedContact, setSelectedContact] = useState("whatsapp");
  const [hasZipCode, setHasZipCode] = useState(false);
  const [brazilStates, setBrazilStates] = useState<{ name: string; id: number }[]>([]);
  const [stateCity, setStateCity] = useState<{ name: string; id: number }[]>([]);
  const [selectedState, setSelectedState] = useState("Selecione seu estado");
  const [selectedCity, setSelectedCity] = useState("Selecione sua cidade");
  const [inputRoad, setInputRoad] =  useState("Informe a rua/avenida e número");
  const [enableSearch, setEnableSearch] = useState(false);
  const [constactValue, setContatctValue] = useState("");
  const [infosForm, setInfosForm] =  useState<infosForm>({
    service: "",
    fieldDescription: "",
    fieldType: "",
    landSize: "",
    data: "Urgente (o mais rápido possível)",
    adress: { zipCode: "", state: "", city: "", road: ""},
    contact:""
  });
  const [finishForm, setFinishForm] = useState(false);

  const totalSteps = 7;
  const services: string[] = ["Aprovação de obra", "Definuções de Divisas", "Demandas Judiciais", "Desmembramento/Desdobro/Usucapião", "Imagem Georreferenciada da área", "Obtenção de MDT (Modelo Digital de Terreno)", "Projeto de Engenharia/Arquitetura", "Regularização (Cartório, Prefeitura, Incra e/ou outros orgãos)", "Outro"];
  const fieldDescriptiom: string[] = ["Rural", "Urbano"];
  const fielType: string[] = ["Acidentado", "Alagado", "Com vegetação", "Mata densa", "Plano", "Outros"];
  const dateServide: string[] = ["Urgente (o mais rápido possível)", "Nos próximos 7 dias", "Nos próximos 15 dias", "Nos próximos 30 dias", "Nos próximos 6 meses", "Não tenho data definida"]
  const typeService: string[] = ["Selecione o serviço", "Descrição do Terreno", "Tipo do Terreno", "Metragem do terreno (m²)", "Data prevista para realização", "Localização do serviço", "Como devemos te contactar?"];
  const checkEmail = /[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState !== "Selecione seu estado") {
        const state = brazilStates.find(({ name }) => name === selectedState);
        if (state && state.id) {
          const cities = await getCitiesByState(state.id);
          if (Array.isArray(cities)) {
            const stateNames = cities.map((city) => ({ name: city.name, id: city.geonameId }));
            setStateCity([...stateNames]);
          }
        }
      }
    };
  
    fetchCities()
  }, [brazilStates, selectedState])

  useEffect(() => {
    const stateIsTrue = selectedState !== "Selecione seu estado";
    const cityIsTrue = selectedCity !== "Selecione sua cidade";
    if(stateIsTrue && cityIsTrue) return setSelectError(false);
    setSelectError(true);
  }, [selectedCity, selectedState])

  useEffect(() => {
    if (hasZipCode) {
      const fetchStates = async () => {
        const states = await getBrazilStates();

        if (Array.isArray(states)) {
          const stateNames = states.map((state) => ({ name: state.name, id: state.geonameId }));
          setBrazilStates((prevStates) => [...prevStates, ...stateNames]);
        }
      };
  
      fetchStates();
    }
  }, [hasZipCode]);  

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedContact(event.target.value);
  };

  const setOptions = (value: string) => {
    if(thisOption === 4) return setSelectError(false)
    if(value === "Selecione") return setSelectError(true)
      setSelectError(false)
  }

  const progressPercentage = (thisOption / totalSteps) * 100;

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
  
    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }
  
    setCep(value);
    buscarEndereco(value);
    setSelectError(false)
  };

  const buscarEndereco = async (cep: string) => {
    try {
      const cepSemMascara = cep.replace("-", "");
      const response = await axios.get(`https://viacep.com.br/ws/${cepSemMascara}/json/`);
      setEndereco(response.data);
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const getCitiesByState = async (estadoId: number) => {
    const username = "breno798";
    const url = `http://api.geonames.org/childrenJSON?geonameId=${estadoId}&username=${username}`;
    
    try {
      const response = await axios.get(url);
      const cidades = response.data;
      return cidades.geonames;
    } catch (error) {
      console.error("Erro ao buscar as cidades do estado:", error);
    }
  };

  const getBrazilStates = async () => {
    const username = "breno798";
    const url = `http://api.geonames.org/childrenJSON?geonameId=3469034&username=${username}`;
    try {
      const response = await axios.get(url);
      const states = response.data.geonames;
      return states;
    } catch (error) {
      console.error("Erro ao buscar os estados brasileiros:", error);
    }
  };

  useEffect(() => {
    const setStateHandler = () => {
      if (selectedState === "Selecione seu estado") {
        setSelectStateError(true);
        return;  
      }
      setSelectStateError(false);
      const foundState = brazilStates.find(({ name }) => name === selectedState);
      const stateId: number = foundState?.id || NaN;
    
      if (stateId) {
        getCitiesByState(stateId);
      } else {
        console.error("Estado não encontrado");
      }
    }
    setStateHandler();
  }, [brazilStates, selectedState]) 

  const updateInfosForm = (field: string, value: string) => {
    if (thisOption === 5) {
      // Atualizando a parte do objeto "adress"
      setInfosForm((prevState) => ({
        ...prevState,
        adress: {
          ...prevState.adress,
          [field]: value, // Atualizando apenas o campo específico (zipCode, state, etc.)
        },
      }));
    } else {
      switch (thisOption) {
        case 0:
          setInfosForm((prevState) => ({
            ...prevState,
            service: value,
          }));
          break;
        case 1:
          setInfosForm((prevState) => ({
            ...prevState,
            fieldDescription: value,
          }));
          break;
        case 2:
          setInfosForm((prevState) => ({
            ...prevState,
            fieldType: value,
          }));
          break;
        case 3:
          setInfosForm((prevState) => ({
            ...prevState,
            landSize: value,
          }));
          break;
        case 4:
          setInfosForm((prevState) => ({
            ...prevState,
            data: value,
          }));
          break;
          case 6:
          setInfosForm((prevState) => ({
            ...prevState,
            contact: value,
          }));
          break;
        default:
          break;
      }
  }};

  const updateContact = (input: string) => {
    setContatctValue(input);
    if(selectedContact === "email") {
      if(checkEmail.test(input)) return setEnableSearch(true);
    }
    if(input.length === 11) return setEnableSearch(true);
    setEnableSearch(false);
  };

  const sendForm = () => {
    console.log(infosForm)
    setFinishForm(true);
  };

  return(
    <div className="h-fit p-10 text-center">
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-lg h-6 bg-gray-200 rounded-full overflow-hidden relative">
          <div 
            className="progress-bar progress-bar-animated h-full bg-orange-500 transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }} 
          />
        </div>
      </div>
      <h1 className="font-bold text-4xl pb-12">
        Os melhores profissionais de topografia
      </h1>
      <div>
        <h2 className="font-bold text-3xl pb-8">
          Serviços de topografia perto de você
        </h2>
        <h1 className="font-bold text-2xl pb-8">
          {typeService[thisOption]}
        </h1>
        <div className="flex flex-col items-center">
          {thisOption !== 3 && thisOption < 5 && (
            <select className={`w-2/4 h-10 ${selectError ? "text-red-500" : "text-black"} bg-gray-200 text-center border-none outline-none`} onChange={({ target: { value } }) => {
              setOptions(value);
              updateInfosForm("", value);
              }}>

              {thisOption === 4 ? <></> : <option>Selecione</option>}
              {thisOption === 0 && services.map((value, index) => <option key={`${value}-${index}`}>{value}</option>)}
              {thisOption === 1 && fieldDescriptiom.map((value, index) => <option key={`${value}-${index}`}>{value}</option>)}
              {thisOption === 2 && fielType.map((value, index) => <option key={`${value}-${index}`}>{value}</option>)}
              {thisOption === 4 && dateServide.map((value, index) => <option key={`${value}-${index}`}>{value}</option>)}
            </select>
          )}
          {thisOption === 3 && (
              <div className="w-2/4 h-10 text-black ">
                <input 
                  type="number" 
                  className="w-full h-10 text-black bg-gray-200 text-center border-none outline-none"
                  onChange={({ target: { value } }) => {
                    setOptions(value);
                    updateInfosForm("", value);
                  }}/>
              </div>
            )}
          {thisOption === 5 && (
            <div className="text-black flex flex-col items-center justify-center">
              <label htmlFor="cep">Digite seu CEP:</label>
              <input
                name="formCep"
                id="cep"
                value={cep}
                onChange={(event) => {
                  handleCepChange(event);
                  if(hasZipCode) setHasZipCode(false);
                  updateInfosForm("zipCode", event.target.value);
                }}
                placeholder="00000-000"
                type="text"
                maxLength={9}
                className="w-[40rem] h-10 bg-gray-200 text-center border-none outline-none"
              />
                <div className="h-6 text-color-green-300">
                  {endereco && (
                    <p>{endereco.logradouro}, {endereco.bairro}, {endereco.localidade} - {endereco.uf}</p>
                  )}
                </div>
                <div>
                  <label>Não possuo CEP </label>
                  <input
                    type="checkbox"
                    onChange={() => {
                      setHasZipCode(!hasZipCode);
                      setCep("");
                    }}
                    checked={hasZipCode}
                  />
                  { hasZipCode && (
                   <div className="w-[43.5rem] gap-6">
                    <select className="bg-gray-200 text-center border-none outline-none w-[40rem] h-10 m-2" onChange={({target: {value}}) => {
                      setSelectedState(value);
                      updateInfosForm("state", value);
                      }}>
                      <option>Selecione seu estado</option>
                      {brazilStates.map((state) => (
                        <option key={`$state-{state.name}-${state.id}`}>{state.name}</option>
                      ))}
                    </select>
                    { selectStateError ? (
                      <p>Por favor selecione um estado</p>
                    ) : (
                    <select className="bg-gray-200 text-center border-none outline-none w-[40rem] h-10 m-2" onChange={({target: {value}}) => {
                        setSelectedCity(value);
                        updateInfosForm("city", value);
                        }}>
                        <option>Selecione sua cidade</option>
                        {stateCity.map((city) => {
                          const formattedCityName = city.name.includes("Municipality")
                            ? `${city.name.replace("Municipality", "").trim()} (município)`
                            : city.name;

                          return (
                            <option key={`city-${city.name}-${city.id}`}>
                              {formattedCityName}
                            </option>
                          );
                        })}
                      </select>
                    )}
                    <input 
                      className="bg-gray-200 text-center border-none outline-none w-[40rem] h-10 mt-2"
                      type="text"
                      placeholder={inputRoad}
                      onChange={({ target: { value }}) => {
                        setInputRoad(value);
                        updateInfosForm("road", value);
                      }}
                    />
                    </div> 
                  )}

                </div>
            </div>
          )}
          {thisOption === 6 && (
            <div className="text-black flex flex-col items-center justify-center">
              <div>

                <input
                  type="radio"
                  id="contact-whatsapp"
                  name="contact"
                  value="whatsapp"
                  checked={selectedContact === "whatsapp"}
                  onChange={(event) => {handleChange(event); setContatctValue(""); setEnableSearch(false)}}
                />
                <label htmlFor="contact-whatsapp" className="pr-2"> Whatsapp</label>
          
                <input
                  type="radio"
                  id="contact-email"
                  name="contact"
                  value="email"
                  checked={selectedContact === "email"}
                  onChange={(event) => {handleChange(event); setContatctValue(""); setEnableSearch(false)}}
                />
                <label htmlFor="contact-email" className="pr-2"> E-Mail</label>
              </div>
              <input
                className="w-[40rem] h-10 bg-gray-200 text-center border-none outline-none mt-4"
                type="text"
                placeholder={
                selectedContact === "email" ? "email@mail.com" : "(00) 0 0000-0000"
                }
                value={constactValue}
                onChange={(event) => {
                  updateInfosForm("contact", event.target.value);
                  updateContact(event.target.value)
                }}
              />
            </div>
          )}

          <div className="flex w-2/4 justify-between gap-6 mt-10">
          {finishForm ? (
            <></>
          ) : (
            <>
              {thisOption !== 0 && (
                <input
                  className="bg-white w-full border border-yellow-400 rounded-lg text-orange-500 font-bold text-xl"
                  type="button"
                  value="Anterior"
                  onClick={() => {
                    setThisOption(thisOption - 1);
                  }}
                />
              )}
              <input
                className={`bg-orange-500 w-full ${
                  thisOption === 6 ? (enableSearch ? "opacity-100" : "opacity-50") : "opacity-100"
                } h-16 border border-yellow-400 rounded-lg text-white font-bold text-xl`}
                type="button"
                value={thisOption === 6 ? "Buscar por profissionais" : "Próximo"}
                disabled={thisOption === 6 ? !enableSearch : false}
                onClick={() => {
                  if (thisOption === 6 && enableSearch) sendForm();
                  setThisOption(thisOption + 1);

                  if (selectError) return;

                  if (thisOption === 3) return setThisOption(thisOption + 1);
                  else setThisOption(thisOption + 1);
                  setSelectError(true);
                }}
              />
            </>
          )}
        </div>

          <a type="button" href="/services" className="bg-white w-1/2 h-16 border border-yellow-400 rounded-lg text-orange-500 font-bold text-xl flex justify-center items-center mt-6">
            Veja todos os serviços
          </a>

        </div>
      </div>
      <div></div>
    </div>
  )
};